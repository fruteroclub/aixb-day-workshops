import type { AppConfig } from "../types.js";
import { requireStage, type App } from "../workshop-gates.js";

function paymentPanel(config: AppConfig): string {
  if (config.stage < 4) return "";

  return `<section class="panel stage4-panel" id="payments-panel">
        <div class="stage4-head">
          <div>
            <p class="eyebrow">Workshop 4 / x402</p>
            <h2>Gate de pagos</h2>
          </div>
          <label class="toggle">
            <input id="payment-toggle" type="checkbox" />
            <span class="toggle-track"></span>
            <span class="toggle-label">Activar pagos x402</span>
          </label>
        </div>
        <p class="hint">Con pagos apagados, el job corre como demo. Con pagos encendidos, el servidor responde 402 hasta recibir <code>PAYMENT-SIGNATURE</code>.</p>

        <div class="job-grid">
          <div>
            <label for="job-task">Servicio</label>
            <select id="job-task">
              <option value="summarize">summarize</option>
              <option value="mentor">mentor</option>
            </select>
          </div>
          <div>
            <label for="job-input">Input</label>
            <input id="job-input" value="AI x Blockchain Day conecta agentes con identidad, pagos y automatizacion." />
          </div>
        </div>

        <div class="button-row">
          <button id="job-without-payment" type="button">Probar sin firma</button>
          <button id="job-with-payment" type="button">Probar con firma x402</button>
        </div>

        <section class="payment-output" id="payment-output">
          <p class="empty">El estado del gate de pagos aparecerá aquí.</p>
        </section>
      </section>`;
}

