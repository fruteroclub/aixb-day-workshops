# Ejercicios - Un agente que cobra por trabajo

## Ejercicio 1 - Separa identidad y pago

Completa:

```text
ERC-8004 sirve para:

x402 sirve para:

El agente solo ejecuta cuando:
```

La respuesta correcta debe decir que ERC-8004 es descubrimiento/confianza y que
x402 es el flujo de pago HTTP. En esta demo, el agente ejecuta sin pago cuando
el switch está apagado y exige autorización x402 cuando el switch está
encendido.

## Ejercicio 2 - Registro ERC-8004

Consulta:

```bash
curl http://localhost:3001/.well-known/agent-registration.json
```

Responde:

1. ¿Qué servicios anuncia el agente?
2. ¿Qué valor tiene `x402Support`?
3. ¿Qué campos conectan el registro con onchain identity?

## Ejercicio 3 - Requirements x402

Consulta:

```bash
curl http://localhost:3001/services
```

Completa:

```text
scheme:
price:
network:
payTo:
resource:
```

## Ejercicio 4 - Switch apagado

Abre `http://localhost:3001`, deja apagado **Activar pagos x402** y presiona
**Probar sin firma**.

Responde:

1. ¿Qué status HTTP recibiste?
2. ¿Qué valor tiene `integration`?
3. ¿Qué valor tiene `payment.required`?

## Ejercicio 5 - Rechazo sin pago

Enciende **Activar pagos x402** desde la UI y presiona **Probar sin firma**.

Si quieres validar por API, primero prende el gate:

```bash
curl -X POST http://localhost:3001/payment-mode \
  -H "Content-Type: application/json" \
  -d '{"enabled":true}'
```

Luego prueba:

```bash
curl -i -X POST http://localhost:3001/jobs \
  -H "Content-Type: application/json" \
  -d '{"task":"summarize","input":"demo"}'
```

Responde:

1. ¿Qué status HTTP recibiste?
2. ¿Existe el header `PAYMENT-REQUIRED`?
3. ¿Qué firma fixture propone el body?

## Ejercicio 6 - Retry con firma x402 fixture

Con **Activar pagos x402** encendido, presiona **Probar con firma x402**.

Si quieres validar por API:

Prueba:

```bash
curl -i -X POST http://localhost:3001/jobs \
  -H "Content-Type: application/json" \
  -H "PAYMENT-SIGNATURE: x402-fixture-paid" \
  -d '{"task":"summarize","input":"demo"}'
```

Responde:

1. ¿El job quedó `completed`?
2. ¿Qué dice `receipt.protocol`?
3. ¿Qué contiene `erc8004Feedback.proofOfPayment`?

## Ejercicio 7 - Producción vs demo

Lista qué cambia para producción:

- Middleware x402 oficial.
- Wallet receptora.
- Facilitator.
- Network.
- Agent Registry ERC-8004.
- Persistencia de jobs.
- Límites de gasto para agentes.
- Logs/auditoría.

## Ejercicio 8 - Prueba Base Sepolia opcional

Solo para facilitadores con una wallet de testnet lista:

```bash
npm run x402:pay
```

Responde:

1. ¿Qué valor tiene `paymentStatus`?
2. ¿Qué red aparece en `network`?
3. ¿Qué header demuestra que x402 liquidó el pago?

## Entrega esperada

Debes poder explicar:

```text
El agente publica identidad ERC-8004, anuncia servicios pagables con x402, corre como demo cuando el switch está apagado y exige PAYMENT-SIGNATURE cuando el switch está encendido.
```
