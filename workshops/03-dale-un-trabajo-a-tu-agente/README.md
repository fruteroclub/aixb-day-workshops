# Give Your Agent a Job - Written Guide

This README is the written workshop guide. It adapts the slide source in
[`../../tmp/03-dale-un-trabajo-a-tu-agente.md`](../../tmp/03-dale-un-trabajo-a-tu-agente.md)
into the build path for Workshop 3: give the agent a concrete job by building a
Builder Mentor API with GitHub data and Nebius reasoning.

Use the companion files when preparing delivery:

- [`SLIDES.md`](SLIDES.md) - presentation structure.
- [`FACILITATOR_GUIDE.md`](FACILITATOR_GUIDE.md) - timing, risks and fallback.
- [`EXERCISES.md`](EXERCISES.md) - participant exercises.

Este workshop le da un trabajo concreto al agente: construir un Builder Mentor
service. El servicio recibe un repositorio de GitHub, obtiene metadata técnica y
usa Nebius Token Factory para convertir esa información en recomendaciones para
un builder.

El stack del tutorial es Hono + GitHub API + Nebius Token Factory.

## Resultado visible

Al final tendrás una API local con:

| Ruta | Integración | Qué demuestra |
|---|---:|---|
| `GET /health` | `live` | El servicio Hono está corriendo. |
| `GET /repo/:owner/:repo` | `live` o `fixture` | El servicio puede leer GitHub. |
| `POST /mentor` | `live` o `fixture` | El servicio produce una recomendación útil para un builder. |

La prueba visible:

```bash
curl http://localhost:3003/health
curl http://localhost:3003/repo/honojs/hono
curl -X POST http://localhost:3003/mentor \
  -H "Content-Type: application/json" \
  -d '{"owner":"honojs","repo":"hono","goal":"I want to learn how this project structures APIs."}'
```

## Requisitos

- Node.js 20 o superior.
- Terminal.
- `curl`.
- Opcional: `GITHUB_TOKEN` para evitar rate limits.
- Opcional: `NEBIUS_API_KEY` y `NEBIUS_MODEL` para razonamiento live.

Sin credenciales, el servicio usa fixtures explícitos.

## Paso 1 - Crea el proyecto Hono

```bash
mkdir aixb-ws03-builder-mentor
cd aixb-ws03-builder-mentor
npm init -y
npm pkg set type=module
npm install hono @hono/node-server
mkdir -p src
```

Agrega scripts:

```bash
npm pkg set scripts.start="node src/server.js"
npm pkg set scripts.check="node --check src/server.js"
```

## Paso 2 - Crea el Builder Mentor API

Crea `src/server.js`:

```bash
cat > src/server.js <<'EOF'
import { Buffer } from "node:buffer";
import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

const PORT = Number(process.env.PORT ?? 3003);
const NEBIUS_BASE_URL = process.env.NEBIUS_BASE_URL ?? "https://api.tokenfactory.nebius.com/v1";

function configured(value) {
  return Boolean(value && value.trim());
}

function githubHeaders() {
  const headers = {
    accept: "application/vnd.github+json",
    "user-agent": "aixb-builder-mentor"
  };

  if (configured(process.env.GITHUB_TOKEN)) {
    headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

function fixtureRepo(owner, repo) {
  return {
    integration: "fixture",
    owner,
    repo,
    fullName: `${owner}/${repo}`,
    description: "Fixture repository for workshop delivery.",
    stars: 42,
    forks: 7,
    defaultBranch: "main",
    language: "TypeScript",
    topics: ["ai", "blockchain", "workshop"],
    languages: {
      TypeScript: 12000,
      JavaScript: 4000
    },
    readmeExcerpt: "This fixture README represents the project context a mentor would inspect."
  };
}

async function fetchJson(url) {
  const response = await fetch(url, { headers: githubHeaders() });
  if (!response.ok) {
    throw new Error(`${url} returned ${response.status}`);
  }
  return response.json();
}

async function fetchReadme(owner, repo) {
  try {
    const data = await fetchJson(`https://api.github.com/repos/${owner}/${repo}/readme`);
    const decoded = Buffer.from(data.content ?? "", "base64").toString("utf8");
    return decoded.slice(0, 4000);
  } catch {
    return "";
  }
}

