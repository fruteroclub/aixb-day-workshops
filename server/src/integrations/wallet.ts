import { readFile } from "node:fs/promises";
import type { AppConfig, WalletStatus } from "../types.js";

type WalletFile = {
  address?: string;
  network?: string;
  warning?: string;
};

export async function readWallet(config: AppConfig): Promise<WalletStatus> {
  try {
    const raw = await readFile(config.walletFile, "utf8");
    const wallet = JSON.parse(raw) as WalletFile;

    return {
      integration: "fixture",
      address: wallet.address ?? "unknown",
      network: wallet.network ?? "no-mainnet",
      warning: wallet.warning ?? "Demo identity only. Do not fund this wallet."
    };
  } catch {
    return {
      integration: "missing",
      message: "Run npm run wallet:create first."
    };
  }
}
