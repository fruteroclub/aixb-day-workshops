export type WorkshopStage = 1 | 2 | 3 | 4;

export type IntegrationState = "live" | "fixture" | "mock" | "configured" | "missing" | "not-enabled";

export type AppConfig = {
  stage: WorkshopStage;
  port: number;
  nebiusBaseUrl: string;
  walletFile: string;
  env: NodeJS.ProcessEnv;
};

export type StageCapability = {
  workshop: WorkshopStage;
  name: string;
  enabled: boolean;
  routes: string[];
};

export type NebiusResult = {
  integration: "live" | "fixture";
  provider: "nebius-token-factory" | "local-fixture";
  model?: string;
  text: string;
};

export type RepoContext = {
  integration: "live" | "fixture";
  owner: string;
  repo: string;
  name: string;
  fullName: string;
  description: string | null;
  stars: number;
  forks: number;
  defaultBranch: string;
  language: string | null;
  topics: string[];
  languages: Record<string, number>;
  readmeExcerpt: string;
  warning?: string;
};

export type WalletStatus =
  | {
      integration: "fixture";
      address: string;
      network: string;
      warning: string;
    }
  | {
      integration: "missing";
      message: string;
    };

export type JobRecord = {
  id: string;
  status: "completed";
  integration: "mock";
  task: string;
  input: string;
  result: string;
  receipt: {
    type: "mock" | "testnet";
    value: "mock-valid" | "testnet-valid";
    verified: true;
  };
  createdAt: string;
};
