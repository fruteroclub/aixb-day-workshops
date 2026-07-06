# Slide Structure — Dale un trabajo a tu Agente

**Duration:** 25 minutes max  
**Goal:** Show participants how to use an agent to build a small web service: a Pokémon Trainer Service connected to PokéAPI and prepared for Pokémon NFT ownership as real integration or mock.

## Slide structure

| # | Slide | Purpose | Timing |
|---|---|---|---|
| 1 | Title: Dale un trabajo a tu Agente | Set the promise: learn web services by building with your agent. | 1 min |
| 2 | What is a web service? | Explain server, route, request, response, JSON, and status code. | 3 min |
| 3 | The job: Pokémon Trainer Service | Define the concrete service the agent will build. | 3 min |
| 4 | Service architecture | Show client → backend → PokéAPI → NFT/wallet check/mock → battle result. | 4 min |
| 5 | What the agent should do | Translate the work into agent instructions: design, build, verify. | 3 min |
| 6 | Build/demo flow | Walk through endpoints and expected outputs. | 6 min |
| 7 | Pokémon NFTs: real vs mock | Explain how NFT ownership could gate teams, battles, or access. | 3 min |
| 8 | Deployment path | Name the live/local/tunnel deployment options. | 1 min |
| 9 | Close: from service to paid service | Connect to Workshop 4. | 1 min |

## Technical steps — high-level ordered list

1. Create or open a backend project for the Pokémon Trainer Service.
2. Add a simple server entrypoint.
3. Add `GET /health` for basic verification.
4. Add a Pokémon data client that connects to PokéAPI or uses local fixtures as fallback.
5. Add `GET /pokemon/:name` to return normalized Pokémon data.
6. Define a minimal trainer/team data model.
7. Define how Pokémon NFT ownership will be represented: real wallet/NFT check, testnet check, or explicit mock.
8. Add `POST /battle` to receive two Pokémon or two trainer/team references.
9. Implement simple battle logic using available stats.
10. Return a clear battle result with winner, inputs, and reasoning fields.
11. Add curl examples or a small local demo script.
12. Run local verification for all endpoints.
13. Prepare deployment option: local, tunnel, or hosted demo.
14. Mark what is real integration and what is mock.

## Speaker notes

- Keep the service small. Do not let the agent overbuild.
- The battle logic can be simple; the lesson is service design and agent-directed build flow.
- If PokéAPI fails, use fixtures.
- If NFT integration is too slow, use a clearly named mock and explain the production replacement.
