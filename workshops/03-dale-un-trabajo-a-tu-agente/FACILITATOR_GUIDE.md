# Facilitator Guide - Give Your Agent a Job

## Intención de facilitación

La sesión debe mostrar cómo un agente se vuelve útil cuando tiene un trabajo
concreto. El trabajo es Builder Mentor API: tomar un repo de GitHub y convertir
metadata técnica en recomendaciones para un builder usando Nebius Token Factory.

## Promesa al asistente

Construye un servicio AI-native con inputs claros, output valioso y API reusable.

## Antes de iniciar

- Ten Node.js 20 validado.
- Ten el tutorial abierto.
- Ten un repo público de prueba, por ejemplo `honojs/hono`.
- Ten `GITHUB_TOKEN` read-only opcional.
- Ten `NEBIUS_API_KEY` y `NEBIUS_MODEL` opcionales.
- Ten fixture fallback listo.

## Materiales preparados

- Hono Builder Mentor API.
- Curl commands para `health`, `repo` y `mentor`.
- Prompt de Pi para construir el servicio si se hará live.
- Nebius key oculta.
- GitHub token oculto.

## Contrato de demo

| Endpoint | Qué debe verse |
|---|---|
| `GET /health` | El servicio Hono está vivo. |
| `GET /repo/:owner/:repo` | Metadata del repo desde GitHub o fixture. |
| `POST /mentor` | Recomendación o plan de acción para un builder. |

## Run of show

### 00:00-00:03 - Apertura

- Recordar que Workshop 2 conectó el harness.
- Explicar que hoy el agente recibe un trabajo real.

### 00:03-00:07 - AI service pattern

- External data.
- AI reasoning.
- Added value.

### 00:07-00:11 - Builder Mentor API

- Input: GitHub repo + goal.
- Output: summary, strengths, opportunities and action plan.

### 00:11-00:21 - Build con Hono

- Crear Hono service.
- Agregar GitHub integration.
- Agregar Nebius reasoning.
- Agregar fixture fallbacks.

### 00:21-00:24 - Verificación

```bash
curl http://localhost:3003/health
curl http://localhost:3003/repo/honojs/hono
curl -X POST http://localhost:3003/mentor \
  -H "Content-Type: application/json" \
  -d '{"owner":"honojs","repo":"hono","goal":"I want to learn how this project structures APIs."}'
```

### 00:24-00:25 - Cierre

- El servicio ya entrega valor.
- Workshop 4 lo convierte en trabajo pagado o autorizado.

## Criterios de éxito

- El asistente entiende qué hace un AI-native service.
- El servicio tiene inputs claros.
- GitHub y Nebius están etiquetados como `live` o `fixture`.
- Los tres curl commands funcionan.
- No se agregaron sistemas fuera del scope.

## Riesgos y mitigaciones

- **GitHub rate limit:** usar fixture.
- **Nebius key falla:** usar fixture.
- **Pi tarda demasiado:** usar implementación preparada.
- **Se quiere agregar UI:** posponer para después del workshop.
