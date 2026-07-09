# Guía de facilitación - Lanza tu agente mentor

## Intención de facilitación

La sesión debe mover a la audiencia de "nuestra app puede razonar" a "podemos
preparar un agente builder con integraciones reales". El foco es Pi Coding
Agent como herramienta de construcción, no la UI final.

No se abre navegador en Workshop 2. La web y la API pública del Mentor Agent se
construyen en Workshop 3.

## Promesa al asistente

Configura Pi con Nebius Token Factory y deja listo el stage de integraciones del
Mentor Agent.

## Antes de iniciar

- Ten Node.js 20 validado.
- Ten el comando de instalación de Pi probado en la máquina del speaker.
- Ten `server/.env` con `NEBIUS_API_KEY`, `NEBIUS_MODEL` y `NEBIUS_BASE_URL`.
- Ten un repo público de GitHub para pruebas.
- Ten el fallback listo para Nebius, GitHub público y wallet.

## Materiales preparados

- Tutorial abierto en `README.md`.
- Servidor Hono listo en `server/`.
- API key de Nebius no visible en pantalla.
- Repo público de GitHub elegido para la demo.

## Contrato de demo

| Paso | Qué debe verse |
|---|---|
| Pi | Pi se instala o se abre desde la máquina del speaker. |
| Nebius | Pi usa Token Factory o fixture. |
| Wallet | Se genera una identidad `fixture`, sin fondos y sin mainnet. |
| GitHub | El servidor puede leer contexto público o fixture. |
| Stage 2 | `npm run smoke:2` pasa. |
| Handoff | Pi entiende que Workshop 3 construye web pages + API. |

## Run of show

### 00:00-00:03 - Apertura

- Recordar que Workshop 1 dio razonamiento a la app.
- Aclarar la diferencia: Pi es la herramienta builder, no el servicio final.
- Presentar el objetivo: dejar listo el runtime de agente.

### 00:03-00:07 - LLMs vs agents

- LLM: responde.
- Agent builder: usa contexto, herramientas y comandos para construir.
- Servicio agentico: producto o API que entrega trabajo a un usuario.

### 00:07-00:10 - Runtime del builder

- Modelo.
- Contexto.
- Herramientas.
- Archivos.
- Verificación.
- Guardrails.

### 00:10-00:22 - Build

1. Instalar Pi Coding Agent.
2. Configurar Pi para Nebius Token Factory.
3. Crear una wallet fixture.
4. Validar GitHub público.
5. Correr `npm run smoke:2`.
6. Pedir a Pi que documente el runtime y el handoff a Workshop 3.

### 00:22-00:25 - Verificación y cierre

- Mostrar `pi --version`.
- Mostrar que Pi reconoce `nebius-token-factory`.
- Mostrar `npm run smoke:2`.
- Cerrar conectando con Workshop 3: Pi construirá las páginas y conectará la API
  para usuarios y agentes.

## Prueba visible

La prueba visible es terminal-first:

- Pi instalado.
- Pi configurado.
- Wallet fixture generada.
- `npm run smoke:2` pasando.
- `AGENT_RUNTIME_NOTES.md` creado por Pi.

## Criterios de éxito

- Pi no fue tratado como prerequisito.
- Pi quedó configurado para Nebius Token Factory.
- El asistente entiende que Pi no es el servicio.
- El servidor Hono prueba Nebius, wallet y GitHub.
- Ningún secret fue proyectado.
- No se abrió navegador ni se mostró UI.

## Riesgos y mitigaciones

- **Pi install falla:** usar máquina del speaker.
- **Nebius falla:** fixture.
- **GitHub rate limit:** el servidor usa página pública + README crudo; si eso
  falla, usar fixture o cambiar a otro repo público.
- **Pi se confunde con el servicio:** repetir que Pi construye; el Mentor Agent
  es el servicio que se expone en Workshop 3.
