import { getRepoContext } from "../integrations/github.js";
import { callNebius } from "../integrations/nebius.js";
import type { AppConfig, RepoContext } from "../types.js";

export type MentorAgentInput = {
  repoUrl?: string;
  owner?: string;
  repo?: string;
  goal?: string;
};

type ParsedRepo = {
  owner: string;
  repo: string;
};

export function parseGitHubRepository(input: string | undefined): ParsedRepo | null {
  if (!input) return null;

  const trimmed = input.trim();
  if (!trimmed) return null;

  const normalized = trimmed
    .replace(/^git@github\.com:/i, "https://github.com/")
    .replace(/^github\.com\//i, "https://github.com/");

  if (/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(normalized)) {
    const [owner, repo] = normalized.split("/");
    return { owner, repo: repo.replace(/\.git$/i, "") };
  }

  try {
    const url = new URL(normalized);
    if (url.hostname !== "github.com" && url.hostname !== "www.github.com") return null;

    const [owner, repo] = url.pathname
      .split("/")
      .filter(Boolean)
      .slice(0, 2);

    if (!owner || !repo) return null;

    return {
      owner,
      repo: repo.replace(/\.git$/i, "")
    };
  } catch {
    return null;
  }
}

function fixtureMentor({ repoContext, goal }: { repoContext: RepoContext; goal: string }) {
  return {
    summary: `${repoContext.fullName} is a useful project to inspect for this goal: ${goal}`,
    strengths: [
      "The repository has inspectable metadata.",
      "The project can be turned into a small learning or contribution plan."
    ],
    opportunities: [
      "Read the README before editing.",
      "Identify the runtime and package manager.",
      "Find the check command before asking Pi to change code."
    ],
    actionPlan: [
      "Map the repo structure.",
      "Ask Pi for one small implementation task.",
      "Run the verification command.",
      "Keep x402 payment enforcement as a later service boundary."
    ]
  };
}

export async function createMentorAgentResult(config: AppConfig, input: MentorAgentInput) {
  const parsed = parseGitHubRepository(input.repoUrl) ?? {
    owner: input.owner ?? "honojs",
    repo: input.repo ?? "hono"
  };
  const goal = input.goal ?? "Design the first Mentor Agent service.";
  const repoContext = await getRepoContext(config, parsed.owner, parsed.repo);
  const result = await callNebius(config, {
    system: [
      "You are the Mentor Agent service for AI x Blockchain Day.",
      "Given public GitHub repository context and a builder goal, return practical guidance.",
      "Do not describe Pi Coding Agent as the service.",
      "Pi is only the builder tool that can implement the service.",
      "Mention where x402 payment enforcement could fit later without implementing payments now."
    ].join(" "),
    user: JSON.stringify({ goal, repo: repoContext }),
    fixtureText: JSON.stringify(fixtureMentor({ repoContext, goal }), null, 2)
  });

  return {
    route: "/mentor-agent",
    workshop: 3,
    integrations: {
      github: repoContext.integration,
      reasoning: result.integration
    },
    input: {
      owner: parsed.owner,
      repo: parsed.repo,
      goal
    },
    repoContext,
    result
  };
}
