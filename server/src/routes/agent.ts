import { getRepoContext } from "../integrations/github.js";
import { readWallet } from "../integrations/wallet.js";
import type { AppConfig } from "../types.js";
import { integrationSummary, requireStage, type App } from "../workshop-gates.js";

export function registerAgentRoutes(app: App, config: AppConfig): void {
  app.get("/integrations", async (c) => {
    const unavailable = requireStage(c, config, 2);
    if (unavailable) return unavailable;

    return c.json({
      workshop: 2,
      ...integrationSummary(config),
      wallet: await readWallet(config)
    });
  });

  app.get("/wallet", async (c) => {
    const unavailable = requireStage(c, config, 2);
    if (unavailable) return unavailable;

    return c.json(await readWallet(config));
  });

  app.get("/github/repo/:owner/:repo", async (c) => {
    const unavailable = requireStage(c, config, 2);
    if (unavailable) return unavailable;

    return c.json(await getRepoContext(config, c.req.param("owner"), c.req.param("repo")));
  });
}
