# Facilitator Guide — Fundamentos IA x Blockchain

## Intención de facilitación

Este workshop debe sentirse claro, accesible y práctico. La meta no es convertir a todos en ingenieros en 25 minutos, sino darles un mapa confiable para entender qué es IA, qué es blockchain, por qué los agentes necesitan infraestructura y cómo se empieza a construir.

## Promesa al asistente

Aprende cómo funcionan estas tecnologías de frontera sin conocimiento técnico.

## Antes de iniciar

- Verifica conectividad del venue.
- Ten un diagrama simple del stack: usuario → agente/harness → LLM provider → backend → blockchain infra.
- Ten un repo/demo local listo por si falla la instalación.
- Ten credenciales o mocks preparados para LLM provider y blockchain infra.
- No dependas de mainnet ni de dinero real.

## Run of show

### 00:00–00:03 — Apertura

- Nombrar el problema: IA produce trabajo digital; blockchain coordina identidad, valor y permisos.
- Mostrar el mapa del día.
- Aclarar que no se necesita conocimiento técnico profundo.

### 00:03–00:08 — AI: the status quo

- Explicar LLMs como modelos accesibles por inferencia.
- Introducir context engineering: instrucciones, datos, memoria y herramientas.
- Mostrar por qué el contexto cambia la calidad del resultado.

### 00:08–00:12 — Agent harnesses, skills e integraciones

- Diferenciar chatbot vs agente.
- Explicar harness, herramientas, skills e integraciones.
- Mostrar un ejemplo de tarea que requiere herramientas, no solo texto.

### 00:12–00:17 — Blockchain como infraestructura para agentes

- Explicar wallets, cuentas, transacciones, contratos y redes.
- Conectar con identidad, pagos, permisos y trazabilidad.
- Mantener el lenguaje visual y práctico.

### 00:17–00:23 — Building with AI

- Mostrar backend mínimo.
- Llamar o simular llamada a LLM provider.
- Llamar o simular consulta a blockchain infra.
- Explicar qué sería producción y qué es demo.

### 00:23–00:25 — Cierre

- Recapitular el stack.
- Dar próximos pasos: levantar agente, construir servicio, agregar pagos.

## Criterios de éxito

Un asistente tuvo éxito si puede explicar:

- Qué es un LLM y cómo se accede por inferencia.
- Qué agrega un agent harness.
- Qué rol cumplen skills e integraciones.
- Por qué blockchain puede servir a agentes.
- Cómo se conecta un backend con IA y blockchain infra.

## Riesgos y mitigaciones

- **Demasiada jerga:** volver al mapa visual.
- **Instalaciones lentas:** usar demo proyectada.
- **Credenciales faltantes:** usar mocks.
- **Expectativas infladas:** aclarar que esto es una base para construir, no un producto terminado.
