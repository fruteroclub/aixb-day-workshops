# Facilitator Guide - Launch Your Agent

## Intención de facilitación

La sesión debe mover a la audiencia de "nuestra app puede razonar" a "nuestro
agente tiene integraciones para actuar". El foco es Pi Coding Agent como builder
y un servidor Hono de integraciones como superficie verificable.

## Promesa al asistente

Convierte tu aplicación en un agente conectando sus integraciones.

## Antes de iniciar

- Ten Node.js 20 validado.
- Ten el comando de instalación de Pi probado en la máquina del speaker.
- Ten un modelo Nebius y API key listos si habrá demo live.
- Ten un repo público de GitHub para pruebas.
- Ten Vercel y Telegram preparados solo si el speaker los activará en vivo.
- Ten el modo fixture listo para todas las integraciones.

## Materiales preparados

- Tutorial abierto en `TUTORIAL.md`.
- Proyecto de servidor Hono de integraciones listo o comandos preparados.
- API key de Nebius no visible en pantalla.
- GitHub token read-only opcional.
- Bot de Telegram opcional.
- Cuenta de Vercel opcional.

## Contrato de demo

| Paso | Qué debe verse |
|---|---|
| Deploy Pi | Pi se instala o se abre desde la máquina del speaker. |
| Nebius | El servidor de integraciones reporta `live` o `fixture`. |
| Wallet | Se genera una identidad `fixture`, sin fondos y sin mainnet. |
| GitHub | `GET /github/repo/:owner/:repo` devuelve metadata o fixture. |
| Vercel | El servidor de integraciones reporta `configured` o `missing`. |
| Telegram | El servidor de integraciones envía test live o responde fixture. |

## Run of show

### 00:00-00:03 - Apertura

- Recordar que Workshop 1 dio razonamiento a la app.
- Presentar el objetivo: ahora necesita actuar.

### 00:03-00:07 - LLMs vs agents

- LLM: responde.
- Agent: persigue objetivos y opera herramientas.
- La diferencia clave es ejecución.

### 00:07-00:10 - Agent runtime

- Modelo.
- Contexto.
- Skills.
- Tools e integraciones.
- Memoria.
- Execution loops.
- Guardrails.
- Observabilidad.

### 00:10-00:22 - Build

1. Deploy Pi Coding Agent.
2. Connect Nebius Token Factory.
3. Create a blockchain wallet.
4. Connect GitHub.
5. Connect Vercel.
6. Connect Telegram.

### 00:22-00:25 - Verificación y cierre

- Correr `GET /integrations`.
- Correr `GET /github/repo/honojs/hono`.
- Correr `POST /agent/brief`.
- Cerrar conectando con Workshop 3.

## Prueba visible

```bash
curl http://localhost:3002/integrations
curl http://localhost:3002/github/repo/honojs/hono
curl -X POST http://localhost:3002/agent/brief \
  -H "Content-Type: application/json" \
  -d '{"owner":"honojs","repo":"hono","goal":"Understand this repo as a builder."}'
```

## Criterios de éxito

- Pi no fue tratado como prerequisito.
- El asistente entiende qué hace cada integración.
- El servidor Hono de integraciones prueba el estado de integraciones.
- Ningún secret fue proyectado.
- Cada integración está etiquetada.

## Riesgos y mitigaciones

- **Pi install falla:** usar máquina del speaker.
- **Nebius falla:** fixture.
- **GitHub rate limit:** usar fixture o token read-only.
- **Vercel login tarda:** marcar `missing` y continuar.
- **Telegram no está listo:** fixture.
