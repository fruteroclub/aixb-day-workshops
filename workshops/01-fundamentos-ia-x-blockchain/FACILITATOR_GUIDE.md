# Facilitator Guide - Fundamentos IA x Blockchain

## Intención de facilitación

Este workshop debe sentirse claro, accesible y práctico. La meta no es convertir
a todos en ingenieros en 25 minutos, sino darles un mapa confiable para entender
qué es IA, qué es blockchain, por qué los agentes necesitan infraestructura y
cómo se empieza a construir con Hono + Nebius Token Factory.

## Promesa al asistente

Aprende cómo funcionan estas tecnologías de frontera sin conocimiento técnico.

## Antes de iniciar

- Verifica conectividad del venue.
- Ten un diagrama simple del stack: aplicación -> Hono backend -> Nebius Token Factory -> future blockchain infra.
- Ten una demo Hono lista por si falla la instalación.
- Ten credenciales o fixture preparados para Nebius Token Factory.
- No dependas de mainnet ni de dinero real.

## Materiales preparados

- Una diapositiva con el stack en una sola imagen.
- Un ejemplo de request/respuesta de Nebius.
- Una salida fixture lista si Nebius o internet falla.
- Un `README` o snippet con los endpoints de demo.

## Contrato de demo

La demo tiene que probar conexión, no sofisticación:

| Endpoint o paso | Debe mostrar | Puede ser |
|---|---|---|
| `GET /health` | El Hono backend responde. | `live` |
| `GET /stack` | Mapa de arquitectura. | `fixture` |
| `POST /reason` | Nebius responde o se muestra respuesta fixture. | `live` o `fixture` |
| Mapa final | El asistente ubica cada pieza del stack. | Dinámica oral o tabla |

Si cualquier llamada externa tarda más de 60 segundos, cambia a fixture.

## Run of show

### 00:00-00:03 - Apertura

- Nombrar el problema: IA produce trabajo digital; blockchain coordina identidad, valor y permisos.
- Mostrar el mapa del día.
- Aclarar que no se necesita conocimiento técnico profundo.

### 00:03-00:08 - AI: the status quo

- Explicar LLMs como modelos accesibles por inferencia.
- Introducir context engineering: instrucciones, datos, memoria y herramientas.
- Mostrar por qué el contexto cambia la calidad del resultado.

### 00:08-00:12 - Agent harnesses, skills e integraciones

- Diferenciar chatbot vs agente.
- Explicar harness, herramientas, skills e integraciones.
- Mostrar un ejemplo de tarea que requiere herramientas, no solo texto.

### 00:12-00:17 - Blockchain como infraestructura para agentes

- Explicar wallets, cuentas, transacciones, contratos y redes.
- Conectar con identidad, pagos, permisos y trazabilidad.
- Mantener el lenguaje visual y práctico.

### 00:17-00:23 - Building with AI

- Mostrar backend Hono mínimo.
- Llamar o simular llamada a Nebius Token Factory.
- Explicar qué sería producción y qué es demo.

### 00:23-00:25 - Cierre

- Recapitular el stack.
- Dar próximos pasos: levantar agente, construir servicio, agregar pagos.

## Prueba visible

```bash
curl http://localhost:3001/health
curl http://localhost:3001/stack
curl -X POST http://localhost:3001/reason \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Explica el rol de Nebius Token Factory."}'
```

## Criterios de éxito

Un asistente tuvo éxito si puede explicar:

- Qué es un LLM y cómo se accede por inferencia.
- Qué agrega un agent harness.
- Por qué Hono sirve como backend simple para la demo.
- Por qué Nebius Token Factory aporta razonamiento.
- Por qué blockchain puede servir a agentes.

## Riesgos y mitigaciones

- **Demasiada jerga:** volver al mapa visual.
- **Instalaciones lentas:** usar demo proyectada.
- **Credenciales faltantes:** usar fixture.
- **Expectativas infladas:** aclarar que esto es una base para construir, no un producto terminado.
