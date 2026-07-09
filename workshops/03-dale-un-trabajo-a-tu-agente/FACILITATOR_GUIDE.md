# Guía de facilitación - Dale un trabajo a tu agente

## Intención de facilitación

La sesión debe mostrar cómo Pi Coding Agent convierte el runtime de Workshop 2
en una superficie usable. El trabajo es Mentor Agent: tomar un repo público de
GitHub, combinarlo con un objetivo y devolver una guía accionable para un
builder.

## Promesa al asistente

Usa Pi para construir o validar páginas web para usuarios y una API reusable
para agentes.

## Antes de iniciar

- Ten Node.js 20 validado.
- Ten el tutorial abierto.
- Ten un repo público de prueba, por ejemplo `honojs/hono`.
- Ten `server/.env` listo si quieres Nebius live.
- Ten fixture fallback listo.

## Materiales preparados

- Hono Mentor Agent service.
- Web pages en `http://localhost:3001`.
- API en `POST /mentor-agent`.
- Prompt de Pi para convertir la respuesta en plan de trabajo.
- Nebius key oculta.
- Repo público de GitHub elegido para la demo.

## Contrato de demo

| Pieza | Qué debe verse |
|---|---|
| Pi | Pi inspecciona o valida `web.ts` y `mentor-agent.ts`. |
| Web pages | `GET /` muestra el formulario del Mentor Agent. |
| Agent API | `POST /mentor-agent` acepta repo + objetivo. |
| GitHub | El resultado etiqueta GitHub como `live` o `fixture`. |
| Nebius | El resultado etiqueta razonamiento como `live` o `fixture`. |
| Mentor Agent | La respuesta entrega guía accionable para el objetivo. |

## Run of show

### 00:00-00:03 - Apertura

- Recordar que Workshop 2 conectó Pi, Nebius, wallet y GitHub sin navegador.
- Explicar que hoy Pi expone el servicio para usuarios y agentes.

### 00:03-00:07 - Patrón AI-native

- Datos externos.
- Razonamiento AI.
- Valor agregado.
- Verificación local.

### 00:07-00:11 - Mentor Agent

- Input: GitHub repo + objetivo.
- Output: resumen, oportunidades y plan de acción.
- Web: `GET /`.
- API para agentes: `POST /mentor-agent`.

### 00:11-00:21 - Build con Hono

- Pedir a Pi que inspeccione `web.ts` y `mentor-agent.ts`.
- Mostrar la app web como resultado.
- Mostrar la API como contrato para agentes.
- Explicar GitHub público sin token.
- Explicar Nebius live o fixture.
- Pedir a Pi que convierta el resultado en plan.

### 00:21-00:24 - Verificación

- Abrir `http://localhost:3001`.
- Usar `https://github.com/honojs/hono`.
- Escribir un objetivo claro.
- Presionar **Analizar con Mentor Agent**.
- Revisar estados `live` / `fixture`.
- Confirmar que la misma lógica vive en `POST /mentor-agent`.

### 00:24-00:25 - Cierre

- El servicio ya entrega valor para usuarios y agentes.
- Workshop 4 ejecuta el setup de pagos con x402.

## Criterios de éxito

- El asistente entiende qué hace un AI-native service.
- Pi construyó o validó web pages + API.
- El servicio tiene inputs claros.
- GitHub y Nebius están etiquetados como `live` o `fixture`.
- La app funciona como interfaz principal del workshop.
- No se agregaron sistemas fuera del scope.

## Riesgos y mitigaciones

- **GitHub rate limit:** el servidor usa página pública + README crudo; si eso
  falla, usa fixture.
- **Nebius key falla:** usar fixture.
- **Pi tarda demasiado:** usar implementación preparada.
- **Se quiere agregar pagos:** ejecutar en Workshop 4.