function appPage(config: AppConfig): string {
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Mentor Agent | AI x Blockchain Day</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #071018;
        --panel: #0d1822;
        --panel-2: #101f2b;
        --line: rgba(169, 187, 196, 0.22);
        --text: #f5f8fb;
        --muted: #a9bbc4;
        --cyan: #42e8e0;
        --magenta: #ff2aa3;
        --warn: #ffd166;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        min-height: 100vh;
        background:
          linear-gradient(rgba(66, 232, 224, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(66, 232, 224, 0.05) 1px, transparent 1px),
          var(--bg);
        background-size: 28px 28px;
        color: var(--text);
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      main {
        width: min(1120px, calc(100vw - 32px));
        margin: 0 auto;
        padding: 40px 0;
      }

      header {
        display: flex;
        justify-content: space-between;
        gap: 24px;
        align-items: flex-start;
        padding-bottom: 28px;
        border-bottom: 1px solid var(--line);
      }

      .brand {
        margin: 0 0 16px;
        font-size: clamp(34px, 5vw, 72px);
        line-height: 0.92;
        letter-spacing: 0;
      }

      .brand span {
        color: var(--magenta);
      }

      .eyebrow {
        margin: 0 0 12px;
        color: var(--cyan);
        font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: 13px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .lede {
        max-width: 680px;
        margin: 0;
        color: var(--muted);
        font-size: 20px;
        line-height: 1.45;
      }

      .stage {
        min-width: 160px;
        padding: 12px 14px;
        border: 1px solid var(--line);
        background: rgba(13, 24, 34, 0.75);
        font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
        color: var(--cyan);
        font-size: 13px;
      }

      .grid {
        display: grid;
        grid-template-columns: minmax(320px, 0.9fr) minmax(320px, 1.1fr);
        gap: 24px;
        margin-top: 28px;
      }

      section {
        min-width: 0;
      }

      .panel {
        border: 1px solid var(--line);
        background: rgba(13, 24, 34, 0.9);
        padding: 22px;
      }

      label {
        display: block;
        margin: 0 0 8px;
        color: var(--cyan);
        font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: 12px;
        text-transform: uppercase;
      }

      input,
      textarea,
      select {
        width: 100%;
        border: 1px solid var(--line);
        background: #071018;
        color: var(--text);
        font: inherit;
        font-size: 17px;
        padding: 13px 14px;
        outline: none;
      }

      textarea {
        min-height: 140px;
        resize: vertical;
        line-height: 1.45;
      }

      input:focus,
      textarea:focus,
      select:focus {
        border-color: var(--cyan);
      }

      input[type="checkbox"] {
        width: auto;
      }

      .field {
        margin-bottom: 18px;
      }

      button {
        width: 100%;
        border: 0;
        background: var(--magenta);
        color: white;
        min-height: 48px;
        padding: 12px 16px;
        font: inherit;
        font-weight: 700;
        cursor: pointer;
      }

      button:disabled {
        cursor: wait;
        opacity: 0.7;
      }

      .hint {
        color: var(--muted);
        font-size: 14px;
        line-height: 1.45;
        margin: 14px 0 0;
      }

      .status-row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 16px;
      }

      .chip {
        border: 1px solid var(--line);
        color: var(--cyan);
        padding: 7px 9px;
        font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: 12px;
      }

      .result {
        min-height: 420px;
      }

      .empty {
        color: var(--muted);
        font-size: 18px;
        line-height: 1.5;
      }

      h2,
      h3 {
        margin: 0 0 12px;
        letter-spacing: 0;
      }

      h2 {
        font-size: 26px;
      }

      h3 {
        color: var(--cyan);
        font-size: 15px;
        text-transform: uppercase;
      }

      .repo {
        border-top: 1px solid var(--line);
        border-bottom: 1px solid var(--line);
        padding: 16px 0;
        margin: 16px 0;
      }

      .repo p,
      .mentor-text {
        color: var(--muted);
        line-height: 1.5;
        font-size: 17px;
      }

      .mentor-text {
        white-space: pre-wrap;
        overflow-wrap: anywhere;
      }

      .error {
        color: var(--warn);
      }

      code {
        color: var(--text);
        font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
      }

      .stage4-panel {
        margin-top: 24px;
      }

      .stage4-head,
      .toggle,
      .button-row,
      .job-grid {
        display: flex;
        gap: 16px;
      }

      .stage4-head {
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid var(--line);
        padding-bottom: 16px;
        margin-bottom: 16px;
      }

      .toggle {
        align-items: center;
        color: var(--text);
        cursor: pointer;
        font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: 13px;
        text-transform: uppercase;
      }

      .toggle input {
        position: absolute;
        opacity: 0;
        pointer-events: none;
      }

      .toggle-track {
        width: 48px;
        height: 26px;
        border: 1px solid var(--line);
        background: #071018;
        position: relative;
      }

      .toggle-track::after {
        content: "";
        position: absolute;
        width: 18px;
        height: 18px;
        top: 3px;
        left: 4px;
        background: var(--muted);
        transition: transform 140ms ease, background 140ms ease;
      }

      .toggle input:checked + .toggle-track {
        border-color: var(--magenta);
      }

      .toggle input:checked + .toggle-track::after {
        transform: translateX(20px);
        background: var(--magenta);
      }

      .job-grid {
        display: grid;
        grid-template-columns: 220px 1fr;
        margin-top: 18px;
      }

      .button-row {
        margin-top: 16px;
      }

      .button-row button {
        flex: 1;
        width: auto;
      }

      .payment-output {
        border-top: 1px solid var(--line);
        margin-top: 18px;
        padding-top: 16px;
      }

      @media (max-width: 820px) {
        header,
        .grid,
        .job-grid {
          grid-template-columns: 1fr;
        }

        header {
          display: block;
        }

        .stage {
          display: inline-block;
          margin-top: 18px;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <header>
        <div>
          <p class="eyebrow">AI x Blockchain Day / Mentor Agent</p>
          <h1 class="brand">Mentor <span>Agent</span></h1>
          <p class="lede">Pega un repositorio público de GitHub y define el objetivo. El servicio combina contexto de código con razonamiento para preparar una guía accionable.</p>
        </div>
        <div class="stage">WORKSHOP_STAGE=${config.stage}</div>
      </header>

      <div class="grid">
        <section class="panel">
          <form id="mentor-form">
            <div class="field">
              <label for="repoUrl">Repositorio GitHub</label>
              <input id="repoUrl" name="repoUrl" value="https://github.com/honojs/hono" autocomplete="off" />
            </div>
            <div class="field">
              <label for="goal">Objetivo</label>
              <textarea id="goal" name="goal">Quiero entender cómo este proyecto estructura APIs y cuál sería una primera tarea pequeña para un builder.</textarea>
            </div>
            <button id="submit" type="submit">Analizar con Mentor Agent</button>
            <p class="hint">Pi Coding Agent puede inspeccionar este servicio y ayudarte a modificarlo. Pi no es el servicio final.</p>
          </form>
        </section>

        <section class="panel result" id="result">
          <p class="empty">El resultado aparecerá aquí.</p>
        </section>
      </div>

      ${paymentPanel(config)}
    </main>

    <script>
      const form = document.querySelector("#mentor-form");
      const button = document.querySelector("#submit");
      const result = document.querySelector("#result");

      function escapeHtml(value) {
        return String(value)
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")
          .replaceAll("'", "&#039;");
      }

      function render(data) {
        const repo = data.repoContext || {};
        const text = data.result && data.result.text ? data.result.text : "";
        result.innerHTML =
          '<div class="status-row">' +
            '<span class="chip">GitHub: ' + escapeHtml(data.integrations && data.integrations.github) + '</span>' +
            '<span class="chip">Reasoning: ' + escapeHtml(data.integrations && data.integrations.reasoning) + '</span>' +
          '</div>' +
          '<h2>' + escapeHtml(repo.fullName || "Repositorio") + '</h2>' +
          '<div class="repo">' +
            '<p>' + escapeHtml(repo.description || "Sin descripción.") + '</p>' +
            '<p><strong>Lenguaje:</strong> ' + escapeHtml(repo.language || "n/a") + ' · <strong>Stars:</strong> ' + escapeHtml(repo.stars || 0) + '</p>' +
          '</div>' +
          '<h3>Guía del Mentor Agent</h3>' +
          '<div class="mentor-text">' + escapeHtml(text) + '</div>';
      }

      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        button.disabled = true;
        button.textContent = "Analizando...";
        result.innerHTML = '<p class="empty">Consultando repositorio y generando guía...</p>';

        try {
          const response = await fetch("/mentor-agent", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              repoUrl: form.repoUrl.value,
              goal: form.goal.value
            })
          });
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || "No se pudo completar la solicitud.");
          }
          render(data);
        } catch (error) {
          result.innerHTML = '<p class="error">' + escapeHtml(error.message || error) + '</p>';
        } finally {
          button.disabled = false;
          button.textContent = "Analizar con Mentor Agent";
        }
      });

      const paymentsPanel = document.querySelector("#payments-panel");
      if (paymentsPanel) {
        const paymentToggle = document.querySelector("#payment-toggle");
        const paymentOutput = document.querySelector("#payment-output");
        const jobTask = document.querySelector("#job-task");
        const jobInput = document.querySelector("#job-input");
        const jobWithoutPayment = document.querySelector("#job-without-payment");
        const jobWithPayment = document.querySelector("#job-with-payment");
        let activePaymentMode = { live: false, ready: false, label: "fixture" };

        function renderPaymentState(data) {
          activePaymentMode = data.mode || activePaymentMode;
          paymentToggle.checked = data.paymentsEnabled === true;
          jobWithPayment.disabled = activePaymentMode.live === true;
          jobWithPayment.textContent = activePaymentMode.live ? "Pagar desde CLI" : "Probar con firma x402";
          paymentOutput.innerHTML =
            '<div class="status-row">' +
              '<span class="chip">x402: ' + (data.paymentsEnabled ? 'ON' : 'OFF') + '</span>' +
              '<span class="chip">mode: ' + escapeHtml(activePaymentMode.label || 'fixture') + '</span>' +
              '<span class="chip">fixture: ' + escapeHtml(data.fixturePaymentSignature || 'x402-fixture-paid') + '</span>' +
            '</div>' +
            '<p class="mentor-text">' +
              (activePaymentMode.live
                ? 'Base Sepolia live: el switch activa x402 real; el pago firmado se prueba con npm run x402:pay para no exponer llaves en el navegador.'
                : data.paymentsEnabled
                  ? 'Pagos encendidos: POST /jobs requiere PAYMENT-SIGNATURE.'
                  : 'Pagos apagados: POST /jobs ejecuta como demo sin pago.') +
            '</p>';
        }

        async function loadPaymentMode() {
          const response = await fetch("/payment-mode");
          const data = await response.json();
          renderPaymentState(data);
        }

        async function setPaymentMode(enabled) {
          const response = await fetch("/payment-mode", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ enabled })
          });
          const data = await response.json();
          renderPaymentState(data);
        }

        async function runJob(withSignature) {
          if (withSignature && activePaymentMode.live) {
            paymentOutput.innerHTML =
              '<div class="status-row">' +
                '<span class="chip">mode: ' + escapeHtml(activePaymentMode.label || 'base-sepolia-live') + '</span>' +
              '</div>' +
              '<p class="mentor-text">Usa <code>npm run x402:pay</code> desde <code>server/</code> para ejecutar el pago Base Sepolia con una private key local.</p>';
            return;
          }

          paymentOutput.innerHTML = '<p class="empty">Ejecutando job...</p>';
          const headers = { "content-type": "application/json" };
          if (withSignature) {
            headers["PAYMENT-SIGNATURE"] = "x402-fixture-paid";
          }

          const response = await fetch("/jobs", {
            method: "POST",
            headers,
            body: JSON.stringify({
              task: jobTask.value,
              input: jobInput.value
            })
          });
          const data = await response.json();
          const paymentRequired = response.headers.get("PAYMENT-REQUIRED");
          paymentOutput.innerHTML =
            '<div class="status-row">' +
              '<span class="chip">HTTP: ' + response.status + '</span>' +
              '<span class="chip">x402: ' + (paymentToggle.checked ? 'ON' : 'OFF') + '</span>' +
              '<span class="chip">PAYMENT-REQUIRED: ' + (paymentRequired ? 'yes' : 'no') + '</span>' +
            '</div>' +
            '<pre class="mentor-text">' + escapeHtml(JSON.stringify(data, null, 2)) + '</pre>';
        }

        paymentToggle.addEventListener("change", () => {
          setPaymentMode(paymentToggle.checked).catch((error) => {
            paymentOutput.innerHTML = '<p class="error">' + escapeHtml(error.message || error) + '</p>';
          });
        });

        jobWithoutPayment.addEventListener("click", () => {
          runJob(false).catch((error) => {
            paymentOutput.innerHTML = '<p class="error">' + escapeHtml(error.message || error) + '</p>';
          });
        });

        jobWithPayment.addEventListener("click", () => {
          runJob(true).catch((error) => {
            paymentOutput.innerHTML = '<p class="error">' + escapeHtml(error.message || error) + '</p>';
          });
        });

        loadPaymentMode().catch((error) => {
          paymentOutput.innerHTML = '<p class="error">' + escapeHtml(error.message || error) + '</p>';
        });
      }
    </script>
  </body>
</html>`;
}

export function registerWebRoutes(app: App, config: AppConfig): void {
  app.get("/", (c) => {
    const unavailable = requireStage(c, config, 3);
    if (unavailable) return unavailable;

    return c.html(appPage(config));
  });
}
