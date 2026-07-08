# Tutorial - Fundamentos IA x Blockchain

Este workshop le da un cerebro a la aplicación. La implementación usa Hono como
servidor y Nebius Token Factory como proveedor de inferencia cuando hay API key.
Si no hay credenciales, la misma API responde con fixtures explícitos para que el
speaker pueda completar la demo sin depender de red o secrets.

## Resultado visible

Al final tendrás una API local con:

| Ruta | Integración | Qué demuestra |
|---|---:|---|
| `GET /health` | `live` | El servidor Hono está corriendo. |
| `GET /stack` | `fixture` | El mapa técnico mínimo IA x Blockchain. |
| `POST /reason` | `live` o `fixture` | La aplicación puede razonar usando Nebius Token Factory o una respuesta controlada. |

La prueba visible es:

```bash
curl http://localhost:3001/health
curl http://localhost:3001/stack
curl -X POST http://localhost:3001/reason \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Explica por qué una aplicación con IA necesita un backend."}'
```

## Requisitos

- Node.js 20 o superior.
- Terminal.
- Una cuenta y API key de Nebius Token Factory para el modo `live`.

La API key no es obligatoria para terminar el workshop. Sin key, el servidor
responde en modo `fixture`.

## Paso 1 - Crea el proyecto Hono

```bash
mkdir aixb-ws01-brain
cd aixb-ws01-brain
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

## Paso 2 - Crea el servidor

Crea `src/server.js`:

```bash
cat > src/server.js <<'EOF'
import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

const PORT = Number(process.env.PORT ?? 3001);
const NEBIUS_API_KEY = process.env.NEBIUS_API_KEY;
const NEBIUS_BASE_URL = process.env.NEBIUS_BASE_URL ?? "https://api.tokenfactory.nebius.com/v1";
const NEBIUS_MODEL = process.env.NEBIUS_MODEL;

const stack = {
  event: "AI x Blockchain Day",
  architecture: [
    {
      piece: "Application",
      job: "Receives a user goal and calls the backend."
    },
    {
      piece: "Hono backend",
      job: "Exposes routes, validates requests and keeps secrets off the client."
    },
    {
      piece: "Nebius Token Factory",
      job: "Provides OpenAI-compatible inference for reasoning."
    },
    {
      piece: "Blockchain infrastructure",
      job: "Later provides identity, ownership, payments and coordination."
    }
  ],
  labels: {
    server: "live",
    reasoning: NEBIUS_API_KEY && NEBIUS_MODEL ? "live" : "fixture"
  }
};

function fixtureReasoning(prompt) {
  return [
    "A Hono backend gives the application a safe place to run logic, keep secrets and call external systems.",
    "Nebius Token Factory adds reasoning through an OpenAI-compatible API.",
    "Blockchain will later add identity, payments, permissions and coordination.",
    `Prompt received: ${prompt || "no prompt"}`
  ].join(" ");
}

async function callNebius(prompt) {
  if (!NEBIUS_API_KEY || !NEBIUS_MODEL) {
    return {
      integration: "fixture",
      provider: "local-fixture",
      text: fixtureReasoning(prompt)
    };
  }

  const response = await fetch(`${NEBIUS_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${NEBIUS_API_KEY}`
    },
    body: JSON.stringify({
      model: NEBIUS_MODEL,
      messages: [
        {
          role: "system",
          content: "Explain AI x Blockchain concepts clearly for builders. Be concise and technical."
        },
        {
          role: "user",
          content: prompt || "Explain why this application needs a backend."
        }
      ]
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Nebius Token Factory returned ${response.status}: ${text}`);
  }

  const data = await response.json();
  return {
    integration: "live",
    provider: "nebius-token-factory",
    model: NEBIUS_MODEL,
    text: data.choices?.[0]?.message?.content ?? ""
  };
}

app.get("/health", (c) => {
  return c.json({
    ok: true,
    service: "aixb-ws01-brain",
    framework: "hono",
    integration: "live"
  });
});

app.get("/stack", (c) => {
  return c.json(stack);
});

app.post("/reason", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const result = await callNebius(body.prompt);

  return c.json({
    route: "/reason",
    integration: result.integration,
    result
  });
});

serve({
  fetch: app.fetch,
  port: PORT
});

console.log(`Hono brain API running on http://localhost:${PORT}`);
console.log(`Reasoning mode: ${NEBIUS_API_KEY && NEBIUS_MODEL ? "live" : "fixture"}`);
EOF
```

## Paso 3 - Verifica en modo fixture

```bash
npm run check
npm start
```

En otra terminal:

```bash
curl http://localhost:3001/health
curl http://localhost:3001/stack
curl -X POST http://localhost:3001/reason \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Explica el rol de Nebius Token Factory en esta arquitectura."}'
```

El resultado debe decir `integration: "fixture"` si no configuraste Nebius.
Esto es válido para una demo estable.

## Paso 4 - Conecta Nebius Token Factory

En Nebius Token Factory, crea una API key y elige un modelo desde el playground.
Después exporta las variables:

```bash
export NEBIUS_API_KEY="replace-with-event-key"
export NEBIUS_MODEL="replace-with-model-from-nebius-playground"
export NEBIUS_BASE_URL="https://api.tokenfactory.nebius.com/v1"
npm start
```

Verifica:

```bash
curl -X POST http://localhost:3001/reason \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Dame una frase sobre por qué AI x Blockchain importa."}'
```

El resultado debe decir `integration: "live"`.

## Paso 5 - Narrativa para el speaker

Usa esta secuencia:

1. `GET /health` prueba que el backend Hono está vivo.
2. `GET /stack` muestra las piezas: aplicación, backend, Nebius y blockchain infra.
3. `POST /reason` muestra que la aplicación puede razonar.
4. Si no hay key, di en voz alta: "esta llamada está en fixture".
5. Si hay key, di en voz alta: "esta llamada está usando Nebius Token Factory en live mode".

La frase de cierre:

```text
Hoy le dimos un cerebro a la aplicación. En el siguiente workshop vamos a darle un harness para que pueda actuar.
```

## Fallback

Si falla la red, la API key o el modelo:

```bash
unset NEBIUS_API_KEY NEBIUS_MODEL NEBIUS_BASE_URL
npm start
```

El workshop sigue funcionando porque el servidor responde con fixtures
etiquetados.

## Checklist para speakers

- Usa Hono como servidor.
- No proyectes API keys.
- Ten listo el modo fixture.
- Si usas Nebius, confirma `NEBIUS_API_KEY` y `NEBIUS_MODEL` antes de la sesión.
- Etiqueta la integración como `live` o `fixture`.
- Cierra conectando con Workshop 2: el backend ya razona, ahora el agente necesita actuar.
