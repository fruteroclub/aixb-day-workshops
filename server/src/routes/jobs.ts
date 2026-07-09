import { randomUUID } from "node:crypto";
import type { AppConfig, JobRecord } from "../types.js";
import { requireStage, type App } from "../workshop-gates.js";

type CreateJobBody = {
  task?: string;
  input?: string;
  paymentReceipt?: string | null;
};

function validReceipt(receipt: string | null | undefined): receipt is "mock-valid" | "testnet-valid" {
  return receipt === "mock-valid" || receipt === "testnet-valid";
}

function executePaidTask({ task, input }: { task: string; input: string }): string {
  if (task === "summarize") {
    return `Summary: ${(input || "No input provided").slice(0, 160)}`;
  }

  if (task === "mentor") {
    return `Mentor result: define one small next step for ${input || "this project"}.`;
  }

  return `Executed fixture task "${task || "default"}" with input "${input || "none"}".`;
}

export function registerJobRoutes(app: App, config: AppConfig): void {
  const jobs = new Map<string, JobRecord>();

  app.get("/services", (c) => {
    const unavailable = requireStage(c, config, 4);
    if (unavailable) return unavailable;

    return c.json({
      workshop: 4,
      integration: "fixture",
      services: [
        {
          id: "summarize",
          price: "1 mock credit",
          receipt: "mock-valid",
          description: "Summarize text after payment authorization."
        },
        {
          id: "mentor",
          price: "2 mock credits",
          receipt: "mock-valid",
          description: "Return a builder mentor next step after authorization."
        }
      ]
    });
  });

  app.post("/jobs", async (c) => {
    const unavailable = requireStage(c, config, 4);
    if (unavailable) return unavailable;

    const body = (await c.req.json<CreateJobBody>().catch(() => ({}))) as CreateJobBody;
    const task = body.task ?? "summarize";
    const input = body.input ?? "";

    if (!validReceipt(body.paymentReceipt)) {
      return c.json(
        {
          ok: false,
          status: "payment_required",
          integration: "mock",
          requiredReceipt: "mock-valid",
          message: "This agent service only executes after a valid mock receipt."
        },
        402
      );
    }

    const id = randomUUID();
    const job: JobRecord = {
      id,
      status: "completed",
      integration: "mock",
      task,
      input,
      result: executePaidTask({ task, input }),
      receipt: {
        type: body.paymentReceipt === "testnet-valid" ? "testnet" : "mock",
        value: body.paymentReceipt,
        verified: true
      },
      createdAt: new Date().toISOString()
    };

    jobs.set(id, job);
    return c.json(job, 201);
  });

  app.get("/jobs/:id", (c) => {
    const unavailable = requireStage(c, config, 4);
    if (unavailable) return unavailable;

    const job = jobs.get(c.req.param("id"));
    if (!job) {
      return c.json({ ok: false, message: "Job not found in this in-memory demo server." }, 404);
    }

    return c.json(job);
  });
}
