# Exercises - Give Your Agent a Job

## Ejercicio 1 - AI service pattern

Completa el patrón:

```text
External data -> __________ -> Added value
```

¿Cuál es el external data del Builder Mentor API?

## Ejercicio 2 - Input y output

Input del servicio:

1.
2.

Output del servicio:

1.
2.
3.

## Ejercicio 3 - GitHub proof

Corre o observa:

```bash
curl http://localhost:3003/repo/honojs/hono
```

Responde:

1. ¿La integración fue `live` o `fixture`?
2. ¿Qué lenguaje principal reportó?
3. ¿Qué dato usarías para orientar a un builder?

## Ejercicio 4 - Mentor proof

Corre o observa:

```bash
curl -X POST http://localhost:3003/mentor \
  -H "Content-Type: application/json" \
  -d '{"owner":"honojs","repo":"hono","goal":"I want to learn how this project structures APIs."}'
```

Responde:

1. ¿Qué goal recibió el servicio?
2. ¿Qué recomendación fue más útil?
3. ¿GitHub fue `live` o `fixture`?
4. ¿Nebius fue `live` o `fixture`?

## Ejercicio 5 - Diseña otro job

Escribe otro servicio que un agente podría ofrecer.

```text
Input:
External data:
AI reasoning:
Output:
Who benefits:
```

## Entrega esperada

Debes poder explicar:

```text
The Builder Mentor API turns GitHub repository data into practical guidance for a software builder.
```
