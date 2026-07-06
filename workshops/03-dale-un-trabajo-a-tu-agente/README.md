# Dale un trabajo a tu Agente

**Promesa:** Aprende con tu agente a construir servicios web.

## Objetivo

Que el asistente use su agente para construir un servicio web pequeño conectado a una API pública y a una lógica de juego con Pokémon NFTs.

## Audiencia

Builders con nociones básicas de terminal o asistentes que completaron el Workshop 2.

## Resultados esperados

- Entender qué es un web service y cómo se expone una API.
- Usar un agente para diseñar e implementar endpoints.
- Conectar con PokéAPI o API equivalente.
- Modelar batallas Pokémon usando tokens/NFTs como identidad de equipo o acceso.
- Desplegar o preparar una demo live del servicio.

## Agenda sugerida

| Tiempo | Bloque |
|---|---|
| 00:00–00:03 | Apertura: darle un trabajo concreto al agente |
| 00:03–00:08 | Web services: servidor, rutas, requests, responses y deployment |
| 00:08–00:12 | Diseño del Pokémon Trainer Service |
| 00:12–00:21 | Build con agente: API, endpoints y lógica de batalla |
| 00:21–00:24 | Conexión NFT/wallet o mock de ownership |
| 00:24–00:25 | Demo local verificable |

## Contenido base

### Web services

- Qué es un backend server.
- Rutas/endpoints, JSON, status codes y logs.
- Cómo un agente ayuda: scaffolding, implementación, debugging y pruebas.

### Pokémon Trainer Service

- Conectar a PokéAPI.
- Elegir o consultar Pokémon.
- Definir stats básicos para batalla.
- Representar Pokémon NFTs como ownership real, testnet o mock verificable.

### Building and deploying with your agent

- Prompt inicial para diseñar la arquitectura.
- Prompt para construir endpoints.
- Prompt para agregar pruebas o curl checks.
- Deploy live o tunnel/local demo según capacidad del venue.

## Artefacto del workshop

Un servicio web funcional o mock funcional con endpoints para consultar Pokémon, crear entrenadores y resolver una batalla básica ligada a ownership NFT real o simulado.

## Archivos

- [`SLIDES.md`](SLIDES.md) — estructura propuesta de presentación y pasos técnicos de alto nivel.
- [`FACILITATOR_GUIDE.md`](FACILITATOR_GUIDE.md) — guía de facilitación, ritmo, riesgos y criterios de éxito.
- [`EXERCISES.md`](EXERCISES.md) — ejercicios y prompts para asistentes.
