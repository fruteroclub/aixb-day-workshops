# Lanza tu propio Agente Mentor

**Promesa:** Convierte tu aplicación en un agente conectando integraciones reales.

- **Horario público:** 12:30-12:55, workshop stage.
- **Capacidad de diseño:** 20 personas.
- **Fuente de verdad:** `tmp/02-lanza-tu-agente-eng.md` y programa público en `blockchain-ai-day-landing/src/i18n/ui.ts`.

## Objetivo

Que el asistente entienda la diferencia entre un LLM y un agente, instale Pi
Coding Agent durante el workshop y conecte su primer servidor de integraciones:
Nebius Token Factory, wallet de identidad, GitHub, Vercel y Telegram.

## Audiencia

Builders, operadores técnicos y personas que quieren pasar de una aplicación que
razona a un agente que puede actuar.

## Resultados esperados

- Instalar o abrir Pi Coding Agent como builder agent.
- Conectar Nebius Token Factory como fuente de razonamiento.
- Crear una wallet de demo como identidad del agente.
- Conectar GitHub para que el agente tenga acceso a código.
- Preparar Vercel como destino de deployment.
- Preparar Telegram como canal de comunicación.
- Verificar las integraciones desde un servidor Hono de integraciones.

## Kit de entrega

| Pieza | Definición |
|---|---|
| Artefacto del asistente | Pi Coding Agent + servidor Hono de integraciones. |
| Demo mínima | `GET /integrations`, `GET /github/repo/:owner/:repo` y `POST /agent/brief`. |
| Prueba visible | El servidor de integraciones muestra qué integraciones están `live`, `configured`, `fixture` o `missing`. |
| Fallback | GitHub, Nebius, wallet y Telegram pueden responder en fixture. |
| Handoff | Workshop 3 usa este servidor para darle al agente un servicio real: Builder Mentor API. |

## Agenda sugerida

| Tiempo | Bloque |
|---|---|
| 00:00-00:03 | Apertura: de razonar a actuar |
| 00:03-00:07 | LLMs vs agents |
| 00:07-00:10 | Agent runtime: modelo, contexto, skills, tools, memoria y guardrails |
| 00:10-00:22 | Build: Pi, Nebius, wallet, GitHub, Vercel y Telegram |
| 00:22-00:25 | Verificación del servidor Hono de integraciones y cierre |

## Contenido base

### LLMs are not agents

- Un LLM responde preguntas.
- Un agente persigue objetivos.
- La diferencia no es inteligencia, es ejecución.

### Agent runtime

- Modelo.
- Contexto.
- Skills.
- Tools e integraciones.
- Memoria.
- Execution loops.
- Guardrails.
- Observabilidad.

### Today's integration map

```text
Pi Coding Agent
        |
        |-- Nebius Token Factory
        |       Reasoning
        |
        |-- Blockchain Wallet
        |       Identity
        |
        |-- GitHub
        |       Code
        |
        |-- Vercel
        |       Deployment
        |
        `-- Telegram
                Communication
```

## Build

1. Deploy Pi Coding Agent.
2. Connect Nebius Token Factory.
3. Create a blockchain wallet.
4. Connect GitHub.
5. Connect Vercel.
6. Connect Telegram.

## Artefacto del workshop

Un servidor Hono de integraciones que representa las conexiones básicas de un
agente builder y que Pi puede inspeccionar, explicar y extender.

## Criterio de salida

El asistente debe poder explicar:

```text
Pi builds. Nebius reasons. Wallet identifies. GitHub provides code. Vercel deploys. Telegram communicates.
```

## Archivos

- [`TUTORIAL.md`](TUTORIAL.md) - guía escrita paso a paso para preparar y entregar el workshop.
- [`SLIDES.md`](SLIDES.md) - estructura propuesta de presentación y pasos técnicos de alto nivel.
- [`FACILITATOR_GUIDE.md`](FACILITATOR_GUIDE.md) - guía de facilitación, ritmo, riesgos y criterios de éxito.
- [`EXERCISES.md`](EXERCISES.md) - ejercicios y prompts para asistentes.
