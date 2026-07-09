# Guía de facilitación - Un agente que cobra por trabajo

## Intención de facilitación

La sesión debe conectar la utilidad del Mentor Agent con un flujo económico
realista: identidad/discovery con ERC-8004 y pago HTTP-native con x402,
controlado por un switch visible en la UI.

No presentes ERC-8004 como sistema de pago. ERC-8004 ayuda a descubrir,
describir y crear señales de confianza sobre agentes. x402 es el flujo de pago
que protege endpoints HTTP.

## Promesa al asistente

Configura el Mentor Agent para que sea descubrible como agente y pueda alternar
entre demo abierta y cobro x402 antes de ejecutar trabajo.

## Antes de iniciar

- Ten `npm run smoke:4` validado.
- Ten claro que el workshop usa firma fixture, no fondos reales.
- Ten abierto el README del Workshop 4.
- Ten abierta la UI en `http://localhost:3001`.
- Ten claro que el switch **Activar pagos x402** es el control principal.
- Si vas a mostrar pago live, prepara una wallet compradora con USDC en Base
  Sepolia y configura `X402_MODE=base-sepolia`.
- No uses mainnet ni claves privadas reales.

## Materiales preparados

- `/.well-known/agent-registration.json` para ERC-8004.
- `/services` con requirements x402.
- `/payment-mode` como estado del switch.
- `/jobs` abierto cuando el switch está apagado y protegido cuando está
  encendido.
- Respuesta esperada para `402 Payment Required`.
- Respuesta esperada para ejecución autorizada.
- Opcional: `npm run x402:pay` para settlement real en Base Sepolia.

## Contrato de flujo

| Paso | Resultado esperado |
|---|---|
| Publicar identidad | ERC-8004 registration file con services y `x402Support`. |
| Publicar servicios | `/services` muestra precio, network, payTo y resource. |
| Switch apagado | Job sin firma ejecuta como demo abierta. |
| Switch encendido | Job sin firma rechaza `402 Payment Required` con `PAYMENT-REQUIRED`. |
| Reintentar con pago | `PAYMENT-SIGNATURE: x402-fixture-paid` ejecuta. |
| Devolver resultado | Job incluye result, receipt x402 y feedback ERC-8004. |

## Run of show

### 00:00-00:03 - Apertura

- Mostrar la transición: agente útil -> agente vendible.
- Separar conceptos:
  - ERC-8004: quién es el agente, dónde vive, cómo confiar.
  - x402: cómo se paga una llamada HTTP.

### 00:03-00:08 - Ethereum Wingman framing

- Nada ocurre solo en Ethereum.
- ¿Quién llama la función o endpoint?
- ¿Por qué pagaría o firmaría?
- ¿Qué incentivo o comprobante queda?

### 00:08-00:12 - ERC-8004

- Mostrar `/.well-known/agent-registration.json`.
- Señalar `services`, `x402Support`, `registrations` y `supportedTrust`.
- Aclarar que en producción `agentURI` resolvería a este archivo.

### 00:12-00:18 - x402

- Abrir la UI y señalar el switch **Activar pagos x402**.
- Con el switch apagado, ejecutar **Probar sin firma** y mostrar `201`.
- Encender el switch.
- Mostrar `/services`.
- Explicar `scheme`, `price`, `network`, `payTo`, `resource`.
- Ejecutar **Probar sin firma**.
- Mostrar `HTTP 402` y header `PAYMENT-REQUIRED`.

### 00:18-00:23 - Ejecución pagada

- Presionar **Probar con firma x402** o reintentar con
  `PAYMENT-SIGNATURE: x402-fixture-paid`.
- Mostrar `receipt.protocol: "x402"`.
- Mostrar `erc8004Feedback.proofOfPayment`.
- Consultar el job por id.

### 00:23-00:25 - Cierre

- Nombrar límites: seguridad, custody, compliance, abuso, UX y gasto máximo por
  agente.
- Repetir que el reemplazo productivo es middleware x402 oficial + registry
  ERC-8004 real.
- Si hay tiempo y la wallet está lista, mostrar `npm run x402:pay` y señalar
  `paymentStatus: "settled"`.

## Prueba visible

Muestra primero la UI:

1. Switch apagado -> **Probar sin firma** -> `201`.
2. Switch encendido -> **Probar sin firma** -> `402`.
3. Switch encendido -> **Probar con firma x402** -> `201`.

Si necesitas validar API, muestra estos comandos:

```bash
curl http://localhost:3001/.well-known/agent-registration.json
```

```bash
curl -X POST http://localhost:3001/payment-mode \
  -H "Content-Type: application/json" \
  -d '{"enabled":true}'
```

```bash
curl -i -X POST http://localhost:3001/jobs \
  -H "Content-Type: application/json" \
  -d '{"task":"summarize","input":"demo"}'
```

```bash
curl -i -X POST http://localhost:3001/jobs \
  -H "Content-Type: application/json" \
  -H "PAYMENT-SIGNATURE: x402-fixture-paid" \
  -d '{"task":"summarize","input":"demo"}'
```

El primero muestra identidad/discovery. El segundo prende el gate desde API. El
tercero rechaza. El cuarto ejecuta.

## Criterios de éxito

- El asistente entiende por qué identidad y pagos importan.
- ERC-8004 y x402 no se confunden.
- El asistente entiende que Workshop 3 no requiere pago.
- El agente ejecuta libremente cuando el switch está apagado.
- El agente ejecuta solo después de autorización x402 cuando el switch está
  encendido.
- Opcionalmente, se demuestra settlement real en Base Sepolia con `npm run
  x402:pay`.
- Se distingue fixture/testnet/mainnet.
- Se explica qué reemplaza al fixture en producción.

## Riesgos y mitigaciones

- **Pagos reales son sensibles:** usar fixture/testnet, no mainnet.
- **Wallet onboarding lento:** mantener `x402-fixture-paid` como demo principal.
- **Base Sepolia sin USDC:** no improvisar en vivo; volver al fixture y validar
  después.
- **Se confunde ERC-8004 con pago:** repetir que ERC-8004 es discovery/trust.
- **Se quiere producción:** mostrar el paquete oficial `@x402/hono`, pero no
  pedir claves reales en vivo.
- **Compliance:** aclarar que no es asesoría legal ni infraestructura lista para
  producción.
