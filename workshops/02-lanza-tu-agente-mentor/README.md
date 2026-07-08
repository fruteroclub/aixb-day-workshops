# Launch Your Agent - Written Guide

This README is the written workshop guide. It adapts the slide source in
[`../../tmp/02-lanza-tu-agente-eng.md`](../../tmp/02-lanza-tu-agente-eng.md)
into the build path for Workshop 2: install Pi Coding Agent during the session
and connect the agent to a Hono integration server.

Use the companion files when preparing delivery:

- [`SLIDES.md`](SLIDES.md) - presentation structure.
- [`FACILITATOR_GUIDE.md`](FACILITATOR_GUIDE.md) - timing, risks and fallback.
- [`EXERCISES.md`](EXERCISES.md) - participant exercises.

Este workshop convierte la aplicación del Workshop 1 en un primer servidor de
integraciones para un agente. Pi Coding Agent no es prerequisito para entrar al
workshop. Se instala y se configura durante la sesión como parte del build.

La secuencia del workshop es:

```text
1. Deploy Pi Coding Agent
2. Connect Nebius Token Factory
3. Create a blockchain wallet
4. Connect GitHub
5. Connect Vercel
6. Connect Telegram
```

## Resultado visible

Al final tendrás:

- Pi Coding Agent instalado o abierto en la máquina del participante o del speaker.
- Un servidor Hono de integraciones que muestra el estado de integraciones.
- Una identidad wallet de demo, marcada como `fixture`.
- Una integración GitHub que lee información de un repo público o devuelve fixture.
- Un endpoint que combina GitHub + Nebius para crear un brief de trabajo para el agente.
- Checks para Vercel y Telegram sin obligar a exponer secrets.

## Requisitos de entrada

Los participantes necesitan terminal, Git y Node.js 20 o superior. No necesitan
tener Pi Coding Agent instalado antes de llegar. Eso sucede en el Paso 1.

## Paso 1 - Deploy Pi Coding Agent

Instala Pi con el comando oficial de npm:

```bash
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
```

Abre Pi dentro de la carpeta del proyecto cuando llegue el momento:

```bash
pi
```

Para autenticar el modelo, usa `/login` dentro de Pi o configura el provider por
variables de entorno según el setup del evento. Si una máquina se atora, el
speaker continúa con la máquina proyectada.

Primer prompt para Pi:

```text
You are my builder agent for AI x Blockchain Day.

We are building a small Hono integration server.
First inspect the project. Do not edit files yet.
Explain what exists, what is missing, and what command should verify the project.
```

## Paso 2 - Crea el servidor Hono de integraciones

```bash
mkdir aixb-ws02-agent-server
cd aixb-ws02-agent-server
npm init -y
npm pkg set type=module
npm install hono @hono/node-server
mkdir -p src scripts
```

Agrega scripts:

```bash
npm pkg set scripts.start="node src/server.js"
npm pkg set scripts.check="node --check src/server.js && node --check scripts/create-wallet.js"
```

Crea `.gitignore`:

```bash
cat > .gitignore <<'EOF'
node_modules/
.env
.agent-wallet.fixture.json
EOF
```

Crea `.env.example`:

```bash
cat > .env.example <<'EOF'
NEBIUS_API_KEY=
NEBIUS_MODEL=
NEBIUS_BASE_URL=https://api.tokenfactory.nebius.com/v1
GITHUB_TOKEN=
VERCEL_PROJECT_URL=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
EOF
```

## Paso 3 - Connect Nebius Token Factory

El servidor de integraciones llama a Nebius solo si existen `NEBIUS_API_KEY` y `NEBIUS_MODEL`.
Sin esas variables, usa fixture.

```bash
export NEBIUS_API_KEY="replace-with-event-key"
export NEBIUS_MODEL="replace-with-model-from-nebius-playground"
export NEBIUS_BASE_URL="https://api.tokenfactory.nebius.com/v1"
```

No proyectes la API key. Si el evento reparte credenciales, pégalas fuera de la
vista del público.

## Paso 4 - Create a blockchain wallet

Para este workshop la wallet es identidad de demo. No usa mainnet, no tiene
fondos y se etiqueta como `fixture`.

Crea `scripts/create-wallet.js`:

