# Servidor participante

Este es el servidor local que usan los participantes durante los workshops de
AI x Blockchain Day. Está construido con Hono y TypeScript.

La app está dividida por stages para que una persona pueda entrar en cualquier
workshop con el trabajo anterior ya implementado.

## Validar todo el track

```bash
npm install
npm run check
npm run smoke
```

`npm run smoke` levanta la app para los stages 1-4 y verifica las rutas
principales. No requiere Nebius, GitHub ni wallet real.

## Comandos por workshop

| Workshop | Comando | URL local | Incluye |
|---:|---|---|---|
| 1 | `npm run workshop:1` | `http://localhost:3001` | Brain API, `/stack`, `/reason` |
| 2 | `npm run wallet:create && npm run workshop:2` | `http://localhost:3001` | Workshop 1 + Pi setup, wallet, GitHub y contrato de integraciones |
| 3 | `npm run workshop:3` | `http://localhost:3001` | Workshops 1-2 + web pages y API `/mentor-agent` |
| 4 | `npm run workshop:4` | `http://localhost:3001` | Workshops 1-3 + setup de pagos mock |

Todos los stages usan el mismo puerto. Detén el stage anterior con `Ctrl+C`
antes de iniciar el siguiente.

## Estructura

```text
src/
├── app.ts              # composición de la app Hono
├── server.ts           # entrypoint de Node
├── config.ts           # stage, puerto y variables de entorno
├── http.ts             # helpers de respuesta
├── workshop-gates.ts   # bloqueo de rutas por stage
├── routes/             # rutas por workshop
└── integrations/       # Nebius, GitHub y wallet
```

Scripts:

```text
scripts/configure-pi-nebius.ts  # configura Pi para Nebius Token Factory
scripts/create-wallet.ts  # genera wallet fixture local
scripts/smoke-test.ts     # valida stages 1-4
```

Para preparar Pi en Workshop 2:

```bash
set -a
source .env
set +a
npm run pi:configure
```

Después valida con:

```bash
pi --no-tools --no-context-files --no-session -p \
  "Di que provider y modelo estas configurado para usar, y detente."
```

## Integraciones live opcionales

El servidor funciona sin credenciales porque usa fixtures explicitos. Si quieres
probar integraciones live, exporta solo lo necesario en la terminal donde
arrancas el servidor.

Nebius:

```bash
export NEBIUS_API_KEY="reemplaza-con-api-key"
export NEBIUS_MODEL="reemplaza-con-modelo"
export NEBIUS_BASE_URL="https://api.tokenfactory.nebius.com/v1"
```

No proyectes secrets durante el workshop.

## Rutas principales

| Ruta | Workshop | Propósito |
|---|---:|---|
| `GET /health` | 1 | Prueba que el servidor está vivo. |
| `GET /stack` | 1 | Muestra el mapa IA x Blockchain. |
| `POST /reason` | 1 | Devuelve razonamiento Nebius o fixture. |
| `GET /integrations` | 2 | Muestra estado de integraciones. |
| `GET /wallet` | 2 | Muestra la wallet fixture. |
| `GET /github/repo/:owner/:repo` | 2 | Lee contexto público de GitHub o fixture. Ejemplo: `https://github.com/honojs/hono` se llama como `/github/repo/honojs/hono`. |
| `GET /` | 3 | Abre las páginas web del Mentor Agent. |
| `POST /mentor-agent` | 3 | API para agentes: genera guía desde URL de GitHub y objetivo. |
| `GET /repo/:owner/:repo` | 3 | Devuelve contexto de repositorio para mentor. |
| `POST /mentor` | 3 | Produce guía para un builder. |
| `GET /services` | 4 | Lista servicios cobrables mock. |
| `POST /jobs` | 4 | Rechaza sin pago y ejecuta con receipt válido. |
| `GET /jobs/:id` | 4 | Lee un job en memoria. |

## Reglas

- Hono es el servidor de todos los workshops.
- Las rutas deben quedarse en `src/routes/`.
- Las llamadas externas deben quedarse en `src/integrations/`.
- Toda respuesta debe etiquetar su estado como `live`, `fixture`, `mock`,
  `configured`, `missing` o `not-enabled`.
- No usar mainnet, fondos reales ni secrets commiteados.
