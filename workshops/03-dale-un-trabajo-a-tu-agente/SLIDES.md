# Slide Structure - Give Your Agent a Job

**Duration:** 25 minutes max  
**Goal:** Build an AI-native service that turns GitHub repository data into builder guidance.

## Slide production notes

- Match the landing brand: dark background, Space Grotesk headings, mono labels,
  cyan for system structure, rosa only for the action mark.
- Use the event name exactly: **AI x Blockchain Day**.
- Keep copy concrete and builder-focused.
- Include one architecture diagram.
- Include one proof slide with three curl commands.

## Slide structure

| # | Slide | Purpose | Timing |
|---|---|---|---|
| 1 | Title: Give Your Agent a Job | Set the promise: building an AI-native service. | 1 min |
| 2 | Last time | Remind the audience that the app can reason and act. | 2 min |
| 3 | The evolution of software | Compute -> reason -> act -> provide value -> capture value. | 2 min |
| 4 | Agents need a purpose | Explain why a useful agent needs a service job. | 3 min |
| 5 | What makes a good AI service? | Clear inputs, useful outputs and reusable API. | 3 min |
| 6 | The AI service pattern | External data -> AI reasoning -> added value. | 3 min |
| 7 | Meet the AI Builder Mentor | Introduce the service. | 3 min |
| 8 | Architecture | Show User -> Builder Mentor API -> GitHub + Nebius -> response. | 3 min |
| 9 | Today's workshop | Name the build targets. | 3 min |
| 10 | Proof | Show health, repo lookup and mentor response. | 2 min |

## Technical steps - ordered list

1. Create a Hono service.
2. Add `GET /health`.
3. Add GitHub repository lookup.
4. Add Nebius Token Factory reasoning.
5. Add `POST /mentor`.
6. Verify with curl.
7. Label GitHub and Nebius as `live` or `fixture`.

## Required architecture slide

```text
User
    |
    v
Builder Mentor API
    |
    |-- GitHub API
    |
    `-- Nebius Token Factory
            |
            v
      AI Reasoning
            |
            v
  Structured Response
```

## Speaker notes

- The service is Builder Mentor API, not a generic demo.
- Do not add login, database, wallet, marketplace or UI.
- Keep the proof to three curl commands.
- If GitHub or Nebius fail, use fixtures and label them.

## Required close slide

```text
Raw repo data becomes recommendations.
That is the job.
Workshop 4 turns valuable jobs into paid or authorized work.
```