```bash
cat > scripts/create-wallet.js <<'EOF'
import { createHash, randomBytes } from "node:crypto";
import { writeFileSync } from "node:fs";

const privateKey = `0x${randomBytes(32).toString("hex")}`;
const address = `0x${createHash("sha256").update(privateKey).digest("hex").slice(-40)}`;

const wallet = {
  mode: "fixture",
  network: "no-mainnet",
  address,
  privateKey,
  warning: "Demo identity only. Do not fund this wallet.",
  createdAt: new Date().toISOString()
};

writeFileSync(".agent-wallet.fixture.json", JSON.stringify(wallet, null, 2));

console.log(`Created fixture wallet identity: ${address}`);
console.log("Stored in .agent-wallet.fixture.json. Do not commit this file.");
EOF
```

Genera la identidad:

```bash
node scripts/create-wallet.js
```

## Paso 5 - Connect GitHub with Hono

Crea `src/server.js`:

```bash
cat > src/server.js <<'EOF'
import { readFile } from "node:fs/promises";
import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

const PORT = Number(process.env.PORT ?? 3002);
const NEBIUS_BASE_URL = process.env.NEBIUS_BASE_URL ?? "https://api.tokenfactory.nebius.com/v1";

function configured(value) {
  return Boolean(value && value.trim());
}

async function readWallet() {
  try {
    const raw = await readFile(".agent-wallet.fixture.json", "utf8");
    const wallet = JSON.parse(raw);
    return {
      integration: "fixture",
      address: wallet.address,
      network: wallet.network,
      warning: wallet.warning
    };
  } catch {
    return {
      integration: "missing",
      message: "Run node scripts/create-wallet.js first."
    };
  }
}

function fixtureRepo(owner, repo) {
  return {
    integration: "fixture",
    owner,
    repo,
    name: repo,
    fullName: `${owner}/${repo}`,
    description: "Fixture repository used when GitHub is not reachable.",
    stars: 0,
    defaultBranch: "main",
    language: "TypeScript"
  };
}

async function getGitHubRepo(owner, repo) {
  const headers = {
    accept: "application/vnd.github+json",
    "user-agent": "aixb-day-workshop"
  };

  if (configured(process.env.GITHUB_TOKEN)) {
    headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
    if (!response.ok) {
      throw new Error(`GitHub returned ${response.status}`);
    }

    const data = await response.json();
    return {
      integration: "live",
      owner,
      repo,
      name: data.name,
      fullName: data.full_name,
      description: data.description,
      stars: data.stargazers_count,
      defaultBranch: data.default_branch,
      language: data.language
    };
  } catch (error) {
    return {
      ...fixtureRepo(owner, repo),
      warning: error.message
    };
  }
}

function fixtureBrief({ repo, goal }) {
  return {
    integration: "fixture",
    brief: [
      `Repository: ${repo.fullName}`,
      `Goal: ${goal || "No goal provided"}`,
      "Suggested next action: ask Pi to inspect the repo, identify the stack and propose a first small task.",
      "Verification: run the project's documented check command before claiming success."
    ].join("\n")
  };
}

async function callNebiusForBrief({ repo, goal }) {
  if (!configured(process.env.NEBIUS_API_KEY) || !configured(process.env.NEBIUS_MODEL)) {
    return fixtureBrief({ repo, goal });
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
          content: "Create a concise builder-agent task brief from GitHub repository metadata."
        },
        {
          role: "user",
          content: JSON.stringify({ repo, goal })
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
    brief: data.choices?.[0]?.message?.content ?? ""
  };
}

app.get("/health", (c) => {
  return c.json({
    ok: true,
    service: "aixb-ws02-agent-server",
    framework: "hono",
    integration: "live"
  });
});

app.get("/integrations", async (c) => {
  return c.json({
    nebius: configured(process.env.NEBIUS_API_KEY) && configured(process.env.NEBIUS_MODEL) ? "live" : "fixture",
    wallet: await readWallet(),
    github: configured(process.env.GITHUB_TOKEN) ? "live-authenticated" : "live-public-or-fixture",
    vercel: configured(process.env.VERCEL_PROJECT_URL) ? "configured" : "missing",
    telegram: configured(process.env.TELEGRAM_BOT_TOKEN) && configured(process.env.TELEGRAM_CHAT_ID) ? "configured" : "missing"
  });
});

app.get("/wallet", async (c) => {
  return c.json(await readWallet());
});

app.get("/github/repo/:owner/:repo", async (c) => {
  const repo = await getGitHubRepo(c.req.param("owner"), c.req.param("repo"));
  return c.json(repo);
});

app.post("/agent/brief", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const owner = body.owner ?? "frutero";
  const repoName = body.repo ?? "example";
  const repo = await getGitHubRepo(owner, repoName);
  const brief = await callNebiusForBrief({ repo, goal: body.goal });

  return c.json({
    route: "/agent/brief",
    github: repo.integration,
    reasoning: brief.integration,
    repo,
    brief
  });
});

app.get("/vercel/status", (c) => {
  return c.json({
    integration: configured(process.env.VERCEL_PROJECT_URL) ? "configured" : "missing",
    projectUrl: process.env.VERCEL_PROJECT_URL ?? null,
    note: "Use vercel login and vercel link during the workshop if deployment is enabled."
  });
});

app.post("/telegram/test", async (c) => {
  if (!configured(process.env.TELEGRAM_BOT_TOKEN) || !configured(process.env.TELEGRAM_CHAT_ID)) {
    return c.json({
      integration: "fixture",
      sent: false,
      message: "Telegram credentials are missing. This is a safe fixture response."
    });
  }

  const text = "AI x Blockchain Day integration test message.";
  const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text
    })
  });

  return c.json({
    integration: "live",
    sent: response.ok,
    status: response.status
  });
});

serve({
  fetch: app.fetch,
  port: PORT
});

console.log(`Agent integration server running on http://localhost:${PORT}`);
EOF
```

## Paso 6 - Verifica GitHub + Nebius

```bash
npm run check
npm start
```

En otra terminal:

```bash
curl http://localhost:3002/health
curl http://localhost:3002/integrations
curl http://localhost:3002/wallet
curl http://localhost:3002/github/repo/honojs/hono
curl -X POST http://localhost:3002/agent/brief \
  -H "Content-Type: application/json" \
  -d '{"owner":"honojs","repo":"hono","goal":"Understand whether this repo is a good API framework for agent services."}'
