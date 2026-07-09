# Workshop 4: Un agente que cobra por trabajo

En este workshop vas a validar el flujo mínimo para que un agente cobre antes de
ejecutar un trabajo. La implementación actual usa recibos mock: no hay mainnet,
no hay fondos reales y no hay custodia. El punto es entender el patrón técnico:
servicio, autorización de pago, ejecución y comprobante.

## Qué vas a tener al final

- El servidor Hono corriendo en stage 4.
- Un catálogo de servicios cobrables.
- Un endpoint que rechaza trabajos sin pago.
- Un endpoint que ejecuta trabajos con receipt válido.
- Un job guardado en memoria durante la vida del servidor.

## Requisitos

- Node.js 20 o superior.
- Terminal.
- `curl`.

No necesitas wallet real ni testnet para validar la versión actual.

## 1. Levanta el stage del workshop

Desde la raíz del repositorio:

```bash
cd server
npm install
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
- Workshop 2: integraciones del agente.
- Workshop 3: web pages + API del Mentor Agent.
- Workshop 4: setup de pagos y flujo de jobs pagados.

## 2. Consulta los servicios disponibles

En otra terminal:

```bash
curl http://localhost:3001/services
```

Debes ver servicios como:

- `summarize`: resume texto después de autorización.
- `mentor`: devuelve un siguiente paso para un builder.

La respuesta indica `receipt: "mock-valid"`. Ese es el receipt que desbloquea la
ejecución en esta versión.

## 3. Prueba el camino sin pago

```bash
curl -i -X POST http://localhost:3001/jobs \
  -H "Content-Type: application/json" \
  -d '{"task":"summarize","input":"Este texto debería ser rechazado.","paymentReceipt":null}'
```

El servidor debe responder con:

```text
HTTP/1.1 402 Payment Required
```

Y el body debe incluir:

```json
{
  "status": "payment_required",
  "requiredReceipt": "mock-valid"
}
```

Este es el comportamiento correcto: el agente no trabaja si no hay comprobante.

## 4. Prueba el camino pagado con mock receipt

```bash
curl -i -X POST http://localhost:3001/jobs \
  -H "Content-Type: application/json" \
  -d '{"task":"summarize","input":"AI x Blockchain Day conecta agentes con identidad, pagos y automatizacion.","paymentReceipt":"mock-valid"}'
```

El servidor debe responder con status `201 Created` y un job con:

- `status: "completed"`.
- `integration: "mock"`.
- `receipt.verified: true`.
- `result`.

Copia el `id` del job para el siguiente paso.

## 5. Consulta el job creado

Reemplaza `JOB_ID` por el id que recibiste:

```bash
curl http://localhost:3001/jobs/JOB_ID
```

El job existe solo mientras el servidor esta corriendo, porque esta versión usa
memoria local y no una base de datos.

## 6. Prueba otro servicio

```bash
curl -i -X POST http://localhost:3001/jobs \
  -H "Content-Type: application/json" \
  -d '{"task":"mentor","input":"honojs/hono","paymentReceipt":"mock-valid"}'
```

El resultado debe devolver una recomendación breve para definir un siguiente
paso.

## 7. Revisa la implementación

Los archivos importantes son:

```text
server/src/routes/jobs.ts
server/src/types.ts
```

En `server/src/routes/jobs.ts`, identifica:

- `GET /services`: lista lo que el agente puede vender.
- `POST /jobs`: valida el receipt antes de ejecutar.
- `GET /jobs/:id`: devuelve un job guardado en memoria.
- `validReceipt`: define que receipts desbloquean ejecución.
- `executePaidTask`: simula el trabajo del agente.

El punto técnico es el orden:

```text
solicitud -> verificar pago -> ejecutar trabajo -> devolver resultado + receipt
```

No debe ser:

```text
solicitud -> ejecutar trabajo -> pedir pago después
```

## 8. Donde entraria blockchain real

La versión actual acepta `mock-valid` y `testnet-valid`. En una versión real,
`validReceipt` seria reemplazado o complementado por una verificacion contra:

- Un payment gateway.
- Una red testnet.
- Un contrato.
- Un indexer.
- Un servicio de identidad o permisos.

La lógica del route handler no debería cambiar demasiado. Lo que cambiaria es
el módulo que decide si el receipt es válido.

## Criterio de éxito

El workshop está validado cuando puedes mostrar:

- `GET /services` lista servicios cobrables.
- `POST /jobs` sin receipt devuelve `402 Payment Required`.
- `POST /jobs` con `paymentReceipt: "mock-valid"` devuelve `201 Created`.
- `GET /jobs/:id` devuelve el job creado.

La frase técnica del workshop:

```text
Un agente comercial no solo ejecuta tareas: verifica autorización, entrega resultado y conserva comprobante.
```
