# Exercises - Fundamentos IA x Blockchain

## Ejercicio 1 - Mapa del stack

Completa la función de cada pieza:

| Pieza | Función |
|---|---|
| Application |  |
| Hono backend |  |
| Nebius Token Factory |  |
| Agent harness |  |
| Blockchain infra |  |

## Ejercicio 2 - Live o fixture

Marca el modo de cada parte en la demo:

| Parte | Estado |
|---|---|
| `GET /health` | `live` |
| `GET /stack` | `fixture` |
| `POST /reason` | `live` / `fixture` |

## Ejercicio 3 - Primer prompt

Escribe un prompt para pedirle a la API que explique una pieza del stack:

```text

```

## Ejercicio 4 - Verificación

Observa o corre:

```bash
curl http://localhost:3001/health
curl http://localhost:3001/stack
curl -X POST http://localhost:3001/reason \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Explica por qué una app de IA necesita un backend."}'
```

Responde:

1. ¿Qué prueba `GET /health`?
2. ¿Qué muestra `GET /stack`?
3. ¿Nebius está `live` o `fixture`?
4. ¿Qué pieza conectaremos en Workshop 2?

## Entrega esperada

Debes poder completar:

```text
Un agente necesita un LLM para __________, un harness para __________,
un backend para __________ y blockchain para __________.
```
