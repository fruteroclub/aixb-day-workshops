import { callNebius } from "../integrations/nebius.js";
import type { AppConfig } from "../types.js";
import type { App } from "../workshop-gates.js";

function fixtureReasoning(prompt: string): string {
  return [
    "A Hono backend gives the application a safe place to run logic, keep secrets and call external systems.",
    "Nebius Token Factory adds reasoning through an OpenAI-compatible API.",
    "Blockchain later adds identity, payments, permissions and coordination.",
    `Prompt received: ${prompt || "no prompt"}`
  ].join(" ");
}

export function registerBrainRoutes(app: App, config: AppConfig): void {
  app.get("/stack", (c) => {
    return c.json({
      event: "AI x Blockchain Day",
      workshop: 1,
      integration: "fixture",
      architecture: [
        {
          piece: "Participant app",
          job: "Receives a builder goal and calls the backend."
        },
        {
          piece: "Hono backend",
          job: "Exposes routes, validates requests and keeps secrets off the client."
        },
        {
          piece: "Nebius Token Factory",
          job: "Provides OpenAI-compatible inference for reasoning when credentials exist."
        },
        {
          piece: "Blockchain infrastructure",
          job: "Adds identity, ownership, payments and coordination in later workshops."
        }
      ]
    });
  });

  app.post("/reason", async (c) => {
    const body = (await c.req.json<{ prompt?: string }>().catch(() => ({}))) as { prompt?: string };
    const prompt = body.prompt ?? "Explain why this application needs a backend.";
    const result = await callNebius(config, {
      system: "Explain AI x Blockchain concepts clearly for builders. Be concise and technical.",
      user: prompt,
      fixtureText: fixtureReasoning(prompt)
    });

    return c.json({
      route: "/reason",
      workshop: 1,
      integration: result.integration,
      result
    });
  });
}
