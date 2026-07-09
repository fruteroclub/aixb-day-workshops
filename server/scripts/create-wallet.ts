import { createHash, randomBytes } from "node:crypto";
import { writeFileSync } from "node:fs";

const privateKey = `0x${randomBytes(32).toString("hex")}`;
const address = `0x${createHash("sha256").update(privateKey).digest("hex").slice(-40)}`;

const wallet = {
  mode: "fixture",
  network: "no-mainnet",
  address,
  privateKey,
  warning: "Demo identity only. Do not fund this wallet.",
  createdAt: new Date().toISOString()
};

writeFileSync(".aixb-wallet.fixture.json", JSON.stringify(wallet, null, 2));

console.log(`Created fixture wallet identity: ${address}`);
console.log("Stored in .aixb-wallet.fixture.json. Do not commit this file.");
