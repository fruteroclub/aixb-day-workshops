import type { Context, Hono } from "hono";
import { configured, isStageEnabled } from "./config.js";
import { stageUnavailable } from "./http.js";
import type { AppConfig, WorkshopStage } from "./types.js";

export type App = Hono;

export function requireStage(c: Context, config: AppConfig, requiredStage: WorkshopStage): Response | null {
  if (isStageEnabled(config, requiredStage)) return null;
  return stageUnavailable(c, config, requiredStage);
}

export function integrationSummary(config: AppConfig) {
  return {
    nebius: configured(config.env.NEBIUS_API_KEY) && configured(config.env.NEBIUS_MODEL) ? "live" : "fixture",
    github: "public-or-fixture"
  };
}
