# Ejercicios - Dale un trabajo a tu agente

## Ejercicio 1 - Patrón de servicio AI-native

Completa:

```text
Datos externos -> __________ -> Valor agregado
```

En este workshop:

```text
Datos externos:
Razonamiento:
Valor agregado:
```

## Ejercicio 2 - Input y output

Superficie para usuarios:

```text
GET /
```

Superficie para agentes:

```text
POST /mentor-agent
```

Input del servicio:

1.
2.

Output del servicio:

1.
2.
3.

## Ejercicio 3 - Pide a Pi que revise web + API

Pide a Pi:

```text
Inspecciona server/src/routes/web.ts y server/src/routes/mentor-agent.ts.
Explica cómo la página web llama a POST /mentor-agent.
No agregues pagos ni login.
```

## Ejercicio 4 - Usa la app

Abre:

```text
http://localhost:3001
```

Completa:

```text
Repositorio: https://github.com/honojs/hono
Objetivo: Quiero entender cómo este proyecto estructura APIs.
```

Presiona **Analizar con Mentor Agent**.

Responde:

1. ¿La integración de GitHub fue `live` o `fixture`?
2. ¿La integración de razonamiento fue `live` o `fixture`?
3. ¿Qué repositorio recibió el servicio?
4. ¿Qué recomendación fue más útil?

5. ¿Cómo consumiría esta misma respuesta otro agente?

## Ejercicio 5 - Diseña otro job

Escribe otro servicio que un agente podría ofrecer.

```text
Input:
Datos externos:
Razonamiento AI:
Output:
Quién se beneficia:
Dónde cobraría x402 después:
```

## Ejercicio 6 - Plan para Pi

Pide a Pi:

```text
Usa la respuesta de la app del Mentor Agent como contexto.

Crea BUILDER_MENTOR_PLAN.md con:
- repositorio analizado
- objetivo del builder
- estado de GitHub y razonamiento
- cómo se expone para usuarios
- cómo se expone para agentes
- tres siguientes acciones concretas
- dónde se ejecutaría x402 en Workshop 4

No describas a Pi como el servicio.
```

## Entrega esperada

Debes poder explicar:

```text
El Mentor Agent expone una página para usuarios y una API para agentes. Convierte un repositorio público de GitHub y un objetivo en guía práctica para un builder.
```
