# Workshop 4: Un agente que cobra por trabajo

En este workshop vas a convertir el Mentor Agent del Workshop 3 en un servicio
comercial controlado por una interfaz:

- **ERC-8004:** identidad y descubrimiento del agente.
- **x402:** pago HTTP-native antes de ejecutar trabajo.
- **UI toggle:** un switch visible para activar o apagar el gate de pagos.

ERC-8004 no es el sistema de pago. ERC-8004 registra y describe agentes para
descubrimiento, reputación y validación. x402 es el flujo de pago: cuando el
gate está encendido, el servidor responde `402 Payment Required`, el cliente
paga, reintenta con una firma de pago y entonces el agente ejecuta.

La implementación del workshop usa una firma fixture para que cualquier persona
pueda terminar la sesión sin fondos. También incluye una prueba opcional con
Base Sepolia y el middleware oficial de x402. El gate de pagos empieza apagado
para que la demo de Workshop 3 siga funcionando; se activa desde la página web,
no desde una variable de entorno.

Referencias:

- x402 seller quickstart: https://docs.x402.org/getting-started/quickstart-for-sellers
- x402 MCP/agent flow: https://docs.x402.org/guides/mcp-server-with-x402
- ERC-8004: https://eips.ethereum.org/EIPS/eip-8004
- Ethereum Wingman: https://ethwingman.com/

## Qué vas a tener al final

- El servidor Hono corriendo en stage 4.
- La web del Mentor Agent funcionando igual que en Workshop 3.
- Un switch **Activar pagos x402** para prender o apagar el gate.
- Un archivo de registro ERC-8004 en `/.well-known/agent-registration.json`.
- Un catálogo de servicios cobrables con requirements x402.
- Un endpoint `POST /jobs` que ejecuta gratis con el gate apagado.
- El mismo endpoint rechazando sin `PAYMENT-SIGNATURE` cuando el gate está
  encendido.
- Un job autorizado con receipt x402 y metadata de feedback ERC-8004.
- Una prueba opcional `npm run x402:pay` para liquidar un pago real de testnet
  en Base Sepolia.

## Requisitos

- Node.js 20 o superior.
- Terminal.
- Navegador.
- `curl` opcional para validar API.
- No necesitas wallet real, testnet ni fondos reales para validar esta versión.

## 1. Levanta el stage del workshop

Desde la raíz del repositorio:

```bash
cd server
npm install
npm run wallet:create
npm run check
npm run workshop:4
```

El servidor queda en:

```text
http://localhost:3001
```

Si todavía tienes corriendo el stage anterior, detenlo primero con `Ctrl+C`.
Todos los workshops usan el mismo puerto local.

Este stage incluye lo anterior:

- Workshop 1: brain API.
- Workshop 2: runtime de agente e integraciones.
- Workshop 3: web pages + API del Mentor Agent.
- Workshop 4: ERC-8004 discovery + gate x402 controlado por UI.

## 2. Abre la UI del Mentor Agent

Abre:

```text
http://localhost:3001
```

La parte superior sigue siendo el Mentor Agent del Workshop 3: repositorio de
GitHub + objetivo. Debajo aparece el panel **Gate de pagos**.

El switch **Activar pagos x402** es el control principal:

- Apagado: `POST /jobs` ejecuta como demo sin pago.
- Encendido: `POST /jobs` requiere `PAYMENT-SIGNATURE`.

Este switch cambia el estado del servidor con `POST /payment-mode`. No existe
un env var para activar pagos durante la sesión.

## 3. Prueba el modo demo sin pagos

Deja el switch apagado.

En el panel **Gate de pagos**, presiona **Probar sin firma**.

Debes ver:

- `HTTP: 201`.
- `x402: OFF`.
- `PAYMENT-REQUIRED: no`.
- `integration: "payment-disabled"`.
- `payment.required: false`.
- `result`.

Este es el comportamiento correcto para Workshop 3 y para la demo abierta:
el servicio funciona sin cobrar.

## 4. Activa pagos x402 desde la UI

Prende el switch **Activar pagos x402**.

El estado debe cambiar a:

```text
x402: ON
Pagos encendidos: POST /jobs requiere PAYMENT-SIGNATURE.
```

Ahora presiona **Probar sin firma**.

Debes ver:

- `HTTP: 402`.
- `x402: ON`.
- `PAYMENT-REQUIRED: yes`.
- `status: "payment_required"`.
- `fixturePaymentSignature: "x402-fixture-paid"`.

