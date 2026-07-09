# Workshop 3: Dale un trabajo a tu agente

En este workshop Pi Coding Agent toma el runtime preparado en Workshop 2 y
construye la superficie del Mentor Agent: páginas web para usuarios y una API
para agentes.

El trabajo concreto del Mentor Agent es recibir un repositorio público de
GitHub, entender el objetivo de un builder y devolver una guía accionable.

La meta no es construir un producto completo. La meta es pasar de "agente que
puede hablar" a "servicio que entrega una tarea clara".

## Qué vas a tener al final

- El servidor Hono corriendo en stage 3.
- Páginas web del Mentor Agent en `http://localhost:3001`.
- API para agentes en `POST /mentor-agent`.
- Contexto de GitHub público sin token.
- Razonamiento con Nebius Token Factory o fixture local.
- Una respuesta que usuarios y agentes pueden consumir.

## Requisitos

- Node.js 20 o superior.
- Terminal.
- Un repositorio público de GitHub para probar.
- Opcional: `NEBIUS_API_KEY` y `NEBIUS_MODEL` para razonamiento live.

## 1. Levanta el stage del workshop

Desde la raíz del repositorio:

```bash
cd server
npm install
npm run check
npm run workshop:3
```

El servidor queda en:

```text
http://localhost:3001
```

Si todavía tienes corriendo el stage anterior, detenlo primero con `Ctrl+C`.
Todos los workshops usan el mismo puerto local.

Este stage incluye lo anterior:

- Workshop 1: brain API.
- Workshop 2: Pi + wallet fixture + GitHub público + contrato de integraciones.
- Workshop 3: web pages + API del Mentor Agent.

## 2. Pide a Pi que construya la superficie

El template trae el resultado implementado como checkpoint para que puedas
entrar directo en Workshop 3. Aun así, el ejercicio del workshop es que Pi haga
el trabajo de inspeccionar, conectar y validar las páginas web y la API.

En otra terminal, desde la raíz del repo o desde `server/`, abre Pi:

```bash
pi
```

Prompt sugerido:

```text
Estamos en Workshop 3 de AI x Blockchain Day.

Workshop 2 dejó listo el runtime de integraciones.
Ahora debes construir o validar la superficie del Mentor Agent:
- una página web en GET /
- una API para agentes en POST /mentor-agent
- conexión con GitHub público
- conexión con Nebius o fixture

Inspecciona:
- server/src/routes/web.ts
- server/src/routes/mentor-agent.ts
- server/src/services/mentor-agent.ts
- server/src/integrations/github.ts
- server/src/integrations/nebius.ts

No agregues pagos, login, base de datos ni wallet real.
Primero explica qué vas a verificar y qué comando correrás.
```

## 3. Abre la app del Mentor Agent

Abre:

```text
http://localhost:3001
```

La app pide dos datos:

```text
Repositorio: https://github.com/honojs/hono
Objetivo: Quiero entender cómo este proyecto estructura APIs y cuál sería una primera tarea pequeña para un builder.
```

Presiona **Analizar con Mentor Agent**.

La respuesta debe mostrar:

- Estado de GitHub: `live` o `fixture`.
- Estado de razonamiento: `live` o `fixture`.
- Repositorio consultado.
- Descripción o README del proyecto cuando esté disponible.
- Guía del Mentor Agent.

Si GitHub API está limitada, el servidor intenta leer la página pública del repo
y su README crudo. Si eso también falla, usa fixture para que el workshop pueda
continuar.

La app llama a `POST /mentor-agent`. Ese endpoint es la superficie que también
puede usar otro agente.

## 4. Prueba otro trabajo

Usa otro repositorio público y cambia el objetivo.

Ejemplo:

```text
Repositorio: https://github.com/fruteroclub/aixb-day-workshops
Objetivo: Quiero detectar qué partes del workshop ya están listas y qué debería preparar un speaker.
```

Compara:

- Qué cambió en el contexto del repositorio.
- Qué cambió en la recomendación.
- Qué parte de la respuesta podría convertirse en tarea para Pi.

## 5. Revisa la implementación

Los archivos importantes son:

```text
server/src/routes/web.ts
server/src/routes/mentor-agent.ts
server/src/routes/mentor.ts
server/src/services/mentor-agent.ts
server/src/integrations/github.ts
server/src/integrations/nebius.ts
server/src/types.ts
```

La página web llama a:

```text
POST /mentor-agent
```

El stage 3 también conserva estos endpoints para inspección técnica:

```text
GET /repo/:owner/:repo
POST /mentor
```

No necesitas llamarlos manualmente durante el workshop. Están ahí para que Pi
Coding Agent pueda inspeccionar el servicio y para que el speaker explique la
API.

## 6. Usa Nebius live

Si `server/.env` ya tiene `NEBIUS_API_KEY`, `NEBIUS_MODEL` y `NEBIUS_BASE_URL`,
no tienes que exportar nada manualmente. El servidor carga `.env` al arrancar.

Vuelve a analizar un repo desde la app. Si todo está configurado,
`integrations.reasoning` debe ser `live`.

Si no hay credenciales, `result.integration` será `fixture`. Eso es correcto
para practicar el flujo.

## 7. Pide a Pi que convierta la respuesta en plan

Prompt sugerido:

```text
Usa la respuesta de la app del Mentor Agent como contexto.

Crea BUILDER_MENTOR_PLAN.md con:
- repositorio analizado
- objetivo del builder
- estado de GitHub y razonamiento
- cómo se conectó la página web con POST /mentor-agent
- cómo otro agente consumiría la API
- tres siguientes acciones concretas
- comando de verificación que debe correr antes de decir que terminó

No describas a Pi como el servicio. Pi es la herramienta builder; el servicio es Mentor Agent.
No agregues pagos, base de datos, login, marketplace ni wallet real.
```

Valida fuera de Pi:

```bash
npm run check
```

## Qué no se debe construir aquí

No agregues:

- Login.
- Base de datos.
- Marketplace.
- Wallet real.
- Smart contract.
- Mainnet.
- Cobros x402 todavía.

El éxito es un servicio de mentoría con contexto de GitHub, razonamiento
etiquetado y una respuesta que puede convertirse en trabajo real.

## Criterio de éxito

El workshop está validado cuando puedes mostrar:

- `http://localhost:3001` abre la app del Mentor Agent.
- La app acepta una URL de GitHub y un objetivo.
- `POST /mentor-agent` queda disponible como API para agentes.
- La respuesta etiqueta GitHub y razonamiento como `live` o `fixture`.
- La guía es accionable para un builder.
- Pi genera `BUILDER_MENTOR_PLAN.md` sin confundirse con el servicio final.
