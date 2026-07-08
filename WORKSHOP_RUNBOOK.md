# AI x Blockchain Day Workshop Runbook

This is the shared operating guide for the workshop track. It connects this repo
to the event source of truth in `~/workspaces/frutero/projects/blockchain-ai-day/`
and to the landing/style system in
`~/workspaces/frutero/projects/blockchain-ai-day/code/blockchain-ai-day-landing/`.

## Canonical sources

Use these files before changing workshop promises, visual language, schedule, or
public-facing copy:

| Source | What it owns |
|---|---|
| `blockchain-ai-day/code/blockchain-ai-day-landing/src/i18n/ui.ts` | Public program, event facts, registration link, venue, visible landing copy |
| `blockchain-ai-day/code/blockchain-ai-day-landing/DESIGN.md` | Brand system, typography, colors, component rules, voice constraints |
| `blockchain-ai-day/PROJECT.md` | Event scope, venue zones, attendance targets, operating constraints |
| `blockchain-ai-day/TICK.md` | Current planning/design task state |
| `blockchain-ai-day/workstreams/*/STATUS.md` | Fresh workstream status when repo trackers disagree |

Current public event facts from the landing:

- Name: **AI x Blockchain Day**
- Date: Thursday, July 9, 2026
- Public event window: 10:00-17:00, Mexico City time
- Workshop block: 12:00-14:00, four 25-minute sessions
- Room model: workshop stage, about 20 people
- Registration handoff: Luma

## Track shape

| Time | Workshop | Participant artifact | Proof of completion | Fallback |
|---|---|---|---|---|
| 12:00 | Fundamentos IA x Blockchain | Stack map plus minimal backend demo path | Participant can label AI, backend, provider, and blockchain infra in one flow | Facilitator-projected diagram plus mock endpoint output |
| 12:30 | Lanza tu propio Agente Mentor | Local agent workflow or observed facilitator run | Agent inspects, plans, edits or produces one artifact, then verifies | Pair-programming from facilitator machine |
| 13:00 | Dale un trabajo a tu Agente | Pokémon Trainer Service | `GET /health`, `GET /pokemon/:name`, `POST /battle` work or are documented with fixtures | Local fixtures and mock NFT ownership |
| 13:30 | Un Agente que cobra por trabajo | Paid-agent job flow | Unpaid job rejects, authorized/mock-paid job executes and returns a receipt | Mock receipt with explicit production replacement notes |

## Brand and voice contract

The workshops should feel native to the landing:

- Use **AI x Blockchain Day** exactly. Do not reorder the name.
- Voice: technical, confident, builder-to-builder, hype-free.
- Avoid generic motivational copy. Prefer concrete artifacts and proof.
- Use simple language without hiding the real system boundaries.
- No em-dashes in workshop materials. Use commas, periods, or hyphens.
- If creating slides, use the landing direction: dark background, Space Grotesk,
  JetBrains Mono labels, cyan for structure/system, rosa mexicana only for the
  action or `x` mark.
- The event is not Frutero-branded. Frutero may be an organizer context, but the
  public workshop identity is event-native.

## Delivery rules

- Keep every workshop to 25 minutes. The 5-minute gap is for room reset.
- Do not spend more than 4 minutes on setup inside the live session.
- Never depend on mainnet, real funds, or unaudited custody flows.
- Label every integration as one of: `live`, `testnet`, `sandbox`, `fixture`, or
  `mock`.
- If a setup or API call blocks for more than 60 seconds, switch to the fallback.
- The facilitator owns one working demo before the room opens.
- Every workshop must end with a visible proof, not only explanation.

## Standard 25-minute rhythm

Use this rhythm unless a workshop file gives a stricter schedule:

| Minute | Mode | Purpose |
|---|---|---|
| 00:00-00:03 | Frame | Promise, artifact, why this matters |
| 00:03-00:08 | Model | Minimum mental model, no deep detours |
| 00:08-00:12 | Architecture | Show the system boundary and data flow |
| 00:12-00:21 | Build/demo | Execute the smallest useful path |
| 00:21-00:24 | Proof | Run checks, compare real vs mock, answer one question |
| 00:24-00:25 | Handoff | Name the next session or next build step |

## Facilitator prep checklist

Before the event:

- Clone or open this repo and the landing repo.
- Confirm the public agenda still matches `src/i18n/ui.ts`.
- Prepare one working demo per workshop.
- Prepare one fallback per workshop: screenshot, fixture output, local mock, or
  pre-recorded path.
- Print or share each workshop's `EXERCISES.md`.
- Test venue internet, projector, terminal font size, and clipboard flow.
- Confirm whether participants will bring laptops. If not, run as projected
  workshop with take-home prompts.

Before each session:

- Open only the files needed for that workshop.
- Start the local demo server or agent session before the clock starts.
- Put verification commands in terminal history.
- Keep credentials out of projected terminals and slides.
- State what is real and what is simulated before running the demo.

## Proof standard

Each workshop should leave one of these visible proofs:

- A diagram or table completed by a participant.
- A generated or edited file.
- A terminal command that returns expected output.
- A local endpoint responding with JSON.
- A paid/authorized flow rejecting and accepting the correct requests.

If the proof uses a mock, the facilitator must name the production replacement:
provider API, wallet flow, onchain verification, payment provider, registry,
indexer, or deployment target.

## Content backlog

Useful next additions:

- `demo/` folders with copy-paste starter code for workshops 1, 3, and 4.
- A facilitator-only `.env.example` that never contains real secrets.
- Printable one-page cards for the four proof flows.
- A visual slide template derived from the landing design system.
