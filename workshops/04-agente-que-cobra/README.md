# Un Agente que cobra por trabajo

**Promesa:** Habilita pagos para que tu agente pueda vender sus servicios en un marketplace.

## Objetivo

Que el asistente entienda por qué blockchain ayuda con pagos/identidad y complete una integración mínima de pago o autorización para un servicio de agente.

## Audiencia

Builders, founders, partners y asistentes técnicos interesados en monetización de agentes, marketplaces y servicios pagados.

## Resultados esperados

- Explicar por qué pagos e identidad son problemas centrales para agentes.
- Entender una arquitectura tipo PerkOS para marketplace/servicios de agentes.
- Integrar o simular un flujo de pago para desbloquear trabajo de agente.
- Identificar riesgos: custodia, permisos, compliance, pricing, abuso y UX.

## Agenda sugerida

| Tiempo | Bloque |
|---|---|
| 00:00–00:10 | Apertura: de agente útil a agente comercial |
| 00:10–00:30 | Why blockchain for payments and identity |
| 00:30–00:50 | PerkOS architecture |
| 00:50–01:25 | Integrate payments |
| 01:25–01:40 | Marketplace flow: publicar, comprar, ejecutar, confirmar |
| 01:40–01:45 | Cierre: límites y próximos pasos |

## Contenido base

### Why blockchain for payments and identity

- Agentes necesitan saber quién pide, qué permiso tiene y quién paga.
- Blockchain permite pagos programables, cuentas/wallets, ownership, receipts y coordinación entre sistemas.
- No todo debe ir onchain: distinguir pagos, identidad, metadata, lógica de negocio y ejecución offchain.

### PerkOS architecture

- Marketplace de perks/servicios.
- Agente como proveedor de trabajo.
- Backend/harness que recibe jobs, verifica pago/identidad y ejecuta.
- Wallet, payment gateway/protocol, registry, job state y logs.

### Integrate payments

- Definir servicio vendible.
- Agregar paywall/autorización.
- Verificar pago o simular recibo.
- Ejecutar trabajo del agente después del pago.
- Devolver resultado y comprobante.

## Artefacto del workshop

Un flujo mínimo donde un usuario paga o presenta prueba de pago/identidad para desbloquear una tarea ejecutada por un agente o servicio de agente.

## Archivos

- [`FACILITATOR_GUIDE.md`](FACILITATOR_GUIDE.md) — guía de facilitación, ritmo, riesgos y criterios de éxito.
- [`EXERCISES.md`](EXERCISES.md) — ejercicios y prompts para asistentes.
