# Slide Structure — Fundamentos IA x Blockchain

**Duration:** 25 minutes max  
**Goal:** Give non-technical participants a clear map of AI, agents, blockchain, and the minimum build path that connects an LLM-backed backend with blockchain infrastructure.

## Slide structure

| # | Slide | Purpose | Timing |
|---|---|---|---|
| 1 | Title: Fundamentos IA x Blockchain | Set the promise: understand frontier tech without deep technical background. | 1 min |
| 2 | Why this matters now | Frame AI as work-generation infrastructure and blockchain as coordination/value infrastructure. | 2 min |
| 3 | The full stack in one picture | Show user → agent/harness → LLM inference → backend → blockchain infra. | 3 min |
| 4 | AI: the status quo | Explain LLMs, inference providers, and why context changes outputs. | 4 min |
| 5 | Context engineering | Show context as instructions + data + tools + memory + evaluation. | 3 min |
| 6 | Agent harnesses, skills, integrations | Explain how agents move beyond chat into operating environments. | 3 min |
| 7 | Blockchain as infrastructure for agents | Explain wallets, transactions, contracts, identity, payments, and permissions. | 4 min |
| 8 | Demo/build path | Preview the backend that calls an LLM and blockchain infrastructure. | 3 min |
| 9 | What you should remember | Summarize categories and next step into Workshop 2. | 2 min |

## Technical steps — high-level ordered list

1. Create or open a minimal backend project.
2. Add a simple server entrypoint.
3. Add a health-check endpoint.
4. Configure environment variables for an LLM provider.
5. Add one endpoint that sends a prompt to the LLM provider and returns a response.
6. Configure access to blockchain infrastructure through a public RPC, SDK, or mock.
7. Add one endpoint that reads simple blockchain data, such as chain ID, latest block, balance, or mock wallet state.
8. Add a combined demo endpoint or flow that explains how the LLM and blockchain pieces connect.
9. Run local verification with browser or curl.
10. Clearly label what is real integration, what is mock/demo, and what would be needed for production.

## Speaker notes

- Keep the language conceptual but concrete.
- Avoid deep implementation details unless they support the mental model.
- The technical demo is proof of connection, not a full app.
- Protect the 25-minute limit: if live setup fails, switch to prepared demo or mock.
