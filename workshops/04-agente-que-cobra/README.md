# Un Agente que cobra por trabajo

**Promesa:** Habilita pagos para que tu agente pueda vender sus servicios en un marketplace.

- **Horario público:** 13:30-13:55, workshop stage.
- **Capacidad de diseño:** 20 personas.
- **Fuente de verdad:** programa público en `blockchain-ai-day-landing/src/i18n/ui.ts`.

## Objetivo

Que el asistente entienda por qué blockchain ayuda con pagos/identidad y complete una integración mínima de pago o autorización para un servicio de agente.

## Audiencia

Builders, founders, partners y asistentes técnicos interesados en monetización de agentes, marketplaces y servicios pagados.

## Resultados esperados

- Explicar por qué pagos e identidad son problemas centrales para agentes.
- Entender una arquitectura tipo PerkOS para marketplace/servicios de agentes.
- Integrar o simular un flujo de pago para desbloquear trabajo de agente.
- Identificar riesgos: custodia, permisos, compliance, pricing, abuso y UX.

## Kit de entrega

| Pieza | Definición |
|---|---|
| Artefacto del asistente | Flujo mínimo de job pagado o autorizado para un servicio de agente. |
| Demo mínima | `POST /jobs` rechaza sin pago y ejecuta con receipt válido o mock válido. |
| Prueba visible | Un request devuelve `402 Payment Required`; otro devuelve estado, resultado y receipt. |
| Fallback | Mock de receipt con el punto exacto donde entraría verificación real o testnet. |
| Handoff | El asistente entiende cómo un servicio técnico se convierte en una unidad vendible. |

## Agenda sugerida

| Tiempo | Bloque |
|---|---|
| 00:00-00:03 | Apertura: de agente útil a agente comercial |
| 00:03-00:08 | Why blockchain for payments and identity |
| 00:08-00:13 | PerkOS architecture |
| 00:13-00:21 | Integrate payments |
| 00:21-00:24 | Marketplace flow: publicar, comprar, ejecutar, confirmar |
| 00:24-00:25 | Cierre: límites y próximos pasos |

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

## Criterio de salida

La prueba mínima tiene dos caminos:

```bash
curl -X POST http://localhost:PORT/jobs \
  -H "Content-Type: application/json" \
  -d '{"task":"summarize","input":"demo","paymentReceipt":null}'

curl -X POST http://localhost:PORT/jobs \
  -H "Content-Type: application/json" \
  -d '{"task":"summarize","input":"demo","paymentReceipt":"mock-valid"}'
```

El primer camino debe rechazar. El segundo debe ejecutar o simular ejecución y
devolver resultado, estado y receipt.

## Archivos

- [`SLIDES.md`](SLIDES.md) - estructura propuesta de presentación y pasos técnicos de alto nivel.
- [`FACILITATOR_GUIDE.md`](FACILITATOR_GUIDE.md) - guía de facilitación, ritmo, riesgos y criterios de éxito.
- [`EXERCISES.md`](EXERCISES.md) - ejercicios y prompts para asistentes.
