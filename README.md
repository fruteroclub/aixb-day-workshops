# AI x Blockchain Day Workshops

Repository for the practical workshop track of **AI x Blockchain Day**.

This repo is linked to the main event project at
`~/workspaces/frutero/projects/blockchain-ai-day/`. Use the landing app in
`~/workspaces/frutero/projects/blockchain-ai-day/code/blockchain-ai-day-landing/`
as the source of truth for event facts, public copy, visual language, and brand
rules.

The program is designed for people who want to understand and build at the intersection of artificial intelligence, agents, and blockchain without assuming advanced technical knowledge. Each workshop can stand alone, but together they form a complete progression:

```text
AI x Blockchain Fundamentals
        ↓
Launch Your Own Mentor Agent
        ↓
Give Your Agent a Job
        ↓
An Agent That Gets Paid for Work
```

## Track objective

Participants should leave with a practical map for building with AI and blockchain:

1. Understand the current state of AI, agents, and blockchain.
2. Launch a local agent that can explain while it builds.
3. Use the agent to create web services connected to APIs and blockchain infrastructure.
4. Integrate identity and payments so an agent can sell or charge for work.

## Source of truth

Before changing public workshop promises, timing, style, or event facts, check:

- [`WORKSHOP_RUNBOOK.md`](WORKSHOP_RUNBOOK.md) for operating rules, proof
  standards, and facilitator constraints.
- `blockchain-ai-day/code/blockchain-ai-day-landing/src/i18n/ui.ts` for the
  current public agenda.
- `blockchain-ai-day/code/blockchain-ai-day-landing/DESIGN.md` for brand and
  slide direction.
- `blockchain-ai-day/PROJECT.md` and `blockchain-ai-day/TICK.md` for event
  planning state.

## Workshops

| # | Time | Workshop | Promise | Participant artifact | Directory |
|---|---|---|---|---|---|
| 1 | 12:00 | AI x Blockchain Fundamentals | Learn how these frontier technologies work without technical background. | Stack map plus minimal Hono brain API connected to Nebius Token Factory. | [`workshops/01-fundamentos-ia-x-blockchain`](workshops/01-fundamentos-ia-x-blockchain/) |
| 2 | 12:30 | Launch Your Own Mentor Agent | Turn the app into an agent by connecting real integrations. | Pi Coding Agent plus a Hono integration server for Nebius, wallet, GitHub, Vercel, and Telegram. | [`workshops/02-lanza-tu-agente-mentor`](workshops/02-lanza-tu-agente-mentor/) |
| 3 | 13:00 | Give Your Agent a Job | Build an AI-native service with a clear job. | Builder Mentor API with GitHub integration and Nebius reasoning. | [`workshops/03-dale-un-trabajo-a-tu-agente`](workshops/03-dale-un-trabajo-a-tu-agente/) |
| 4 | 13:30 | An Agent That Gets Paid for Work | Enable payments so your agent can sell its services in a marketplace. | Paid-agent job flow with rejection and authorized execution. | [`workshops/04-agente-que-cobra`](workshops/04-agente-que-cobra/) |

## Recommended audience

- Builders and founders who want to build AI products.
- Non-technical participants who need to understand the stack without getting lost in jargon.
- Developers who want to connect agents, APIs, and blockchain.
- Communities and partners who want to activate practical use cases after the event.

## Teaching principles

- **Explain without dumbing down:** use simple language without losing precision.
- **Build early:** each session should land in an artifact, map, or demo.
- **Use agents as copilots:** participants learn alongside an agent, not only through lecture.
- **Separate category from tool:** first understand the concept; then use concrete tools.
- **Do not promise production-ready systems:** demos are learning paths, not audited systems for real-money usage.
- **Show proof:** every workshop ends with a diagram, generated file, command output,
  local endpoint, or rejected/accepted payment flow.
- **Label reality:** every integration is marked as live, testnet, sandbox, fixture,
  or mock.

## Operating format

- Each workshop is **25 minutes maximum**.
- There are **5 minutes between workshops** for speaker switch, laptop connection, demo setup, and room reset.
- The workshop stage capacity is about **20 people**.
- Each workshop should prioritize a minimal explanation, a guided demo, and an actionable close.
- If an installation or integration gets stuck, the facilitator should switch to a prepared demo or mock and protect the schedule.
- Do not depend on mainnet, real funds, or projected secrets.

## General requirements

For workshops 2-4, participants should ideally arrive with:

- Laptop with terminal access.
- Git installed.
- Node.js LTS or a runtime compatible with the stack chosen by facilitators.
- GitHub account.
- Access to an LLM provider or event-provided credentials.
- Test wallet or testnet access if the facilitator activates live payments/identity.

> Note: facilitators can adapt the final stack. This repository defines the pedagogical structure and minimum deliverables.

## Repository structure

```text
.
├── README.md
└── workshops/
    ├── 01-fundamentos-ia-x-blockchain/
    │   ├── README.md
    │   ├── TUTORIAL.md
    │   ├── SLIDES.md
    │   ├── FACILITATOR_GUIDE.md
    │   └── EXERCISES.md
    ├── 02-lanza-tu-agente-mentor/
    │   ├── README.md
    │   ├── TUTORIAL.md
    │   ├── SLIDES.md
    │   ├── FACILITATOR_GUIDE.md
    │   └── EXERCISES.md
    ├── 03-dale-un-trabajo-a-tu-agente/
    │   ├── README.md
    │   ├── TUTORIAL.md
    │   ├── SLIDES.md
    │   ├── FACILITATOR_GUIDE.md
    │   └── EXERCISES.md
    └── 04-agente-que-cobra/
        ├── README.md
        ├── SLIDES.md
        ├── FACILITATOR_GUIDE.md
        └── EXERCISES.md
```

## Status

Structured facilitator draft. Core promises, run of show, exercises, proof
criteria, and fallbacks are ready for Mel and facilitator review. Written
tutorials for workshops 1-3 are ready for speaker prep. Workshop 4 tutorial is
pending final copy.
