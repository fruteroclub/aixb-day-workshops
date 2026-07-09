import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { configured, loadConfig } from "../src/config.js";

const config = loadConfig();
const piAgentDir = join(homedir(), ".pi", "agent");
const baseUrl = config.nebiusBaseUrl.endsWith("/") ? config.nebiusBaseUrl : `${config.nebiusBaseUrl}/`;
const model = config.env.NEBIUS_MODEL || config.env.NEBIUS_TF_MODEL || "nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B";
const provider = "nebius-token-factory";

const models = {
  providers: {
    [provider]: {
      baseUrl,
      api: "openai-completions",
      apiKey: "$NEBIUS_API_KEY",
      models: [
        {
          id: model,
          name: `${model} via Nebius Token Factory`,
          input: ["text"],
          reasoning: false,
          contextWindow: 110000,
          maxTokens: 16384,
          cost: {
            input: 0.1,
            output: 0.3,
            cacheRead: 0,
            cacheWrite: 0
          },
          compat: {
            supportsReasoningEffort: false
          }
        }
      ]
    }
  }
};

const settings = {
  defaultProvider: provider,
  defaultModel: model,
  defaultThinkingLevel: "off",
  enabledModels: [`${provider}/${model}`]
};

mkdirSync(piAgentDir, { recursive: true });

const modelsPath = join(piAgentDir, "models.json");
const settingsPath = join(piAgentDir, "settings.json");

writeFileSync(modelsPath, `${JSON.stringify(models, null, 2)}\n`);
writeFileSync(settingsPath, `${JSON.stringify(settings, null, 2)}\n`);
chmodSync(modelsPath, 0o600);
chmodSync(settingsPath, 0o600);

console.log(`Configured Pi provider: ${provider}`);
console.log(`Configured Pi model: ${model}`);
console.log(`Wrote ${modelsPath}`);
console.log(`Wrote ${settingsPath}`);

if (!configured(config.env.NEBIUS_API_KEY)) {
  console.log("NEBIUS_API_KEY is not loaded in this process. Export it before running pi.");
}
