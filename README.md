# AI x Blockchain Day Workshops

Repositorio de los workshops prácticos de **AI x Blockchain Day**.

Este repo contiene el contenido fuente para speakers y participantes: guías,
slides, ejercicios y el servidor local que se usa durante los workshops. El
sitio público, las rutas de presentación y la página de recursos viven en el
proyecto de landing:

```text
~/workspaces/frutero/projects/blockchain-ai-day/code/blockchain-ai-day-landing/
```

## Objetivo del track

Los workshops forman una progresión:

```text
Fundamentos IA x Blockchain
        ↓
Lanza tu agente mentor
        ↓
Dale un trabajo a tu agente
        ↓
Un agente que cobra por trabajo
```

La meta es que una persona pueda entender el stack y validar una demo local:

1. Un backend Hono que razona con Nebius o fixture.
2. Un agente conectado a integraciones reales o simuladas.
3. Un servicio de mentor que usa GitHub + razonamiento.
4. Un gate de pagos x402 controlado desde UI, con identidad ERC-8004 y receipt
   fixture cuando el gate está encendido.

## Punto de entrada para participantes

Cada workshop se valida desde su propio `README.md`:

| # | Workshop | Guía |
|---:|---|---|
| 1 | Fundamentos IA x Blockchain | [`workshops/01-fundamentos-ia-x-blockchain/README.md`](workshops/01-fundamentos-ia-x-blockchain/README.md) |
| 2 | Lanza tu agente mentor | [`workshops/02-lanza-tu-agente-mentor/README.md`](workshops/02-lanza-tu-agente-mentor/README.md) |
| 3 | Dale un trabajo a tu agente | [`workshops/03-dale-un-trabajo-a-tu-agente/README.md`](workshops/03-dale-un-trabajo-a-tu-agente/README.md) |
| 4 | Un agente que cobra por trabajo | [`workshops/04-agente-que-cobra/README.md`](workshops/04-agente-que-cobra/README.md) |

El `README.md` de cada workshop es la guía que se debe seguir para validar el
tutorial.

## Servidor local

El servidor participante vive en [`server/`](server/). Es una app Hono en
TypeScript con stages por workshop.

Para validar todo el track:

```bash
cd server
npm install
npm run check
npm run smoke
```

Comandos por stage:

| Workshop | Comando | URL local | Incluye |
|---:|---|---|---|
| 1 | `npm run workshop:1` | `http://localhost:3001` | Brain API, `/stack`, `/reason` |
| 2 | `npm run wallet:create && npm run workshop:2` | `http://localhost:3001` | Workshop 1 + Pi setup, wallet, GitHub y contrato de integraciones |
| 3 | `npm run workshop:3` | `http://localhost:3001` | Workshops 1-2 + web pages y API `/mentor-agent` |
| 4 | `npm run workshop:4` | `http://localhost:3001` | Workshops 1-3 + UI toggle x402 y ERC-8004 |

Todos los stages usan el mismo URL local. Detén el servidor anterior con
`Ctrl+C` antes de iniciar el siguiente stage.

El servidor usa fixtures cuando faltan secrets, red o proveedores externos. Eso
es intencional: el workshop debe poder terminar aunque una integracion live
falle.

## Estructura del repositorio

```text
.
├── README.md
├── SERVER.md
├── WORKSHOP_RUNBOOK.md
├── server/
│   ├── README.md
│   ├── package.json
│   ├── src/
│   │   ├── app.ts
│   │   ├── server.ts
│   │   ├── config.ts
│   │   ├── routes/
│   │   └── integrations/
│   └── scripts/
└── workshops/
    ├── 01-fundamentos-ia-x-blockchain/
    │   ├── README.md
    │   ├── SLIDES.md
    │   ├── FACILITATOR_GUIDE.md
    │   └── EXERCISES.md
    ├── 02-lanza-tu-agente-mentor/
    │   ├── README.md
    │   ├── SLIDES.md
    │   ├── FACILITATOR_GUIDE.md
    │   └── EXERCISES.md
    ├── 03-dale-un-trabajo-a-tu-agente/
    │   ├── README.md
    │   ├── SLIDES.md
    │   ├── FACILITATOR_GUIDE.md
    │   └── EXERCISES.md
    └── 04-agente-que-cobra/
        ├── README.md
        ├── SLIDES.md
        ├── FACILITATOR_GUIDE.md
        └── EXERCISES.md
```

## Fuente de verdad

Antes de cambiar promesas publicas, horarios, branding o lenguaje del evento,
revisa:

- [`WORKSHOP_RUNBOOK.md`](WORKSHOP_RUNBOOK.md) para reglas operativas.
- `blockchain-ai-day/code/blockchain-ai-day-landing/src/i18n/ui.ts` para agenda
  publica.
- `blockchain-ai-day/code/blockchain-ai-day-landing/DESIGN.md` para marca,
  look and feel y dirección visual.

## Principios de entrega

- Construir temprano: cada workshop termina con una prueba local.
- Etiquetar la realidad: `live`, `fixture`, `mock`, `missing` o `configured`.
- No depender de mainnet, fondos reales ni secrets proyectados.
- Proteger el tiempo: si una integracion falla, usar fixture y seguir.
- Mantener el servidor modular: rutas en `server/src/routes/`, integraciones en
  `server/src/integrations/`.

## Estado actual

El servidor local valida stages 1-4 con `npm run smoke`.

Los cuatro workshops tienen `README.md` en espanol como guía principal. Workshop
4 usa una firma x402 fixture y un switch en la UI para activar o apagar el gate
de pagos; también incluye una prueba opcional de settlement en Base Sepolia con
`npm run x402:pay`.
