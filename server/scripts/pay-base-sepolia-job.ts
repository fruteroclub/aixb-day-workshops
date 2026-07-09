import { x402Client, x402HTTPClient } from "@x402/core/client";
import type { Network } from "@x402/core/types";
import { registerExactEvmScheme } from "@x402/evm/exact/client";
import { wrapFetchWithPayment } from "@x402/fetch";
import { privateKeyToAccount } from "viem/accounts";
import { loadConfig } from "../src/config.js";
import { x402Network } from "../src/integrations/x402.js";

function required(value: string | undefined, name: string): string {
  if (!value?.trim()) {
    throw new Error(`Missing ${name}. Add it to server/.env or export it in this terminal.`);
  }

  return value.trim();
}

function privateKey(value: string): `0x${string}` {
  const normalized = value.startsWith("0x") ? value : `0x${value}`;
  if (!/^0x[0-9a-fA-F]{64}$/.test(normalized)) {
    throw new Error("X402_BUYER_PRIVATE_KEY must be a 32-byte EVM private key.");
  }

  return normalized as `0x${string}`;
}

async function requestJson(url: string, init?: RequestInit): Promise<unknown> {
  const response = await fetch(url, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init?.headers ?? {})
    }
  });
  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(`${init?.method ?? "GET"} ${url} returned ${response.status}: ${JSON.stringify(body)}`);
  }

  return body;
}

const config = loadConfig();
const baseUrl = config.env.X402_TEST_BASE_URL ?? `http://localhost:${config.port}`;
const network = x402Network(config) as Network;
const buyerKey = privateKey(required(config.env.X402_BUYER_PRIVATE_KEY, "X402_BUYER_PRIVATE_KEY"));

if (config.env.X402_MODE !== "base-sepolia") {
  throw new Error("Set X402_MODE=base-sepolia for the live x402 test.");
}

required(config.env.X402_PAY_TO, "X402_PAY_TO");

await requestJson(`${baseUrl}/health`);
const paymentMode = await requestJson(`${baseUrl}/payment-mode`, {
  method: "POST",
  body: JSON.stringify({ enabled: true })
});

if (
  typeof paymentMode !== "object" ||
  paymentMode === null ||
  !("mode" in paymentMode) ||
  (paymentMode as { mode?: { live?: boolean; ready?: boolean } }).mode?.live !== true ||
  (paymentMode as { mode?: { live?: boolean; ready?: boolean } }).mode?.ready !== true
) {
  throw new Error(`Server is not ready for Base Sepolia x402 mode: ${JSON.stringify(paymentMode)}`);
}

const account = privateKeyToAccount(buyerKey);
const client = new x402Client();
registerExactEvmScheme(client, {
  signer: account,
  networks: [network]
});

const httpClient = new x402HTTPClient(client);
const fetchWithPayment = wrapFetchWithPayment(fetch, client);
const response = await fetchWithPayment(`${baseUrl}/jobs`, {
  method: "POST",
  headers: {
    "content-type": "application/json"
  },
  body: JSON.stringify({
    task: "summarize",
    input: "Base Sepolia live x402 payment test for AI x Blockchain Day."
  })
});
const result = await httpClient.processResponse(response);

console.log(
  JSON.stringify(
    {
      ok: response.ok,
      status: response.status,
      paymentStatus: result.paymentStatus,
      network,
      body: result.body,
      paymentHeader: result.header
    },
    null,
    2
  )
);

if (!response.ok || result.paymentStatus !== "settled") {
  throw new Error("Base Sepolia x402 payment did not settle.");
}
