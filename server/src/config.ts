import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { AppConfig, StageCapability, WorkshopStage } from "./types.js";

export const WALLET_FILE = ".aixb-wallet.fixture.json";

export function configured(value: string | undefined): boolean {
  return Boolean(value && value.trim());
}

function parseEnvLine(line: string): [string, string] | null {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) return null;

  const separator = trimmed.indexOf("=");
  if (separator === -1) return null;

  const key = trimmed.slice(0, separator).trim();
  let value = trimmed.slice(separator + 1).trim();

  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) return null;

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }

  return [key, value];
}

function loadLocalEnv(env: NodeJS.ProcessEnv): NodeJS.ProcessEnv {
  const envFile = resolve(process.cwd(), ".env");
  if (!existsSync(envFile)) return env;

  const parsed: NodeJS.ProcessEnv = {};
  const raw = readFileSync(envFile, "utf8");

  for (const line of raw.split(/\r?\n/)) {
    const entry = parseEnvLine(line);
    if (!entry) continue;

    const [key, value] = entry;
    parsed[key] = value;
  }

  return {
    ...parsed,
    ...env
  };
}

export function clampStage(value: string | undefined): WorkshopStage {
  const parsed = Number(value ?? 4);
  if (Number.isInteger(parsed) && parsed >= 1 && parsed <= 4) {
    return parsed as WorkshopStage;
  }
  return 4;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  const mergedEnv = loadLocalEnv(env);
  const stage = clampStage(mergedEnv.WORKSHOP_STAGE);

  return {
    stage,
    port: Number(mergedEnv.PORT ?? 3001),
    nebiusBaseUrl: mergedEnv.NEBIUS_BASE_URL ?? "https://api.tokenfactory.nebius.com/v1",
    walletFile: WALLET_FILE,
    env: mergedEnv
  };
}

export function isStageEnabled(config: AppConfig, requiredStage: WorkshopStage): boolean {
  return config.stage >= requiredStage;
}

export function stageCapabilities(config: AppConfig): StageCapability[] {
  return [
    {
      workshop: 1,
      name: "Brain API",
      enabled: isStageEnabled(config, 1),
      routes: ["GET /health", "GET /stack", "POST /reason"]
    },
    {
      workshop: 2,
      name: "Mentor Agent setup",
      enabled: isStageEnabled(config, 2),
      routes: ["GET /integrations", "GET /wallet", "GET /github/repo/:owner/:repo"]
    },
    {
      workshop: 3,
      name: "Mentor Agent web and API",
      enabled: isStageEnabled(config, 3),
      routes: ["GET /", "POST /mentor-agent", "GET /repo/:owner/:repo", "POST /mentor"]
    },
    {
      workshop: 4,
      name: "UI-controlled x402 payment gate and ERC-8004 discovery",
      enabled: isStageEnabled(config, 4),
      routes: [
        "GET /.well-known/agent-registration.json",
        "GET /payment-mode",
        "POST /payment-mode",
        "GET /services",
        "POST /jobs",
        "GET /jobs/:id"
      ]
    }
  ];
}
