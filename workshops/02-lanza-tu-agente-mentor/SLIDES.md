# Workshop 2

# Launch Your Agent

### Turning intelligence into action.

---

# Last time...

We gave our application a brain.

🧠 It can reason.

Today...

We'll teach it how to work.

---

# The Evolution of Software

⚙️ **Compute**

↓

🧠 **Reason** ✅

↓

🤖 **Act** ← Today

↓

🌐 **Participate**

---

# LLMs are not Agents

An LLM answers questions.

An agent accomplishes goals.

The difference isn't intelligence.

It's execution.

---

# What makes an Agent?

An agent can...

🎯 Pursue a goal

🛠 Use tools

📁 Read & write files

🌐 Interact with external systems

🔁 Iterate until the task is complete

Agents don't just generate text.

They produce outcomes.

---

# The Agent Runtime

An agent doesn't work alone.

It operates inside an environment with tools.

That environment provides everything the agent needs to execute.

---

# Anatomy of an Agent Runtime

🧠 Model

📚 Context

🧰 Skills

🔌 Tools & Integrations

💾 Memory

🔁 Execution Loops

🛡 Guardrails

📈 Observability

---

# Think of hiring an intern.

You don't just hire someone.

You give them:

🎯 A job

📚 Documentation

🛠 Tools

💬 Feedback

🚧 Boundaries

📈 Goals

An agent runtime does exactly the same thing.

---

# Pi Coding Agent

Pi is a specialized Builder Agent.

Its job is to build software.

It can:

💻 Write code

🧪 Test

🛠 Refactor

▶️ Execute commands

🔁 Iterate

Pi is excellent at building.

Pi is not the product service.

Pi helps us build the service.

---

# Builder vs Service

Today we separate two things:

```text
Pi Coding Agent
        Builder tool

Mentor Agent
        Service we are building
```

The Mentor Agent is the service that will later receive jobs and charge with x402.

Pi helps us design and implement it.

---

# Today's Integration Map

```text
Pi Coding Agent
        Builder tool
        │
        ▼
Mentor Agent service
        │
        ├── Nebius Token Factory
        │       Reasoning
        │
        ├── Wallet fixture
        │       Identity
        │
        └── GitHub
                Code context
```

Today, we're preparing the first version of the Mentor Agent service.

x402 payments come later.

The web surface also comes later.

Today is agent setup and integration readiness.

---

# Today's Workshop

We'll prepare the Mentor Agent with...

🧠 Reasoning

🪪 Identity

💻 Source code context

🧾 An integration contract

By the end of this workshop...

Pi will have enough context to build the Mentor Agent in Workshop 3.

---

# Build

1. Install Pi Coding Agent

2. Configure Pi with Nebius Token Factory

3. Create a blockchain wallet

4. Connect GitHub

5. Validate the integration contract

6. Ask Pi to document the runtime handoff

Let's build.

---

# The Journey

| Evolution           | Workshop                                      |
| ------------------- | --------------------------------------------- |
| 🧠 **Reason**       | Workshop 1 — Give our application a brain. ✅ |
| 🤖 **Act**          | Workshop 2 — Turn it into an agent. ✅        |
| 🌐 **Participate**  | Workshop 3 — Build web pages + API.           |
| 🚀 **Create Value** | Workshop 4 — Let the agent get paid.          |

Each workshop builds on the previous one.
