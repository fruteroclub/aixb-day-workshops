# Facilitator Guide — Un Agente que cobra por trabajo

## Intención de facilitación

La sesión debe conectar la utilidad de un agente con un flujo económico. El objetivo no es lanzar un marketplace completo, sino mostrar la arquitectura mínima para que un agente venda un servicio: identidad, pago/autorización, ejecución y comprobante.

## Promesa al asistente

Habilita pagos para que tu agente pueda vender sus servicios en un marketplace.

## Antes de iniciar

- Decide si el flujo usará testnet, mock de pago o proveedor específico.
- Ten una arquitectura visual de PerkOS.
- Ten un servicio vendible simple: resumen, batalla, análisis, generación o consulta.
- No uses fondos reales.
- Prepara fallback si wallet/payment infra falla.

## Run of show

### 00:00–00:10 — Apertura

- Mostrar la transición: agente útil → agente vendible.
- Definir marketplace, servicio, job, pago y receipt.

### 00:10–00:30 — Why blockchain for payments and identity

- Explicar identidad/wallet.
- Explicar pago programable y comprobante.
- Explicar cuándo no conviene poner todo onchain.

### 00:30–00:50 — PerkOS architecture

- Marketplace/registry.
- Agent service.
- Payment/identity verification.
- Job execution.
- Logs, receipt y delivery.

### 00:50–01:25 — Integrate payments

- Definir servicio vendible.
- Agregar paywall/autorización.
- Verificar pago real/testnet o mock.
- Ejecutar tarea después de autorización.

### 01:25–01:40 — Marketplace flow

- Publicar servicio.
- Comprar/autorizar.
- Ejecutar job.
- Confirmar resultado.

### 01:40–01:45 — Cierre

- Nombrar límites: seguridad, compliance, abuso, custody y UX.

## Criterios de éxito

- El asistente entiende por qué pagos e identidad importan.
- Hay un flujo mínimo de pago/autorización.
- El agente o servicio ejecuta trabajo solo después de autorización.
- Se distingue demo/testnet/mock de producción.

## Riesgos y mitigaciones

- **Pagos reales son sensibles:** usar testnet/mock.
- **Wallet onboarding lento:** permitir modo simulación.
- **Arquitectura muy abstracta:** anclar todo en un servicio vendible concreto.
- **Compliance:** aclarar que no es asesoría legal ni infraestructura lista para producción.
