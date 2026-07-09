# Workshop 1: Fundamentos IA x Blockchain

En este workshop vas a validar la primera pieza del sistema: un servidor Hono
que le da "cerebro" a la aplicación. El backend expone rutas simples, guarda los
secrets fuera del cliente y puede llamar a Nebius Token Factory cuando hay
credenciales disponibles.

El objetivo no es construir una app completa. El objetivo es entender la
arquitectura mínima y comprobar que una aplicación puede razonar desde un
backend controlado.

## Qué vas a tener al final

- Un servidor Hono corriendo localmente.
- Un mapa de la arquitectura IA x Blockchain.
- Un endpoint que responde con razonamiento `fixture` o `live`.
- Una prueba clara de que el sistema funciona aunque no haya API keys.

## Requisitos

- Node.js 20 o superior.
- Terminal.
- `curl`.
- Opcional: credenciales de Nebius Token Factory para probar modo `live`.

## 1. Levanta el stage del workshop

Desde la raíz del repositorio:

```bash
cd server
npm install
npm run check
npm run workshop:1
```

El servidor queda en:

```text
http://localhost:3001
```

Deja esa terminal abierta. En otra terminal, entra también a `server/` para
ejecutar las pruebas.

## 2. Comprueba que el backend está vivo

```bash
curl http://localhost:3001/health
```

Debes ver una respuesta con:

```json
{
  "ok": true,
  "service": "aixb-day-server",
  "framework": "hono",
  "workshopStage": 1
}
```

No importa si aparecen más campos. Lo importante es que `ok` sea `true` y que
`workshopStage` sea `1`.

## 3. Lee el mapa de arquitectura

```bash
curl http://localhost:3001/stack
```

Esta ruta muestra las piezas del sistema:

- Aplicacion participante.
- Backend Hono.
- Nebius Token Factory.
- Infraestructura blockchain que se conecta en workshops posteriores.

La respuesta debe tener `integration: "fixture"` porque este mapa no depende de
un proveedor externo.

## 4. Prueba razonamiento sin credenciales

```bash
curl -X POST http://localhost:3001/reason \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Explica por que una aplicación con IA necesita un backend."}'
```

Si no configuraste Nebius, la respuesta debe decir:

```json
{
  "integration": "fixture"
}
```

Eso es correcto. El modo `fixture` es una salida valida del workshop: demuestra
la forma de la API sin depender de red, modelo o secrets.

## 5. Revisa la implementación

Los archivos importantes son:

```text
server/src/app.ts
server/src/routes/brain.ts
server/src/integrations/nebius.ts
server/src/config.ts
```

Lee primero `server/src/routes/brain.ts`.

Debes identificar:

- `GET /stack`: devuelve el mapa técnico.
- `POST /reason`: recibe un prompt y llama a `callNebius`.
- `fixtureReasoning`: respuesta local cuando no hay credenciales.

Despues lee `server/src/integrations/nebius.ts`.

La idea importante: la ruta no sabe los detalles de Nebius. La ruta solo pide
razonamiento. El módulo de integracion decide si usa Nebius live o fixture.

## 6. Opcional: conecta Nebius live

Si tienes credenciales del evento:

```bash
export NEBIUS_API_KEY="reemplaza-con-tu-api-key"
export NEBIUS_MODEL="reemplaza-con-el-modelo"
export NEBIUS_BASE_URL="https://api.tokenfactory.nebius.com/v1"
npm run workshop:1
```

Vuelve a probar:

```bash
curl -X POST http://localhost:3001/reason \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Dame una frase técnica sobre por que AI x Blockchain importa."}'
```

Ahora la respuesta debería decir `integration: "live"`. Si sigue diciendo
`fixture`, revisa que `NEBIUS_API_KEY` y `NEBIUS_MODEL` existan en la misma
terminal donde arrancaste el servidor.

## Criterio de éxito

El workshop está validado cuando puedes mostrar:

- `GET /health` responde con `ok: true`.
- `GET /stack` devuelve el mapa de arquitectura.
- `POST /reason` devuelve una respuesta etiquetada como `fixture` o `live`.

## Si algo falla

Para volver al modo seguro:

```bash
unset NEBIUS_API_KEY NEBIUS_MODEL NEBIUS_BASE_URL
npm run workshop:1
```

El workshop debe seguir funcionando en modo `fixture`.
