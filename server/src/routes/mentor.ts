import { getRepoContext } from "../integrations/github.js";
import { createMentorAgentResult } from "../services/mentor-agent.js";
import type { AppConfig } from "../types.js";
import { requireStage, type App } from "../workshop-gates.js";

type MentorBody = {
  repoUrl?: string;
  owner?: string;
  repo?: string;
  goal?: string;
};

export function registerMentorRoutes(app: App, config: AppConfig): void {
  app.get("/repo/:owner/:repo", async (c) => {
    const unavailable = requireStage(c, config, 3);
    if (unavailable) return unavailable;

    return c.json(await getRepoContext(config, c.req.param("owner"), c.req.param("repo")));
  });

  app.post("/mentor", async (c) => {
    const unavailable = requireStage(c, config, 3);
    if (unavailable) return unavailable;

    const body = (await c.req.json<MentorBody>().catch(() => ({}))) as MentorBody;
    const result = await createMentorAgentResult(config, body);
    return c.json({ ...result, route: "/mentor", workshop: 3 });
  });
}
