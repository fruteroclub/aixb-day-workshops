import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

type RequestOptions = RequestInit & {
  allowStatus?: number[];
};

const stages = process.argv[2] ? [Number(process.argv[2])] : [1, 2, 3, 4];
const appDir = fileURLToPath(new URL("..", import.meta.url));

for (const stage of stages) {
  if (!Number.isInteger(stage) || stage < 1 || stage > 4) {
    throw new Error(`Invalid stage: ${stage}`);
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function requestJson(url: string, options: RequestOptions = {}) {
  const { allowStatus, ...fetchOptions } = options;
  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      "content-type": "application/json",
      ...fetchOptions.headers
    }
  });
  const text = await response.text();
  const json = text ? (JSON.parse(text) as unknown) : {};

  if (!response.ok && !allowStatus?.includes(response.status)) {
    throw new Error(`${url} returned ${response.status}: ${text}`);
  }

  return {
    status: response.status,
    json
  };
}

async function requestText(url: string, options: RequestOptions = {}): Promise<{ status: number; text: string }> {
  const response = await fetch(url);
  const text = await response.text();

  if (!response.ok && !options.allowStatus?.includes(response.status)) {
    throw new Error(`${url} returned ${response.status}: ${text}`);
  }

  return {
    status: response.status,
    text
  };
}

async function waitForServer(baseUrl: string): Promise<void> {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const { json } = await requestJson(`${baseUrl}/health`);
      if (typeof json === "object" && json && "ok" in json) return;
    } catch {
      await delay(150);
    }
  }

  throw new Error(`Server did not become ready at ${baseUrl}`);
}

async function runStage(stage: number): Promise<void> {
  const port = 3100 + stage;
  const baseUrl = `http://127.0.0.1:${port}`;
  const child = spawn(process.execPath, ["--import", "tsx", "src/server.ts"], {
    cwd: appDir,
    env: {
      ...process.env,
      PORT: String(port),
      WORKSHOP_STAGE: String(stage),
      NEBIUS_API_KEY: "",
      NEBIUS_MODEL: ""
    },
    stdio: ["ignore", "pipe", "pipe"]
  });

  let output = "";
  child.stdout.on("data", (chunk: Buffer) => {
    output += chunk.toString();
  });
  child.stderr.on("data", (chunk: Buffer) => {
    output += chunk.toString();
  });

  try {
    await waitForServer(baseUrl);

    await requestJson(`${baseUrl}/stack`);
    await requestJson(`${baseUrl}/reason`, {
      method: "POST",
      body: JSON.stringify({ prompt: "Explain the workshop stack." })
    });

    if (stage >= 2) {
      await requestJson(`${baseUrl}/integrations`);
      await requestJson(`${baseUrl}/github/repo/honojs/hono`);
    } else {
      await requestJson(`${baseUrl}/integrations`, { allowStatus: [404] });
    }

    if (stage >= 3) {
      const { text: html } = await requestText(`${baseUrl}/`);
      if (!html.includes("Mentor Agent")) {
        throw new Error("Landing page did not render Mentor Agent UI.");
      }

      await requestJson(`${baseUrl}/mentor-agent`, {
        method: "POST",
        body: JSON.stringify({
          repoUrl: "https://github.com/honojs/hono",
          goal: "Check whether the app can create Mentor Agent guidance."
        })
      });
      await requestJson(`${baseUrl}/repo/honojs/hono`);
      await requestJson(`${baseUrl}/mentor`, {
        method: "POST",
        body: JSON.stringify({
          owner: "honojs",
          repo: "hono",
          goal: "Make a learning path."
        })
      });
    } else {
      await requestText(`${baseUrl}/`, { allowStatus: [404] });
      await requestJson(`${baseUrl}/mentor-agent`, {
        method: "POST",
        body: JSON.stringify({}),
        allowStatus: [404]
      });
      await requestJson(`${baseUrl}/mentor`, {
        method: "POST",
        body: JSON.stringify({}),
        allowStatus: [404]
      });
    }

    if (stage >= 4) {
      await requestJson(`${baseUrl}/services`);
      await requestJson(`${baseUrl}/jobs`, {
        method: "POST",
        body: JSON.stringify({ task: "summarize", input: "hello", paymentReceipt: null }),
        allowStatus: [402]
      });
      await requestJson(`${baseUrl}/jobs`, {
        method: "POST",
        body: JSON.stringify({ task: "summarize", input: "hello", paymentReceipt: "mock-valid" })
      });
    } else {
      await requestJson(`${baseUrl}/services`, { allowStatus: [404] });
    }

    console.log(`stage ${stage}: ok`);
  } catch (error) {
    console.error(output);
    throw error;
  } finally {
    child.kill("SIGTERM");
    await delay(100);
  }
}

for (const stage of stages) {
  await runStage(stage);
}
