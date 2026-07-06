# AI x Blockchain Day Workshops

Repositorio de materiales para la ruta práctica de workshops de **AI x Blockchain Day**.

La programación está diseñada para personas que quieren entender y construir en la intersección de inteligencia artificial, agentes y blockchain sin asumir conocimiento técnico avanzado. Cada workshop funciona por separado, pero los cuatro juntos forman una ruta completa:

```text
Fundamentos IA x Blockchain
        ↓
Lanza tu propio Agente Mentor
        ↓
Dale un trabajo a tu Agente
        ↓
Un Agente que cobra por trabajo
```

## Objetivo de la ruta

Que los asistentes salgan con un mapa práctico de cómo construir con IA y blockchain:

1. Entender el estado actual de IA, agentes y blockchain.
2. Levantar un agente local que pueda explicar mientras construye.
3. Usar el agente para crear servicios web conectados a APIs e infraestructura blockchain.
4. Integrar identidad y pagos para que un agente pueda vender o cobrar por trabajo.

## Workshops

| # | Workshop | Promesa | Directorio |
|---|---|---|---|
| 1 | Fundamentos IA x Blockchain | Aprende cómo funcionan estas tecnologías de frontera sin conocimiento técnico. | [`workshops/01-fundamentos-ia-x-blockchain`](workshops/01-fundamentos-ia-x-blockchain/) |
| 2 | Lanza tu propio Agente Mentor | Empieza a construir con una IA que te explica mientras construye lo que le pides. | [`workshops/02-lanza-tu-agente-mentor`](workshops/02-lanza-tu-agente-mentor/) |
| 3 | Dale un trabajo a tu Agente | Aprende con tu agente a construir servicios web. | [`workshops/03-dale-un-trabajo-a-tu-agente`](workshops/03-dale-un-trabajo-a-tu-agente/) |
| 4 | Un Agente que cobra por trabajo | Habilita pagos para que tu agente pueda vender sus servicios en un marketplace. | [`workshops/04-agente-que-cobra`](workshops/04-agente-que-cobra/) |

## Público recomendado

- Builders y founders que quieren construir productos con IA.
- Personas no técnicas que necesitan entender el stack sin perderse en jerga.
- Desarrolladores que quieren conectar agentes, APIs y blockchain.
- Comunidades y partners que quieren activar casos prácticos después del evento.

## Principios didácticos

- **Explicar sin infantilizar:** usar lenguaje simple sin quitar precisión.
- **Construir pronto:** cada sesión debe aterrizar en un artefacto, mapa o demo.
- **Usar agentes como copilotos:** los asistentes aprenden junto a un agente, no solo escuchan teoría.
- **Separar concepto de herramienta:** primero entender la categoría; luego usar herramientas concretas.
- **No prometer producción completa:** los demos son rutas de aprendizaje, no sistemas auditados para uso real con dinero.

## Formato operativo

- Cada workshop dura **25 minutos máximo**.
- Hay **5 minutos entre workshops** para cambio de speaker, conexión de laptop, apertura de demo y reset de sala.
- Cada workshop debe priorizar una explicación mínima, una demo guiada y un cierre accionable.
- Si una instalación o integración se atora, el facilitador debe cambiar a demo preparada o mock y proteger el tiempo.

## Requisitos generales

Para workshops 2–4 se recomienda llegar con:

- Laptop con terminal.
- Git instalado.
- Node.js LTS o runtime compatible con el stack elegido por facilitadores.
- Cuenta en GitHub.
- Acceso a un proveedor LLM o credencial provista por el evento.
- Wallet de prueba o testnet si el facilitador decide activar pagos/identidad en vivo.

> Nota: los facilitadores pueden adaptar el stack final. Este repositorio define la estructura pedagógica y los entregables mínimos.

## Estructura del repositorio

```text
.
├── README.md
└── workshops/
    ├── 01-fundamentos-ia-x-blockchain/
    │   ├── README.md
    │   ├── FACILITATOR_GUIDE.md
    │   └── EXERCISES.md
    ├── 02-lanza-tu-agente-mentor/
    │   ├── README.md
    │   ├── FACILITATOR_GUIDE.md
    │   └── EXERCISES.md
    ├── 03-dale-un-trabajo-a-tu-agente/
    │   ├── README.md
    │   ├── FACILITATOR_GUIDE.md
    │   └── EXERCISES.md
    └── 04-agente-que-cobra/
        ├── README.md
        ├── FACILITATOR_GUIDE.md
        └── EXERCISES.md
```

## Estado

Borrador inicial para revisión de Mel y facilitadores.
