import { configured } from "../config.js";
import { errorMessage } from "../http.js";
import type { AppConfig, NebiusResult } from "../types.js";

type NebiusRequest = {
  system: string;
  user: string;
  fixtureText: string;
};

type NebiusChatResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

export async function callNebius(config: AppConfig, request: NebiusRequest): Promise<NebiusResult> {
  if (!configured(config.env.NEBIUS_API_KEY) || !configured(config.env.NEBIUS_MODEL)) {
    return {
      integration: "fixture",
      provider: "local-fixture",
      text: request.fixtureText
    };
  }

  try {
    const response = await fetch(`${config.nebiusBaseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${config.env.NEBIUS_API_KEY}`
      },
      body: JSON.stringify({
        model: config.env.NEBIUS_MODEL,
        messages: [
          {
            role: "system",
            content: request.system
          },
          {
            role: "user",
            content: request.user
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Nebius returned ${response.status}: ${await response.text()}`);
    }

    const data = (await response.json()) as NebiusChatResponse;

    return {
      integration: "live",
      provider: "nebius-token-factory",
      model: config.env.NEBIUS_MODEL,
      text: data.choices?.[0]?.message?.content ?? ""
    };
  } catch (error) {
    return {
      integration: "fixture",
      provider: "local-fixture",
      text: `${request.fixtureText}\n\nLive Nebius call failed: ${errorMessage(error)}`
    };
  }
}