async function getRepoContext(owner, repo) {
  try {
    const [repoData, languages, readmeExcerpt] = await Promise.all([
      fetchJson(`https://api.github.com/repos/${owner}/${repo}`),
      fetchJson(`https://api.github.com/repos/${owner}/${repo}/languages`).catch(() => ({})),
      fetchReadme(owner, repo)
    ]);

    return {
      integration: "live",
      owner,
      repo,
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
    return {
      ...fixtureRepo(owner, repo),
      warning: error.message
    };
  }
}

function fixtureMentorResponse({ repoContext, goal }) {
  return {
    integration: "fixture",
    mentor: {
      summary: `${repoContext.fullName} looks like a ${repoContext.language ?? "software"} project with clear API learning value.`,
      strengths: [
        "Has public repository metadata that can be inspected.",
        "Can be turned into a structured learning plan."
      ],
      opportunities: [
        "Review the README and identify the main runtime.",
        "Find the test command before making changes.",
        "Ask the agent for a small first contribution."
      ],
      actionPlan: [
        "Read the README.",
        "Map the project structure.",
        "Run the documented check command.",
        `Connect the plan to this goal: ${goal || "learn the project"}`
      ]
    }
  };
}

async function callNebius({ repoContext, goal }) {
  if (!configured(process.env.NEBIUS_API_KEY) || !configured(process.env.NEBIUS_MODEL)) {
    return fixtureMentorResponse({ repoContext, goal });
  }

  const response = await fetch(`${NEBIUS_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${process.env.NEBIUS_API_KEY}`
    },
    body: JSON.stringify({
      model: process.env.NEBIUS_MODEL,
      messages: [
        {
          role: "system",
          content: [
            "You are an AI Builder Mentor.",
            "Review GitHub repository context and return practical engineering guidance.",
            "Respond with concise JSON-compatible content."
          ].join(" ")
        },
        {
          role: "user",
          content: JSON.stringify({
            goal,
            repo: repoContext
          })
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`Nebius returned ${response.status}: ${await response.text()}`);
  }

  const data = await response.json();
  return {
    integration: "live",
    provider: "nebius-token-factory",
    model: process.env.NEBIUS_MODEL,
    mentor: data.choices?.[0]?.message?.content ?? ""
  };
}

app.get("/health", (c) => {
  return c.json({
    ok: true,
    service: "builder-mentor-api",
    framework: "hono",
    integration: "live"
  });
});

app.get("/repo/:owner/:repo", async (c) => {
  const repoContext = await getRepoContext(c.req.param("owner"), c.req.param("repo"));
  return c.json(repoContext);
});

app.post("/mentor", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const owner = body.owner ?? "honojs";
  const repo = body.repo ?? "hono";
  const goal = body.goal ?? "Understand this project and define a first learning plan.";

  const repoContext = await getRepoContext(owner, repo);
  const mentorResult = await callNebius({ repoContext, goal });

  return c.json({
    route: "/mentor",
    integrations: {
      github: repoContext.integration,
      reasoning: mentorResult.integration
    },
    input: {
      owner,
      repo,
      goal
    },
    repoContext,
    result: mentorResult
  });
});

serve({
  fetch: app.fetch,
  port: PORT
});

console.log(`Builder Mentor API running on http://localhost:${PORT}`);
EOF
```

## Paso 3 - Verifica localmente

```bash
npm run check
npm start
```

En otra terminal:

```bash
curl http://localhost:3003/health
curl http://localhost:3003/repo/honojs/hono
curl -X POST http://localhost:3003/mentor \
  -H "Content-Type: application/json" \
  -d '{"owner":"honojs","repo":"hono","goal":"I want to understand how Hono structures APIs."}'
```

Si GitHub o Nebius fallan, el response indicará `fixture`. Eso mantiene la demo
entregable.

## Paso 4 - Conecta GitHub live

Para repos públicos, la API funciona sin token pero tiene límites. Para una demo
más estable:

```bash
export GITHUB_TOKEN="replace-with-read-only-token"
curl http://localhost:3003/repo/honojs/hono
```

Usa un token de solo lectura. No proyectes el valor.

## Paso 5 - Conecta Nebius live

```bash
export NEBIUS_API_KEY="replace-with-event-key"
export NEBIUS_MODEL="replace-with-model-from-nebius-playground"
export NEBIUS_BASE_URL="https://api.tokenfactory.nebius.com/v1"
```

Verifica:

```bash
curl -X POST http://localhost:3003/mentor \
  -H "Content-Type: application/json" \
  -d '{"owner":"honojs","repo":"hono","goal":"Prepare a learning path for an API engineer."}'
```

El response debe decir:

```text
integrations.github = live
integrations.reasoning = live
```

si ambas integraciones están configuradas.

## Paso 6 - Prompt para construirlo con Pi

Si el speaker quiere que Pi lo implemente en vivo, usa prompts pequeños.

```text
We are building the AI Builder Mentor service for AI x Blockchain Day.

Use Hono on Node.js.

Required endpoints:
- GET /health
- GET /repo/:owner/:repo
- POST /mentor

Integrations:
- GitHub API for repository metadata
- Nebius Token Factory for AI reasoning
- fixture fallback for both integrations

First inspect the project and propose a plan. Do not edit files yet.
```

Después:

```text
Implement the Hono API.

Requirements:
- no database
- no frontend
- no wallet
- no mainnet
- label every integration as live or fixture
- add npm scripts start and check
- after editing, tell me the curl commands that prove the service works
```

Verifica fuera de Pi con:

```bash
npm run check
curl http://localhost:3003/health
```

## Qué no construir

No agregues:

- Login.
- Base de datos.
- Marketplace.
- Wallet real.
- Smart contract.
- Mainnet.
- UI.

El éxito es un servicio de mentoría con GitHub + IA, no un producto completo.

## Fallback

Sin credenciales:

```bash
unset GITHUB_TOKEN NEBIUS_API_KEY NEBIUS_MODEL NEBIUS_BASE_URL
npm start
```

Corre la misma prueba visible. El response debe seguir funcionando con
integraciones `fixture`.

## Checklist para speakers

- Usa Hono como servidor.
- La demo principal es Builder Mentor API.
- Ten un repo público de prueba, por ejemplo `honojs/hono`.
- Ten modo fixture listo.
- No proyectes GitHub o Nebius secrets.
- Cierra conectando con Workshop 4: si el servicio entrega valor, el siguiente paso es cobrar o autorizar trabajos.
