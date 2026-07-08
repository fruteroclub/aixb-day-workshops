# Slide Structure - Launch Your Agent

**Duration:** 25 minutes max  
**Goal:** Move from an application that can reason to an agent runtime that can act.

## Slide production notes

- Match the landing brand: dark background, Space Grotesk headings, mono labels,
  cyan for system structure, rosa only for the action mark.
- Use the event name exactly: **AI x Blockchain Day**.
- Keep copy concrete and operator-focused.
- Include one diagram of the integration server.
- Include one proof slide showing integration status from the Hono integration server.

## Slide structure

| # | Slide | Purpose | Timing |
|---|---|---|---|
| 1 | Title: Launch Your Agent | Set the promise: turning intelligence into action. | 1 min |
| 2 | Last time | Remind the audience that Workshop 1 gave the app a brain. | 2 min |
| 3 | The evolution of software | Compute -> reason -> act -> participate. | 2 min |
| 4 | LLMs are not agents | Define answer generation vs goal execution. | 3 min |
| 5 | What makes an agent? | Goals, tools, files, external systems and iteration. | 3 min |
| 6 | The agent runtime | Explain the runtime around the model. | 3 min |
| 7 | Pi Coding Agent | Introduce Pi as the builder agent. | 3 min |
| 8 | Today's integration map | Show Pi + Nebius + wallet + GitHub + Vercel + Telegram. | 3 min |
| 9 | Build | Walk through the six build steps. | 4 min |
| 10 | Close: next job for the agent | Connect to Workshop 3: Builder Mentor API. | 1 min |

## Technical steps - ordered list

1. Deploy Pi Coding Agent.
2. Connect Nebius Token Factory.
3. Create a blockchain wallet.
4. Connect GitHub.
5. Connect Vercel.
6. Connect Telegram.

## Required architecture slide

```text
Pi Coding Agent
        |
        |-- Nebius Token Factory
        |       Reasoning
        |
        |-- Blockchain Wallet
        |       Identity
        |
        |-- GitHub
        |       Code
        |
        |-- Vercel
        |       Deployment
        |
        `-- Telegram
                Communication
```

## Speaker notes

- Pi Coding Agent is installed during the workshop, not required before it.
- Do not spend the whole session debugging installs.
- Use the Hono integration server as the proof surface.
- Label every integration as `live`, `configured`, `fixture`, `mock` or `missing`.
- If setup fails, switch to the speaker machine and continue with fixtures.

## Required close slide

```text
Pi builds.
Nebius reasons.
Wallet identifies.
GitHub provides code.
Vercel deploys.
Telegram communicates.
```
