# Slide Structure — Lanza tu propio Agente Mentor

**Duration:** 25 minutes max  
**Goal:** Help participants understand the difference between an LLM and an agent harness, then show the path to running a local Pi Coding Agent that explains while it builds.

## Slide structure

| # | Slide | Purpose | Timing |
|---|---|---|---|
| 1 | Title: Lanza tu propio Agente Mentor | Set the promise: build with an AI that explains while it works. | 1 min |
| 2 | From chatbot to operating partner | Show why a chat interface is not enough for real project work. | 3 min |
| 3 | LLMs vs harnesses | Define model vs runtime/environment/tools/permissions. | 4 min |
| 4 | What makes an agent a mentor? | Explain planning, teaching, editing, verifying, and reflecting. | 3 min |
| 5 | Pi Coding Agent fundamentals | Show the core components: model, config, project context, tools, command loop. | 4 min |
| 6 | Local setup path | Walk through the setup checklist at a high level. | 3 min |
| 7 | First task demo | Show the agent creating or changing a small project artifact. | 5 min |
| 8 | Good prompts for agent work | Give reusable prompt patterns: inspect, plan, build, verify, explain. | 1 min |
| 9 | Close: next job for the agent | Connect to Workshop 3: giving the agent a real web-service task. | 1 min |

## Technical steps — high-level ordered list

1. Confirm local prerequisites: terminal, Git, runtime, and any required package manager.
2. Install or open Pi Coding Agent according to the facilitator-approved setup path.
3. Configure the LLM provider or event-provided credentials.
4. Create or open a small project directory for the demo.
5. Start the Pi Coding Agent inside that project context.
6. Ask the agent to inspect the current project or propose a minimal structure.
7. Ask the agent for a plan before it edits files.
8. Ask the agent to create one small artifact, such as a README, simple script, or endpoint scaffold.
9. Ask the agent to explain what it changed.
10. Run the verification command or inspect the generated output.
11. Ask the agent what the next build step should be.

## Speaker notes

- Do not spend the whole session on installation.
- The strongest demo is a short edit with visible verification.
- Emphasize that good operators ask the agent for a plan before execution.
- If setup fails, switch to projected pair-programming with one working local environment.
