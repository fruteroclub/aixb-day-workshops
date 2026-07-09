# Workshop 2: Lanza tu agente mentor

En este workshop vas a instalar Pi Coding Agent, configurarlo para usar Nebius
Token Factory y conectarlo con el servidor Hono que contiene las integraciones
base del Mentor Agent.

Este workshop es agent-focused: no se abre navegador, no se construye UI y no se
presenta una app web. Eso empieza en Workshop 3, cuando Pi construye las páginas
y conecta la API para usuarios y agentes.

Pi Coding Agent no es el servicio. Pi es la herramienta builder que nos ayuda a
construir el servicio. El servicio que queremos preparar es Mentor Agent, y más
adelante ese servicio podrá cobrar por trabajo usando x402.

La secuencia correcta es:

```text
1. Instalar Pi Coding Agent
2. Configurar Pi para Nebius Token Factory
3. Crear una wallet de demo
4. Conectar GitHub público
5. Validar el contrato de integraciones
6. Pedir a Pi que documente el estado del agente
```

Pi se instala durante el workshop. No es requisito llegar con Pi instalado.

## Qué vas a tener al final

- Pi Coding Agent instalado.
- Pi configurado con provider `nebius-token-factory`.
- Pi apuntando al modelo de Nebius definido para el evento.
- El servidor Hono corriendo en stage 2.
- Una wallet de demo como identidad `fixture`.
- Conexión a repositorios públicos de GitHub sin token.
- Un mapa claro de qué tendrá que conectar Workshop 3.

## Requisitos

- Node.js 20 o superior.
- Terminal.
- Git.
- `server/.env` con `NEBIUS_API_KEY`, `NEBIUS_MODEL` y `NEBIUS_BASE_URL`.
- Un repositorio público de GitHub para probar.

## 1. Instala Pi Coding Agent

Desde cualquier terminal:

```bash
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
pi --version
```

Si `pi --version` responde, sigue al siguiente paso.

## 2. Carga las variables de Nebius

Entra al servidor del workshop:

```bash
cd server
npm install
```

Carga las variables que ya están en `server/.env`:

```bash
set -a
source .env
set +a
```

Verifica sin imprimir secrets:

```bash
test -n "$NEBIUS_API_KEY" && echo "NEBIUS_API_KEY cargada"
test -n "$NEBIUS_MODEL" && echo "NEBIUS_MODEL cargado: $NEBIUS_MODEL"
echo "NEBIUS_BASE_URL=${NEBIUS_BASE_URL:-https://api.tokenfactory.nebius.com/v1}"
```

No pegues la API key en chat, slides, screenshots, commits o issues.

## 3. Configura Pi para Nebius Token Factory

Pi necesita un provider OpenAI-compatible apuntando a Token Factory y un modelo
default.

Ejecuta:

```bash
npm run pi:configure
```

El script escribe:

```text
~/.pi/agent/models.json
~/.pi/agent/settings.json
```

`models.json` registra:

- Provider: `nebius-token-factory`.
- Base URL: `https://api.tokenfactory.nebius.com/v1/`.
- API: `openai-completions`.
- API key: referencia a `$NEBIUS_API_KEY`, no el valor literal.
- Modelo: el valor de `NEBIUS_MODEL`.

`settings.json` deja a Pi usando ese provider/modelo por default.

## 4. Smoke test de Pi con Nebius

Con `NEBIUS_API_KEY` cargada en la misma terminal, ejecuta:

```bash
pi --no-tools --no-context-files --no-session -p \
  "Di que provider y modelo estas configurado para usar, y detente."
```

Resultado esperado:

- Pi debe mencionar `nebius-token-factory`.
- Pi debe mencionar el modelo definido en `NEBIUS_MODEL`.

Si Pi menciona OpenAI o cualquier otro provider, revisa:

```bash
cat "$HOME/.pi/agent/settings.json"
cat "$HOME/.pi/agent/models.json"
```

También revisa si tienes un `OPENAI_API_KEY` global que esté tomando prioridad.

## 5. Levanta el stage de integraciones

Desde `server/`:

```bash
npm run wallet:create
npm run check
npm run smoke:2
npm run workshop:2
```

El servidor queda en:

```text
http://localhost:3001
```

No abras navegador en este workshop. El servidor escucha en ese puerto, pero la
superficie web se construye en Workshop 3.

Si todavía tienes corriendo el servidor del Workshop 1, detenlo primero con
`Ctrl+C`. Todos los workshops usan el mismo puerto local.

`npm run wallet:create` genera `.aixb-wallet.fixture.json`. Ese archivo está
ignorado por git y no debe commitearse.

## 6. Qué valida stage 2

Stage 2 deja listas estas piezas:

```text
GET /integrations
GET /wallet
GET /github/repo/:owner/:repo
```

No hay UI en este stage. Tampoco se cobra nada todavía.

El servidor solo consulta repositorios públicos. Primero intenta la API pública
de GitHub; si esa cuota anónima está limitada, usa la página pública del repo y
el README crudo. Si todo eso falla, cae a `fixture` para que el workshop pueda
continuar.

## 7. Primer prompt para Pi

Abre Pi desde la raíz del repo o desde `server/`:

```bash
pi
```

Prompt sugerido:

```text
Eres mi agente builder para AI x Blockchain Day.

Estamos usando Pi Coding Agent con Nebius Token Factory.
Pi no es el servicio final. Pi nos va a ayudar a construir un servicio llamado Mentor Agent.

Inspecciona:
- server/src/routes/agent.ts
- server/src/integrations/
- server/src/workshop-gates.ts
- server/src/config.ts

No edites archivos todavía.
Crea AGENT_RUNTIME_NOTES.md con:
- provider y modelo configurados para Pi
- rutas disponibles en stage 2
- estado esperado de Nebius, wallet y GitHub
- qué debe construir Workshop 3: web pages + API para usuarios y agentes
- dónde podría entrar x402 en Workshop 4
```

Si Pi se atora en una máquina, continúa con la demo proyectada. Pi es parte del
workshop, no una barrera de entrada.

## Criterio de éxito

El workshop está validado cuando puedes mostrar:

- `pi --version` responde.
- Pi reporta `nebius-token-factory` y el modelo de `NEBIUS_MODEL`.
- `npm run smoke:2` pasa.
- `.aixb-wallet.fixture.json` existe y no está en git.
- Pi genera `AGENT_RUNTIME_NOTES.md` sin confundirse con el servicio final.

La frase técnica del workshop:

```text
Pi construye. Hono conecta. Nebius razona. GitHub trae contexto. La wallet introduce identidad. La web y la API pública del Mentor Agent se construyen en Workshop 3.
```
