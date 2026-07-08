# Exercises - Un Agente que cobra por trabajo

## Ejercicio 1 - Define el servicio vendible

Completa:

```text
Mi agente vende el servicio de __________. El usuario paga para recibir __________. La prueba de pago o identidad será __________.
```

## Ejercicio 2 - Mapa PerkOS mínimo

Llena la tabla:

| Pieza | Responsabilidad |
|---|---|
| Marketplace / registry | |
| Wallet / identity | |
| Payment verification | |
| Agent service | |
| Job state | |
| Receipt / delivery | |

## Ejercicio 3 - Prompt de integración

```text
Actúa como mi agente mentor. Tenemos un servicio web que ejecuta una tarea de agente. Diseña un flujo mínimo para que la tarea solo se ejecute después de verificar pago o autorización. Si no hay infraestructura real disponible, usa un mock explícito de receipt y marca dónde se reemplaza por integración real.
```

## Ejercicio 4 - Construcción mínima

Pide al agente:

```text
Agrega un endpoint POST /jobs que reciba una tarea y un paymentReceipt. Si el receipt es válido o mock-valid, ejecuta la tarea. Si no, responde 402 Payment Required o un error claro. Incluye ejemplos curl.
```

## Ejercicio 5 - Verificación

Prueba dos caminos:

1. Sin pago/autorización: debe rechazar.
2. Con pago/autorización válida o mock: debe ejecutar.

## Ejercicio 6 - Producción vs demo

Lista qué falta para producción:

- Seguridad.
- Manejo de claves.
- Verificación onchain o proveedor de pagos.
- Pricing.
- Prevención de abuso.
- UX de wallet/pago.
- Logs/auditoría.

## Entrega esperada

El flujo está completo para este workshop cuando puedes demostrar dos requests:

- Sin pago o autorización: rechaza.
- Con receipt válido, testnet, sandbox o `mock-valid`: ejecuta.

La respuesta autorizada debe incluir estado del job, resultado y receipt o
metadata de autorización. El facilitador debe decir qué componente reemplaza al
mock en producción.