```

Si `NEBIUS_API_KEY` y `NEBIUS_MODEL` no existen, `/agent/brief` devuelve un
brief `fixture`. Si GitHub falla, usa metadata `fixture`.

## Paso 7 - Connect Vercel

Este workshop no depende de deploy para ser exitoso, pero sí deja el camino
preparado.

```bash
npm install -g vercel
vercel login
vercel link
```

Guarda la URL si ya existe un proyecto:

```bash
export VERCEL_PROJECT_URL="https://replace-with-project-url"
curl http://localhost:3002/vercel/status
```

Si el login falla, marca Vercel como `missing` y continúa.

## Paso 8 - Connect Telegram

Configura credenciales solo si el speaker ya tiene bot y chat preparados:

```bash
export TELEGRAM_BOT_TOKEN="replace-with-bot-token"
export TELEGRAM_CHAT_ID="replace-with-chat-id"
curl -X POST http://localhost:3002/telegram/test
```

Sin credenciales, el endpoint responde en `fixture`.

## Paso 9 - Pide a Pi que use el servidor de integraciones

Dentro del proyecto, abre Pi:

```bash
pi
```

Prompt:

```text
You are my builder agent for AI x Blockchain Day.

Use the local Hono integration server as your context.

First, inspect the project.
Then explain what these integrations do:
- Nebius Token Factory
- fixture blockchain wallet
- GitHub
- Vercel
- Telegram

Do not change files yet. Tell me which curl commands prove the integration server works.
```

Después pide una tarea pequeña:

```text
Create a short AGENT_BRIEF.md file from the /agent/brief endpoint.
Keep it concise. Include the repo, goal, integration labels and the next action for the agent.
After editing, tell me what command verifies the Hono server syntax.
```

## Cierre

La frase de cierre:

```text
Pi is the builder. Hono is the integration server. Nebius gives reasoning. Wallet gives identity. GitHub gives code. Vercel gives deployment. Telegram gives communication.
```

## Checklist para speakers

- No pidas Pi como prerequisito. Instálalo durante el workshop.
- Usa Hono como servidor de integración.
- No proyectes Nebius, GitHub, Vercel o Telegram secrets.
- Ten listo un fallback fixture para cada integración.
- La prueba mínima es `GET /integrations`, `GET /github/repo/:owner/:repo` y `POST /agent/brief`.
