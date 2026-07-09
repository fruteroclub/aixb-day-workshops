import type { Context } from "hono";
import type { AppConfig, WorkshopStage } from "./types.js";

export function stageUnavailable(c: Context, config: AppConfig, requiredStage: WorkshopStage): Response {
  return c.json(
    {
      ok: false,
      integration: "not-enabled",
      message: `This route is available from workshop stage ${requiredStage}.`,
      workshopStage: config.stage
    },
    404
  );
}

export function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
