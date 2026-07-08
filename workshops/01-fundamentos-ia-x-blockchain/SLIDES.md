# Slide Structure - Fundamentos IA x Blockchain

**Duration:** 25 minutes max  
**Goal:** Give participants a clear map of AI, agents, blockchain and the first build path: a Hono backend connected to Nebius Token Factory.

## Slide production notes

- Match the landing brand: dark background, Space Grotesk headings, mono labels,
  cyan for structure/system, rosa only for the action mark.
- Use the event name exactly: **AI x Blockchain Day**.
- Keep copy concrete and hype-free.
- Include one system diagram: application -> Hono backend -> Nebius Token Factory.
- Include one proof slide that labels the demo as `live` or `fixture`.

## Slide structure

| # | Slide | Purpose | Timing |
|---|---|---|---|
| 1 | Title: Fundamentos IA x Blockchain | Set the promise: understand frontier tech without deep technical background. | 1 min |
| 2 | Why this matters now | Frame AI as work-generation infrastructure and blockchain as coordination/value infrastructure. | 2 min |
| 3 | The full stack in one picture | Show application -> Hono backend -> Nebius -> future blockchain infra. | 3 min |
| 4 | AI: the status quo | Explain LLMs, inference providers and why context changes outputs. | 4 min |
| 5 | Context engineering | Show context as instructions + data + tools + memory + evaluation. | 3 min |
| 6 | Agent harnesses, skills, integrations | Explain how agents move beyond chat into operating environments. | 3 min |
| 7 | Blockchain as infrastructure for agents | Explain wallets, identity, payments, permissions and coordination. | 4 min |
| 8 | Demo/build path | Preview the Hono API that calls Nebius Token Factory. | 3 min |
| 9 | What you should remember | Summarize categories and next step into Workshop 2. | 2 min |

## Technical steps - high-level ordered list

1. Create a minimal Hono backend project.
2. Add `GET /health`.
3. Add `GET /stack`.
4. Configure environment variables for Nebius Token Factory.
5. Add `POST /reason`.
6. Add fixture fallback when Nebius credentials are missing.
7. Run local verification with curl.
8. Clearly label what is `live` and what is `fixture`.

## Speaker notes

- Keep the language conceptual but concrete.
- Avoid deep implementation details unless they support the mental model.
- The technical demo is proof of reasoning, not a full app.
- Protect the 25-minute limit: if live setup fails, switch to fixture.

## Required close slide

```text
LLM: understands and generates.
Harness: gives tools, files, permissions and operating loop.
Backend: exposes the system as a service.
Blockchain infra: verifies identity, state, payment or coordination.
```
