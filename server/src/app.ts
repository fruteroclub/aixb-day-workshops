import { Hono } from "hono";
import { stageCapabilities } from "./config.js";
import { registerAgentRoutes } from "./routes/agent.js";
import { registerBrainRoutes } from "./routes/brain.js";
import { registerJobRoutes } from "./routes/jobs.js";
import { registerMentorAgentRoutes } from "./routes/mentor-agent.js";
import { registerMentorRoutes } from "./routes/mentor.js";
import { registerWebRoutes } from "./routes/web.js";
import type { AppConfig } from "./types.js";

export function createApp(config: AppConfig): Hono {
  const app = new Hono();

  app.get("/health", (c) => {
    return c.json({
      ok: true,
      service: "aixb-day-server",
      event: "AI x Blockchain Day",
      framework: "hono",
      integration: "live",
      workshopStage: config.stage,
      capabilities: stageCapabilities(config)
    });
  });

  registerWebRoutes(app, config);
  registerBrainRoutes(app, config);
  registerAgentRoutes(app, config);
  registerMentorAgentRoutes(app, config);
  registerMentorRoutes(app, config);
  registerJobRoutes(app, config);

  return app;
}
