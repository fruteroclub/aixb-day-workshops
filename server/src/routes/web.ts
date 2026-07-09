import type { AppConfig } from "../types.js";
import { requireStage, type App } from "../workshop-gates.js";

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
      textarea {
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
      textarea:focus {
        border-color: var(--cyan);
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

      @media (max-width: 820px) {
        header,
        .grid {
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
