# Guía del servidor participante

El punto de entrada técnico vive en:

```text
server/
```

Es un servidor Hono en TypeScript con checkpoints por workshop. Esto permite
que alguien entre en Workshop 2, 3 o 4 sin reconstruir manualmente lo anterior.

## Validacion local completa

```bash
cd server
npm install
npm run check
npm run smoke
```

El smoke test levanta los stages 1-4 y verifica las rutas principales sin
necesitar credenciales live.

## Estructura

```text
server/
├── src/
│   ├── app.ts              # composición de Hono
│   ├── server.ts           # entrypoint de Node
│   ├── config.ts           # stage/env/puerto
│   ├── routes/             # rutas por workshop
│   └── integrations/       # Nebius, GitHub y wallet
└── scripts/
    ├── create-wallet.ts
    └── smoke-test.ts
```

## Comandos por workshop

| Workshop | Comando | Incluye |
|---:|---|---|
| 1 | `npm run workshop:1` | Brain API, Hono, Nebius fixture/live |
| 2 | `npm run wallet:create && npm run workshop:2` | Workshop 1 + Pi setup, wallet, GitHub y contrato de integraciones |
| 3 | `npm run workshop:3` | Workshops 1-2 + web pages y API del Mentor Agent |
| 4 | `npm run workshop:4` | Workshops 1-3 + setup de pagos mock |

## Por que esta forma

- Un solo servidor evita cambiar de repo o branch durante el evento.
- Cada stage deja explicito desde donde empieza el participante.
- Los fixtures protegen el horario si falla internet, un secret o una
  integracion externa.
- El mismo servidor puede usar Nebius y GitHub live cuando las variables
  existen.

## Nota para facilitacion

Antes de cada workshop, arranca el stage correspondiente y muestra solo las
rutas necesarias para esa sesión. Usa `npm run smoke` como prueba previa de que
todo el track corre localmente.
