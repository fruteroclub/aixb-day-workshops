# Fundamentos IA x Blockchain

**Promesa:** Aprende cómo funcionan estas tecnologías de frontera sin conocimiento técnico.

- **Horario público:** 12:00-12:25, workshop stage.
- **Capacidad de diseño:** 20 personas.
- **Fuente de verdad:** `tmp/01-fundamentos-ia-x-blockchain-eng.md` y programa público en `blockchain-ai-day-landing/src/i18n/ui.ts`.

## Objetivo

Que el asistente entienda el mapa mínimo de IA, agentes y blockchain, y termine
conectando un backend Hono básico con Nebius Token Factory como capa de
razonamiento.

## Audiencia

Personas no técnicas, builders iniciales, founders, operadores, community leads
y asistentes que necesitan criterio para conversar o construir en la frontera IA
x Blockchain.

## Resultados esperados

- Explicar qué cambió con LLMs, context engineering y agent harnesses.
- Distinguir aplicación, backend Hono, inference provider, harness y blockchain infra.
- Entender por qué blockchain puede servir como infraestructura para agentes: identidad, pagos, permisos, trazabilidad y coordinación.
- Completar un mini backend Hono que llame a Nebius Token Factory o responda con fixture explícito.

## Kit de entrega

| Pieza | Definición |
|---|---|
| Artefacto del asistente | Mapa técnico simple de aplicación, Hono backend, Nebius Token Factory y blockchain infra. |
| Demo mínima | Hono API con `GET /health`, `GET /stack` y `POST /reason`. |
| Prueba visible | El grupo puede clasificar cada pieza del stack y explicar si Nebius está `live` o `fixture`. |
| Fallback | Diagrama proyectado + salida fixture JSON de los endpoints. |
| Handoff | Workshop 2 convierte la aplicación que razona en un agente que puede actuar. |

## Agenda sugerida

| Tiempo | Bloque |
|---|---|
| 00:00-00:03 | Apertura: qué problema resuelve IA x Blockchain |
| 00:03-00:08 | AI: the status quo - LLMs, context engineering e inferencia |
| 00:08-00:12 | Agent harnesses, skills e integraciones |
| 00:12-00:17 | Blockchain: fundamentos e infraestructura para agentes |
| 00:17-00:23 | Building with AI: Hono backend + Nebius Token Factory |
| 00:23-00:25 | Cierre: mapa de próximos pasos |

## Contenido base

### AI: the status quo

- Context engineering: instrucciones, datos, memoria, herramientas y evaluación.
- LLMs: modelos que predicen lenguaje pero pueden operar sistemas cuando viven dentro de un harness.
- Inference: cómo accedemos a modelos vía APIs, proveedores, endpoints o infra propia.
- Nebius Token Factory: API OpenAI-compatible para inferencia.

### Blockchain: the infra for Agents

- Fundamentos: wallets, claves, cuentas, transacciones, contratos, eventos y redes.
- Por qué importa para agentes: identidad verificable, pagos programables, ownership, permisos, reputación y coordinación.

### Building with AI

- Crear o entender un backend Hono mínimo.
- Conectar Nebius Token Factory como API OpenAI-compatible.
- Preparar la conversación hacia blockchain infra: identidad, pagos, permisos, trazabilidad y coordinación.

## Artefacto del workshop

Un mapa técnico simple + Hono API mínima que muestra una llamada de razonamiento
con Nebius Token Factory o fixture explícito.

## Criterio de salida

Antes de cerrar, el facilitador debe poder pedir a una persona que complete esta
frase en voz alta:

```text
Un agente necesita un LLM para __________, un harness para __________,
un backend para __________ y blockchain para __________.
```

## Archivos

- [`TUTORIAL.md`](TUTORIAL.md) - guía escrita paso a paso para preparar y entregar el workshop.
- [`SLIDES.md`](SLIDES.md) - estructura propuesta de presentación y pasos técnicos de alto nivel.
- [`FACILITATOR_GUIDE.md`](FACILITATOR_GUIDE.md) - guía de facilitación, ritmo, riesgos y criterios de éxito.
- [`EXERCISES.md`](EXERCISES.md) - ejercicios y prompts para asistentes.