Este es el punto clave del workshop: el agente ya no ejecuta trabajo si el gate
está encendido y el cliente no trae autorización de pago.

## 5. Ejecuta con firma x402 fixture

Con el switch encendido, presiona **Probar con firma x402**.

Debes ver:

- `HTTP: 201`.
- `status: "completed"`.
- `integration: "x402-fixture"`.
- `payment.required: true`.
- `receipt.protocol: "x402"`.
- `receipt.verified: true`.
- `erc8004Feedback.proofOfPayment`.
- `result`.

La firma fixture es:

```text
x402-fixture-paid
```

En producción, esa firma vendría del cliente después de pagar usando el flujo
x402 real.

## 6. Revisa la identidad ERC-8004

Consulta el registro público del agente:

```bash
curl http://localhost:3001/.well-known/agent-registration.json
```

Debes ver:

- `type: "https://eips.ethereum.org/EIPS/eip-8004#registration-v1"`.
- `services` con `web`, `API` y `x402`.
- `x402Support: true`.
- `registrations` con `agentRegistry` y `agentId`.
- `supportedTrust` con `reputation`.

Esto no mintea un NFT ni escribe onchain. Es el archivo de registro que una
identidad ERC-8004 puede resolver desde `agentURI`.

## 7. Consulta los servicios cobrables

En otra terminal:

```bash
curl http://localhost:3001/services
```

La respuesta lista servicios como:

- `summarize`: resume texto después de autorización x402.
- `mentor`: devuelve un siguiente paso para un builder.

También muestra:

- `payments.enabled`: si el switch está prendido o apagado.
- `payments.mode`: `demo-open` o `enforced`.

Cada servicio incluye un objeto `payment` con:

- `scheme: "exact"`.
- `price`.
- `network`, por default `eip155:84532` para Base Sepolia.
- `payTo`.
- `resource: "POST /jobs"`.

Ese objeto es el requisito que un cliente x402 usaría para pagar.

## 8. Validación opcional con curl

Primero apaga el gate:

```bash
curl -X POST http://localhost:3001/payment-mode \
  -H "Content-Type: application/json" \
  -d '{"enabled":false}'
```

Sin firma, el job ejecuta:

```bash
curl -i -X POST http://localhost:3001/jobs \
  -H "Content-Type: application/json" \
  -d '{"task":"summarize","input":"demo abierta"}'
```

Ahora prende el gate:

```bash
curl -X POST http://localhost:3001/payment-mode \
  -H "Content-Type: application/json" \
  -d '{"enabled":true}'
```

Sin firma, el servidor rechaza:

```bash
curl -i -X POST http://localhost:3001/jobs \
  -H "Content-Type: application/json" \
  -d '{"task":"summarize","input":"demo protegida"}'
```

Debe responder:

```text
HTTP/1.1 402 Payment Required
PAYMENT-REQUIRED: <base64-json>
```

Con firma fixture, ejecuta:

```bash
curl -i -X POST http://localhost:3001/jobs \
  -H "Content-Type: application/json" \
  -H "PAYMENT-SIGNATURE: x402-fixture-paid" \
  -d '{"task":"summarize","input":"AI x Blockchain Day conecta agentes con identidad, pagos y automatizacion."}'
```

Copia el `id` del job para consultar:

```bash
curl http://localhost:3001/jobs/JOB_ID
```

El job existe solo mientras el servidor está corriendo, porque esta versión usa
memoria local y no una base de datos.

## 9. Revisa la implementación

Los archivos importantes son:

```text
server/src/routes/web.ts
server/src/routes/jobs.ts
server/src/integrations/x402.ts
server/src/integrations/erc8004.ts
server/src/types.ts
```

En `server/src/routes/web.ts`, identifica:

- El switch `#payment-toggle`.
- La llamada `POST /payment-mode`.
- Los botones **Probar sin firma** y **Probar con firma x402**.

En `server/src/routes/jobs.ts`, identifica:

- `GET /.well-known/agent-registration.json`: publica metadata ERC-8004.
- `GET /payment-mode`: devuelve si el gate está encendido.
- `POST /payment-mode`: prende o apaga el gate desde UI/API.
- `GET /services`: lista lo que el agente puede vender y cómo pagarlo.
- `POST /jobs`: ejecuta libre si el gate está apagado; valida
  `PAYMENT-SIGNATURE` si el gate está encendido.
