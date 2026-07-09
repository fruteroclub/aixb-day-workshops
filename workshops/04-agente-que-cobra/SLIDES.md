# Slide Structure - Un Agente que cobra por trabajo

**Duration:** 25 minutes max  
**Goal:** Show how a useful agent becomes a commercial service by adding ERC-8004 discovery, a visible x402 payment toggle, job execution, and receipt/delivery flow.

## Slide production notes

- Match the landing brand: dark background, Space Grotesk headings, mono labels,
  cyan for system structure, rosa only for the action mark.
- Use the event name exactly: **AI x Blockchain Day**.
- Keep copy concrete and x402-flow focused.
- Include one architecture diagram: ERC-8004 registry -> UI payment gate -> x402 payment ->
  agent service -> job execution -> receipt.
- Include one proof slide with toggle off execution, toggle on unpaid rejection,
  and authorized execution.

## Slide structure

| # | Slide | Purpose | Timing |
|---|---|---|---|
| 1 | Title: Un Agente que cobra por trabajo | Set the promise: enable payments so an agent can sell services. | 1 min |
| 2 | From useful agent to paid service | Explain the commercial jump: work, price, access, delivery. | 3 min |
| 3 | ERC-8004 vs x402 | Separate discovery/trust from payment. | 4 min |
| 4 | Agent commerce architecture | Show ERC-8004 registration → UI gate → x402 requirements → agent service → job execution → receipt. | 5 min |
| 5 | The x402 lifecycle | Walk through switch off, switch on, request, 402, payment, retry, execute, deliver. | 3 min |
| 6 | ERC-8004 feedback | Show how proof of payment can enrich reputation signals. | 4 min |
| 7 | Demo flow | Show switch off execution, switch on rejection without `PAYMENT-SIGNATURE`, and accepted job with x402 fixture signature. | 3 min |
| 8 | Optional live proof | Show Base Sepolia `paymentStatus: "settled"` if the facilitator wallet is ready. | 1 min |
| 9 | Close: marketplace next steps | Summarize how this becomes a marketplace primitive. | 1 min |

## Technical steps - high-level ordered list

1. Choose a simple agent service that can be sold as a job.
2. Define the marketplace listing fields: service name, price, input, output, and execution limit.
3. Publish an ERC-8004 registration file with services and `x402Support`.
4. Define x402 requirements: scheme, price, network, payTo, resource.
5. Add a UI switch that toggles payment enforcement.
6. Add a job creation endpoint or function.
7. With the switch off, execute as a free demo.
8. With the switch on, require `PAYMENT-SIGNATURE` before execution.
9. Add verification logic for the x402 signature or facilitator result.
10. Reject unpaid/unauthorized jobs with HTTP `402 Payment Required`.
11. Execute the agent task only after successful verification.
12. Store or return basic job state: received, authorized, executing, completed, failed.
13. Return the result plus x402 receipt and ERC-8004 feedback metadata.
14. Add three demo paths: free demo, unpaid rejection, paid/authorized execution.
15. Optionally run `npm run x402:pay` against Base Sepolia.
16. Document which parts are demo/mocked and what must change for production.

## Speaker notes

- Avoid real funds unless the facilitator has a pre-approved testnet flow.
- Keep compliance boundaries explicit: this is a technical learning demo, not production payment infrastructure.
- The audience should leave understanding the pattern, not every marketplace detail.
- Connect back to Workshop 3: the same service can become paid once identity/payment gates are added.
- The payment gate is a UI control in the demo, not an environment variable.
- Base Sepolia live payment is optional proof, not the critical path for participants.
- Do not conflate ERC-8004 with payments. x402 handles payment; ERC-8004 handles discovery/trust.

## Required close slide

```text
Proof:
toggle OFF + without PAYMENT-SIGNATURE -> execute as demo
toggle ON + without PAYMENT-SIGNATURE -> 402
toggle ON + x402-fixture-paid -> execute with receipt
optional Base Sepolia -> paymentStatus settled

Production replacement:
@x402/hono facilitator + ERC-8004 identity registry
```
