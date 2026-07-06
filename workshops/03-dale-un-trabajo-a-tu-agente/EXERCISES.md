# Exercises — Dale un trabajo a tu Agente

## Ejercicio 1 — Define el trabajo

Completa:

```text
Quiero que mi agente construya un servicio web que permita a un usuario __________ usando datos de Pokémon y una prueba de ownership NFT.
```

## Ejercicio 2 — Prompt de arquitectura

```text
Actúa como mi agente mentor. Diseña un Pokémon Trainer Service mínimo. Necesito endpoints para health check, consultar un Pokémon, crear o simular un trainer, y resolver una batalla. Primero dame la arquitectura y los comandos de verificación. No edites todavía.
```

## Ejercicio 3 — Prompt de construcción

```text
Construye la versión mínima del Pokémon Trainer Service. Requisitos:
- Endpoint GET /health
- Endpoint GET /pokemon/:name que consulte PokéAPI o use fixture si falla
- Endpoint POST /battle que reciba dos Pokémon y devuelva ganador por stats simples
- Mock claro para ownership NFT o wallet
- Comandos curl para verificar cada endpoint
```

## Ejercicio 4 — Verificación

Ejecuta o documenta:

```bash
curl http://localhost:PORT/health
curl http://localhost:PORT/pokemon/pikachu
curl -X POST http://localhost:PORT/battle \
  -H "Content-Type: application/json" \
  -d '{"pokemonA":"pikachu","pokemonB":"charmander"}'
```

## Ejercicio 5 — Siguiente versión

Define qué harías para convertir el mock NFT en integración real:

1. Red o chain.
2. Contrato o colección NFT.
3. Método de verificación.
4. Riesgo principal.
