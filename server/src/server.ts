import { serve } from "@hono/node-server";
import { configured, loadConfig } from "./config.js";
import { createApp } from "./app.js";

const config = loadConfig();
const app = createApp(config);

serve({
  fetch: app.fetch,
  port: config.port
});

console.log(`AI x Blockchain Day server running on http://localhost:${config.port}`);
console.log(`Workshop stage: ${config.stage}`);
console.log(
  `Nebius mode: ${
    configured(config.env.NEBIUS_API_KEY) && configured(config.env.NEBIUS_MODEL) ? "live" : "fixture"
  }`
);
