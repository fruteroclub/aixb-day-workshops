import { Buffer } from "node:buffer";
import { errorMessage } from "../http.js";
import type { AppConfig, RepoContext } from "../types.js";

type GitHubRepo = {
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  default_branch: string;
  language: string | null;
  topics?: string[];
};

type GitHubReadme = {
  content?: string;
};

function fixtureRepo(owner: string, repo: string, warning?: string): RepoContext {
  return {
    integration: "fixture",
    owner,
    repo,
    name: repo,
    fullName: `${owner}/${repo}`,
    description: "Fixture repository used when GitHub is not reachable.",
    stars: 42,
    forks: 7,
    defaultBranch: "main",
    language: "TypeScript",
    topics: ["ai", "blockchain", "workshop"],
    languages: {
      TypeScript: 12000,
      JavaScript: 4000
    },
    readmeExcerpt: "This fixture README represents the project context a mentor would inspect.",
    ...(warning ? { warning } : {})
  };
}

function githubHeaders(config: AppConfig): HeadersInit {
  void config;

  return {
    accept: "application/vnd.github+json",
    "user-agent": "aixb-day-workshop"
  };
}

async function fetchJson<T>(config: AppConfig, url: string): Promise<T> {
  const response = await fetch(url, { headers: githubHeaders(config) });
  if (!response.ok) {
    throw new Error(`${url} returned ${response.status}`);
  }
  return (await response.json()) as T;
}

async function fetchText(config: AppConfig, url: string, accept = "text/plain"): Promise<string> {
  const response = await fetch(url, {
    headers: {
      ...githubHeaders(config),
      accept
    }
  });
  if (!response.ok) {
    throw new Error(`${url} returned ${response.status}`);
  }
  return await response.text();
}

async function fetchReadme(config: AppConfig, owner: string, repo: string): Promise<string> {
  try {
    const data = await fetchJson<GitHubReadme>(config, `https://api.github.com/repos/${owner}/${repo}/readme`);
    const decoded = Buffer.from(data.content ?? "", "base64").toString("utf8");
    return decoded.slice(0, 4000);
  } catch {
    return "";
  }
}

function decodeHtml(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

function extractMetaContent(html: string, selector: string): string | null {
  const match = html.match(new RegExp(`<meta ${selector} content="([^"]*)"`, "i"));
  return match ? decodeHtml(match[1]) : null;
}

function extractPublicDescription(html: string, owner: string, repo: string): string | null {
  const title = html.match(/<title>\s*GitHub - [^:]+:\s*([^·<]+)(?:· GitHub)?\s*<\/title>/i);
  if (title) return decodeHtml(title[1]);

  const description =
    extractMetaContent(html, 'name="description"') ?? extractMetaContent(html, 'property="og:description"');

  if (!description) return null;

  return description.replace(`Contribute to ${owner}/${repo} development by creating an account on GitHub.`, "").trim();
}

function extractPublicStars(html: string): number {
  const title = html.match(/id="repo-stars-counter-star"[^>]*title="([^"]+)"/i);
  if (title) {
    const parsed = Number(title[1].replace(/,/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
  }

  const aria = html.match(/id="repo-stars-counter-star"[^>]*aria-label="([0-9,]+) users starred this repository"/i);
  if (!aria) return 0;

  const parsed = Number(aria[1].replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

async function fetchPublicReadme(
  config: AppConfig,
  owner: string,
  repo: string
): Promise<{ defaultBranch: string; readmeExcerpt: string }> {
  const branches = ["main", "master", "trunk", "dev"];
  const filenames = ["README.md", "readme.md", "README.mdx", "README"];

  for (const branch of branches) {
    for (const filename of filenames) {
      try {
        const readme = await fetchText(
          config,
          `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filename}`
        );
        return {
          defaultBranch: branch,
          readmeExcerpt: readme.slice(0, 4000)
        };
      } catch {
        // Try the next common branch/filename pair.
      }
    }
  }

  return {
    defaultBranch: "main",
    readmeExcerpt: ""
  };
}

async function fetchPublicWebRepo(
  config: AppConfig,
  owner: string,
  repo: string,
  apiWarning: string
): Promise<RepoContext> {
  const html = await fetchText(config, `https://github.com/${owner}/${repo}`, "text/html");
  const readme = await fetchPublicReadme(config, owner, repo);

  return {
    integration: "live",
    owner,
    repo,
    name: repo,
    fullName: `${owner}/${repo}`,
    description: extractPublicDescription(html, owner, repo),
    stars: extractPublicStars(html),
    forks: 0,
    defaultBranch: readme.defaultBranch,
    language: null,
    topics: [],
    languages: {},
    readmeExcerpt: readme.readmeExcerpt,
    warning: `GitHub API unavailable (${apiWarning}); used public GitHub page fallback.`
  };
}

export async function getRepoContext(config: AppConfig, owner: string, repo: string): Promise<RepoContext> {
  try {
    const [repoData, languages, readmeExcerpt] = await Promise.all([
      fetchJson<GitHubRepo>(config, `https://api.github.com/repos/${owner}/${repo}`),
      fetchJson<Record<string, number>>(config, `https://api.github.com/repos/${owner}/${repo}/languages`).catch(
        () => ({})
      ),
      fetchReadme(config, owner, repo)
    ]);

    return {
      integration: "live",
      owner,
      repo,
      name: repoData.name,
      fullName: repoData.full_name,
      description: repoData.description,
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      defaultBranch: repoData.default_branch,
      language: repoData.language,
      topics: repoData.topics ?? [],
      languages,
      readmeExcerpt
    };
  } catch (error) {
    const warning = errorMessage(error);

    try {
      return await fetchPublicWebRepo(config, owner, repo, warning);
    } catch (fallbackError) {
      return fixtureRepo(owner, repo, `${warning}; public fallback failed: ${errorMessage(fallbackError)}`);
    }
  }
}