- `GET /jobs/:id`: devuelve un job guardado en memoria.
- `createFeedback`: conecta el receipt x402 con metadata de reputación ERC-8004.

El orden correcto con gate encendido es:

```text
solicitud -> 402 con requirements -> pago -> retry con PAYMENT-SIGNATURE -> ejecutar -> devolver result + receipt + feedback
```

El orden correcto con gate apagado es:

```text
solicitud -> ejecutar como demo -> devolver result sin receipt
```

## 10. Qué cambia con x402 real

La versión default del workshop verifica `PAYMENT-SIGNATURE:
x402-fixture-paid`. Para probar x402 real en testnet, el servidor ya puede usar
el middleware oficial de x402 para Hono:

```bash
npm install @x402/hono @x402/core @x402/evm @x402/fetch viem
```

El patrón oficial es:

```ts
import { paymentMiddleware, x402ResourceServer } from "@x402/hono";
import { HTTPFacilitatorClient } from "@x402/core/server";
import { ExactEvmScheme } from "@x402/evm/exact/server";
```

Configuras:

- Facilitator URL, para testnet: `https://x402.org/facilitator`.
- Network: `eip155:84532` para Base Sepolia.
- Wallet receptora.
- Rutas protegidas, por ejemplo `POST /jobs`.
- Límites de gasto y permisos para clientes/agentes.

La decisión de activar o apagar el gate sigue siendo un control de UI, aunque la
verificación interna use el middleware real.

## 11. Prueba live con Base Sepolia

Esta parte es opcional para facilitadores. No la hagas con una wallet mainnet.
Usa una wallet compradora de testnet con USDC en Base Sepolia.

En `server/.env`, configura:

```env
X402_MODE=base-sepolia
X402_NETWORK=eip155:84532
X402_FACILITATOR_URL=https://x402.org/facilitator
X402_PRICE_USD="$0.001"
X402_PAY_TO=0xwallet_vendedora
X402_BUYER_PRIVATE_KEY=0xprivate_key_de_wallet_compradora_testnet
```

`X402_PAY_TO` es la wallet que cobra. `X402_BUYER_PRIVATE_KEY` es la wallet que
paga durante la prueba local. No proyectes ni compartas esa llave.

Arranca el servidor:

```bash
npm run workshop:4
```

Abre `http://localhost:3001`, prende **Activar pagos x402** y presiona
**Probar sin firma**. Debe responder `402`.

En otra terminal, ejecuta:

```bash
npm run x402:pay
```

La salida debe incluir:

```json
{
  "paymentStatus": "settled",
  "network": "eip155:84532"
}
```

Ese comando usa el cliente oficial de x402, firma con la wallet compradora,
reintenta `POST /jobs` con `PAYMENT-SIGNATURE` y lee el `PAYMENT-RESPONSE` que
devuelve el middleware después de liquidar.

## 12. Qué cambia con ERC-8004 real

La versión del workshop publica el registration file local. En una versión real:

1. Despliegas o usas un Identity Registry ERC-8004.
2. Registras el agente y obtienes `agentId`.
3. El `agentURI` apunta a `/.well-known/agent-registration.json` o a otro URI.
4. Puedes publicar feedback de reputación que incluya `proofOfPayment`.

ERC-8004 y x402 se complementan:

- ERC-8004 ayuda a descubrir y confiar en el agente.
- x402 permite pagar por una llamada HTTP.
- El receipt x402 puede enriquecer señales de reputación ERC-8004.

## Criterio de éxito

El workshop está validado cuando puedes mostrar:

- La página `http://localhost:3001` tiene un switch **Activar pagos x402**.
- Con el switch apagado, **Probar sin firma** devuelve `201 Created`.
- Con el switch encendido, **Probar sin firma** devuelve `402 Payment Required`.
- La respuesta 402 incluye header `PAYMENT-REQUIRED`.
- En modo fixture, con el switch encendido, **Probar con firma x402** devuelve
  `201 Created`.
- `GET /.well-known/agent-registration.json` devuelve metadata ERC-8004.
- `GET /services` lista services con requirements x402 y el estado del gate.
- El job pagado incluye receipt x402 y feedback ERC-8004.
- Opcional: `npm run x402:pay` devuelve `paymentStatus: "settled"` en Base
  Sepolia.

La frase técnica del workshop:

```text
ERC-8004 hace al agente descubrible y confiable. x402 hace que el trabajo HTTP sea pagable. El gate de la UI decide si el servicio corre como demo abierta o exige pago antes de ejecutar.
```
