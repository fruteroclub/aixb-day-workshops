# Exercises - Launch Your Agent

## Ejercicio 1 - LLM vs Agent

Escribe tres diferencias entre un LLM y un agente.

1. 
2. 
3. 

## Ejercicio 2 - Integration map

Completa la función de cada pieza:

| Pieza | Función |
|---|---|
| Pi Coding Agent |  |
| Nebius Token Factory |  |
| Blockchain wallet |  |
| GitHub |  |
| Vercel |  |
| Telegram |  |

## Ejercicio 3 - Integration labels

Marca el estado de cada integración en tu demo:

| Integración | Estado |
|---|---|
| Nebius | `live` / `fixture` / `missing` |
| Wallet | `fixture` / `missing` |
| GitHub | `live` / `fixture` / `missing` |
| Vercel | `configured` / `missing` |
| Telegram | `live` / `fixture` / `missing` |

## Ejercicio 4 - GitHub proof

Corre o observa:

```bash
curl http://localhost:3002/github/repo/honojs/hono
```

Responde:

1. ¿La integración fue `live` o `fixture`?
2. ¿Qué repo se consultó?
3. ¿Qué dato usaría un agente para empezar a trabajar?

## Ejercicio 5 - Agent brief

Corre o observa:

```bash
curl -X POST http://localhost:3002/agent/brief \
  -H "Content-Type: application/json" \
  -d '{"owner":"honojs","repo":"hono","goal":"Understand this repo as a builder."}'
```

Responde:

1. ¿Qué recibió el agente como objetivo?
2. ¿Qué integración dio el contexto de código?
3. ¿Qué integración dio el razonamiento?
4. ¿Cuál es el siguiente paso del agente?

## Entrega esperada

Debes poder completar esta frase:

```text
Pi builds. Nebius reasons. Wallet identifies. GitHub provides code. Vercel deploys. Telegram communicates.
```
