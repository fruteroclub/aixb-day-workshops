# Dale un trabajo a tu Agente

**Promesa:** Construye un servicio AI-native que transforma datos de GitHub en
recomendaciones útiles para builders.

- **Horario público:** 13:00-13:25, workshop stage.
- **Capacidad de diseño:** 20 personas.
- **Fuente de verdad:** `tmp/03-dale-un-trabajo-a-tu-agente.md` y programa público en `blockchain-ai-day-landing/src/i18n/ui.ts`.

## Objetivo

Que el asistente use su agente y el harness del Workshop 2 para construir un
Builder Mentor API: un servicio Hono que recibe un repositorio de GitHub,
consulta metadata técnica y usa Nebius Token Factory para generar un plan de
aprendizaje o mejora.

## Audiencia

Builders con nociones básicas de terminal o asistentes que completaron el
Workshop 2.

## Resultados esperados

- Entender el patrón de AI service: external data -> AI reasoning -> added value.
- Construir un REST API con Hono.
- Conectar GitHub como fuente de datos.
- Conectar Nebius Token Factory como capa de razonamiento.
- Producir una respuesta estructurada útil para un builder.

## Kit de entrega

| Pieza | Definición |
|---|---|
| Artefacto del asistente | Builder Mentor API. |
| Demo mínima | `GET /health`, `GET /repo/:owner/:repo` y `POST /mentor`. |
| Prueba visible | Tres comandos `curl` devuelven metadata de GitHub y una recomendación de mentoría. |
| Fallback | Fixtures locales para GitHub y Nebius. |
| Handoff | Workshop 4 convierte el servicio en un job pagado o autorizado. |

## Agenda sugerida

| Tiempo | Bloque |
|---|---|
| 00:00-00:03 | Apertura: darle un trabajo concreto al agente |
| 00:03-00:07 | AI service pattern: datos externos, razonamiento, valor agregado |
| 00:07-00:11 | Diseño del Builder Mentor API |
| 00:11-00:21 | Build con Hono: GitHub integration + Nebius reasoning |
| 00:21-00:24 | Verificación con curl |
| 00:24-00:25 | Cierre hacia jobs pagados/autorizados |

## Contenido base

### What makes a good AI service?

- Resuelve un problema concreto.
- Tiene inputs claros.
- Produce outputs valiosos.
- Es reusable a través de una API.

### Builder Mentor API

Input:

- GitHub repository.
- Goal opcional del builder.

Output:

- Entendimiento del proyecto.
- Revisión de arquitectura.
- Fortalezas.
- Oportunidades de mejora.
- Recomendaciones de aprendizaje.
- Plan de acción.

### Architecture

```text
User
    |
    v
Builder Mentor API
    |
    |-- GitHub API
    |
    `-- Nebius Token Factory
            |
            v
      AI Reasoning
            |
            v
  Structured Response
```

## Artefacto del workshop

Un Builder Mentor API con Hono, GitHub integration y Nebius reasoning.

## Criterio de salida

El servicio no necesita estar desplegado para contar como éxito. Sí necesita una
prueba visible:

```bash
curl http://localhost:3003/health
curl http://localhost:3003/repo/honojs/hono
curl -X POST http://localhost:3003/mentor \
  -H "Content-Type: application/json" \
  -d '{"owner":"honojs","repo":"hono","goal":"I want to learn how this project structures APIs."}'
```

El facilitador debe decir explícitamente si GitHub y Nebius están en `live` o
`fixture`.

## Archivos

- [`TUTORIAL.md`](TUTORIAL.md) - guía escrita paso a paso para preparar y entregar el workshop.
- [`SLIDES.md`](SLIDES.md) - estructura propuesta de presentación y pasos técnicos de alto nivel.
- [`FACILITATOR_GUIDE.md`](FACILITATOR_GUIDE.md) - guía de facilitación, ritmo, riesgos y criterios de éxito.
- [`EXERCISES.md`](EXERCISES.md) - ejercicios y prompts para asistentes.
