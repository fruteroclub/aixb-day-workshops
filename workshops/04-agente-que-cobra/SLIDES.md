# Slide Structure - Un Agente que cobra por trabajo

**Duration:** 25 minutes max  
**Goal:** Show how a useful agent becomes a commercial service by adding identity, payment authorization, job execution, and receipt/delivery flow.

## Slide production notes

- Match the landing brand: dark background, Space Grotesk headings, mono labels,
  cyan for system structure, rosa only for the action mark.
- Use the event name exactly: **AI x Blockchain Day**.
- Keep copy concrete and payment-flow focused.
- Include one architecture diagram: marketplace/registry -> payment/identity ->
  agent service -> job execution -> receipt.
- Include one proof slide with unpaid rejection and authorized execution.

## Slide structure

| # | Slide | Purpose | Timing |
|---|---|---|---|
| 1 | Title: Un Agente que cobra por trabajo | Set the promise: enable payments so an agent can sell services. | 1 min |
| 2 | From useful agent to paid service | Explain the commercial jump: work, price, access, delivery. | 3 min |
| 3 | Why blockchain for payments and identity | Explain wallet identity, programmable payments, receipts, and coordination. | 4 min |
| 4 | PerkOS architecture | Show marketplace/registry → payment/identity → agent service → job execution → receipt. | 5 min |
| 5 | The paid job lifecycle | Walk through publish, buy, verify, execute, deliver, confirm. | 3 min |
| 6 | Payment integration pattern | Show paywall or receipt verification before work execution. | 4 min |
| 7 | Demo flow | Show rejected job without payment and accepted job with valid receipt/mock. | 3 min |
| 8 | Production risks | Name custody, compliance, abuse, pricing, permissions, UX, and logs. | 1 min |
| 9 | Close: marketplace next steps | Summarize how this becomes a marketplace primitive. | 1 min |

## Technical steps - high-level ordered list

1. Choose a simple agent service that can be sold as a job.
2. Define the marketplace listing fields: service name, price, input, output, and execution limit.
3. Define the identity method: wallet address, account, session, or mock identity.
4. Define the payment method: blockchain payment, protocol/payment provider, testnet transaction, or explicit mock receipt.
5. Add a job creation endpoint or function.
6. Require a payment receipt, authorization token, or mock-valid flag before execution.
7. Add verification logic for the receipt or authorization.
8. Reject unpaid/unauthorized jobs with a clear payment-required response.
9. Execute the agent task only after successful verification.
10. Store or return basic job state: received, authorized, executing, completed, failed.
11. Return the result plus receipt or confirmation metadata.
12. Add two demo paths: unpaid rejection and paid/authorized execution.
13. Document which parts are demo/mocked and what must change for production.

## Speaker notes

- Avoid real funds unless the facilitator has a pre-approved testnet or sandbox flow.
- Keep compliance boundaries explicit: this is a technical learning demo, not production payment infrastructure.
- The audience should leave understanding the pattern, not every marketplace detail.
- Connect back to Workshop 3: the same service can become paid once identity/payment gates are added.

## Required close slide

```text
Proof:
without payment -> reject
with valid receipt or mock-valid -> execute

Production replacement:
testnet, payment provider, onchain check, gateway or registry
```
