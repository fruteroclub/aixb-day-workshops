# Facilitator Guide — Dale un trabajo a tu Agente

## Intención de facilitación

Esta sesión debe demostrar que un agente se vuelve más útil cuando recibe un trabajo concreto y verificable. El trabajo del día es construir un servicio web: Pokémon Trainer Service, conectado a PokéAPI y preparado para representar batallas con Pokémon NFTs reales o simulados.

## Promesa al asistente

Aprende con tu agente a construir servicios web.

## Antes de iniciar

- Ten un servicio base listo para demo.
- Verifica acceso a PokéAPI.
- Define si el NFT ownership será real, testnet o mock.
- Ten comandos curl preparados.
- Define alternativa de deploy: live, local, tunnel o demo del facilitador.

## Run of show

### 00:00–00:10 — Apertura

- Explicar que el agente necesita una tarea con límites y verificación.
- Presentar el Pokémon Trainer Service.

### 00:10–00:25 — Web services

- Explicar servidor, endpoints, requests, responses, JSON y status codes.
- Mostrar una llamada curl simple.

### 00:25–00:40 — Diseño del servicio

- Endpoints posibles: health, Pokémon lookup, trainer, battle.
- Definir qué será real y qué será mock.

### 00:40–01:20 — Build con agente

- Pedir al agente plan de arquitectura.
- Construir endpoints mínimos.
- Conectar PokéAPI.
- Agregar lógica simple de batalla.

### 01:20–01:35 — NFT ownership

- Explicar wallet/NFT como prueba de acceso o identidad de equipo.
- Integrar mock o lectura real si hay tiempo.

### 01:35–01:45 — Deploy/demo

- Ejecutar local o desplegar.
- Verificar con curl o navegador.

## Criterios de éxito

- Hay un endpoint verificable.
- El servicio consulta o simula datos Pokémon.
- Existe una lógica simple de batalla.
- El rol del NFT/wallet está definido, aunque sea mock.
- El asistente entiende cómo pedirle trabajo concreto a su agente.

## Riesgos y mitigaciones

- **PokéAPI cae:** usar fixture JSON local.
- **Deploy tarda:** mostrar demo local.
- **Blockchain complica la sesión:** usar mock explícito para ownership NFT.
- **Agente intenta construir demasiado:** reducir a health + Pokémon lookup + battle.
