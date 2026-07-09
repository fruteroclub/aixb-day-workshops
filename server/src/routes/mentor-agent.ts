import { createMentorAgentResult, type MentorAgentInput } from "../services/mentor-agent.js";
import type { AppConfig } from "../types.js";
import { requireStage, type App } from "../workshop-gates.js";

export function registerMentorAgentRoutes(app: App, config: AppConfig): void {
  app.post("/mentor-agent", async (c) => {
    const unavailable = requireStage(c, config, 3);
    if (unavailable) return unavailable;

    const body = (await c.req.json<MentorAgentInput>().catch(() => ({}))) as MentorAgentInput;
    const result = await createMentorAgentResult(config, body);
    return c.json({ ...result, workshop: 3 });
  });
}
