# BRD: IBE Flow — Agentic Dev Pipeline Prototype

### Capital One · Sr Director, Software Engineering · Card Tech AI

**Prepared for:** Paul Millar interview application  
**Date:** June 2026  
**Handoff target:** Claude Code → Vercel

---

## 1\. Strategic Framing

### The Key Insight

Capital One already published **Intent-Based Engineering (IBE)** on their tech blog in February 2025 (authored by Senior Distinguished Engineer Mihir Vora). The JD's obsession with "bridging Intent and Execution" *is* IBE. This prototype speaks their own language back to them — and shows the candidate not only knows the framework but can **demonstrate it running**.

From their blog: *"IBE is a novel approach that allows developers to specify only the desired outcomes without diving into the complexities of setup and configuration. It's similar to having TurboTax for developers."*

The prototype extends IBE into the **agentic AI-native dev workflow** the JD describes: spec-driven design, AI coding, AI code review, automated test/security gates, and human-in-the-loop sign-off.

### What This Signals to the Hiring Team

1. You did your homework — deeply — and know their internal vocabulary  
2. You think in *demos*, not decks (Player-Coach signal)  
3. You understand the role's core mandate: close the gap between intent and production  
4. You can ship something polished in hours, which is exactly what they're hiring for

---

## 2\. Prototype Overview

**Name:** IBE Flow  
**Tagline:** From intent to production — without the operational noise.  
**Format:** Single-page interactive HTML/JS (no backend required)  
**Deploy target:** Vercel (static)  
**Demo duration:** \~3 minutes self-guided, or 90-second live walkthrough

### What It Shows

A simulated agentic development pipeline for a Capital One Card Tech AI feature request. The user types a natural language intent, clicks "Launch IBE," and watches the pipeline execute stage by stage with animated status indicators. Human-in-the-loop gates require a click to proceed.

**Example intent pre-filled in the demo:**  
*"Add real-time velocity fraud scoring to Venture X card authorizations using ML inference on transaction sequences."*

---

## 3\. Pipeline Stages (UI Panels)

Each stage is a card that animates from `pending → running → complete` with a status icon and a short log output that streams in (simulated with `setTimeout`).

### Stage 1 — Intent Capture

**Label:** `INTENT`  
**UI:** Editable text area with the pre-filled example intent. "Launch IBE" CTA button.  
**Output shown:** Structured intent parsed into: `Domain`, `Feature`, `Constraint`, `Target Service`

Domain:          Card Tech AI

Feature:         Real-time velocity fraud scoring

Constraint:      Must integrate with existing auth pipeline

Target Service:  venture-x-auth-service

---

### Stage 2 — Spec Generation

**Label:** `SPEC`  
**Agent:** `spec-agent (claude-opus-4)`  
**Simulated output:**

✓ BRD generated            (2.1s)

✓ Acceptance criteria: 6 items

✓ API contract drafted

✓ Data model: transactions, velocity\_windows, risk\_scores

✓ Compliance flags reviewed: PCI-DSS, SOC2

---

### Stage 3 — Test Generation (TDD First)

**Label:** `TESTS`  
**Agent:** `test-agent (claude-sonnet-4-6)`  
**Key message:** Tests are written *before* code — surfaced prominently.  
**Simulated output:**

✓ Unit tests generated      18 cases

✓ Integration tests          6 cases  

✓ Contract tests             4 cases

✓ Edge cases flagged:        velocity\_window \= 0, null merchant\_id

✓ Test suite committed to repo

---

### Stage 4 — Code Generation

**Label:** `CODE`  
**Agent:** `code-agent (claude-sonnet-4-6)`  
**Simulated output:**

✓ Scaffolding from spec       (1.4s)

✓ Core logic implemented

✓ All 18 unit tests passing  ✓

✓ All 6 integration tests    ✓

✓ Code committed: feat/velocity-fraud-scoring

---

### Stage 5 — AI Code Review

**Label:** `REVIEW`  
**Agent:** `review-agent (gemini-2.0-flash)` ← *Different LLM, shown explicitly*  
**Key message:** Independent model catches hallucinations and drift from spec.  
**Simulated output:**

✓ Spec alignment check       PASS

✓ Security patterns          PASS

✓ Hallucination scan         PASS

⚠ Suggestion: Add retry logic on ML inference timeout

✓ Review approved with 1 suggestion

---

### Stage 6 — Security Scan (SAST)

**Label:** `SECURITY`  
**Tool:** `Checkmarx / Semgrep (simulated)`  
**Simulated output:**

✓ OWASP Top 10               PASS

✓ PCI-DSS data handling      PASS

✓ Secrets scan               PASS

✓ Dependency vulnerabilities PASS

✓ Security gate: CLEARED

---

### Stage 7 — CI Pipeline

**Label:** `CI`  
**Simulated output:**

✓ Build: venture-x-auth-service  SUCCESS

✓ All tests run: 28/28            PASS

✓ Code coverage: 94%

✓ Artifacts pushed to registry

✓ Deploy to QA environment        DONE

---

### Stage 8 — Agentic QA Testing

**Label:** `QA`  
**Agent:** `qa-agent (claude-haiku-4-5)`  
**Key message:** Agentic process tests the QA environment automatically.  
**Simulated output:**

✓ Smoke tests passed

✓ Load test: 2,400 auth/sec    p99 \= 38ms ✓

✓ Fraud scenario replay: 500 cases

✓ False positive rate: 0.3%    (threshold: 1%)

✓ Rollback test: PASS

✓ QA gate: CLEARED

---

### Stage 9 — Human-in-the-Loop ⏸

**Label:** `HUMAN REVIEW`  
**UI:** Pipeline **pauses**. Two buttons appear:

- `Review MR` (opens mock diff panel with key changes highlighted)  
- `Approve & Deploy` (advances to Stage 10\)  
  **Key message:** The engineer is the fail-safe, not the bottleneck. They see: test results, QA summary, spec alignment score, and the suggestion from the review agent.

---

### Stage 10 — Production Deploy

**Label:** `PRODUCTION`  
**Simulated output:**

✓ Compliance gates:           PASS

✓ Canary deploy: 5% traffic   LIVE

✓ Monitoring: Datadog alerts  ARMED

✓ Rollback trigger: ARMED

✓ Feature flag: venture-x-velocity-fraud \= ON

Intent → Production in:  4m 12s

Estimated traditional dev time:  3-5 days

**Hero stat displayed:** `98% faster. Zero operational overhead.`

---

## 4\. Key UX Details

### Pipeline Status Bar

A horizontal progress bar at the top shows all 10 stages as dots. Each dot turns green as the stage completes. Pauses (human gate) turn yellow. The current running stage pulses.

### The "Different LLM" Call-Out

Stage 5 explicitly labels the review agent as a different model (Gemini). A tooltip explains: *"Independent model review catches spec drift and hallucinations that the coder agent can't self-detect."* This is a specific, defensible architectural choice the candidate can discuss in the interview.

### Log Stream

Each stage has a collapsible log section that "streams" output lines with a typing animation. This makes the pipeline feel alive, not static.

### Stats Panel (right sidebar or bottom)

Live-updating counters:

- Tests: `28 passing / 0 failing`  
- Code coverage: `94%`  
- Security issues: `0 critical`  
- Spec alignment: `98%`  
- Time elapsed: live clock

### Reset Button

"Start Over" resets all stages to pending and clears the intent field so a live demo can be rerun.

---

## 5\. Design System & CSS

### Brand Colors (Capital One 2024 Refresh)

:root {

  /\* Primary \*/

  \--c1-regal-blue:     \#004977;

  \--c1-punch-red:      \#D03027;

  /\* Neutrals \*/

  \--c1-dark:           \#1D1D1D;

  \--c1-mid-gray:       \#6B7280;

  \--c1-light-gray:     \#F4F5F7;

  \--c1-white:          \#FFFFFF;

  /\* Accents \*/

  \--c1-mint:           \#00A88F;

  \--c1-yellow:         \#F5A623;

  /\* Pipeline Stage Colors \*/

  \--stage-pending:     \#D1D5DB;

  \--stage-running:     \#004977;

  \--stage-complete:    \#10B981;

  \--stage-warning:     \#F5A623;

  \--stage-human:       \#D03027;

  /\* Spacing \*/

  \--radius-sm:         6px;

  \--radius-md:         12px;

  \--radius-lg:         20px;

  /\* Shadows \*/

  \--shadow-card:       0 2px 12px rgba(0, 73, 119, 0.10);

  \--shadow-active:     0 4px 24px rgba(0, 73, 119, 0.18);

}

### Typography

/\* Capital One uses a custom sans-serif (verify via devtools on capitalone.com/tech) \*/

/\* Fallback stack that matches their aesthetic: \*/

font-family: 'Optimist', \-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/\* Note for Claude Code: Inspect https://www.capitalone.com/tech/ to extract

   the actual @font-face declarations and self-host or reference them. \*/

/\* Scale \*/

\--text-hero:    2.5rem / 700;

\--text-title:   1.5rem / 600;

\--text-label:   0.75rem / 600 / uppercase / 0.08em letter-spacing;

\--text-body:    1rem / 400;

\--text-mono:    0.875rem / 400 / 'JetBrains Mono', 'Fira Code', monospace;

### Stage Card Component

.stage-card {

  background: var(--c1-white);

  border-radius: var(--radius-md);

  border: 1.5px solid var(--c1-light-gray);

  box-shadow: var(--shadow-card);

  padding: 20px 24px;

  transition: all 0.3s ease;

}

.stage-card.running {

  border-color: var(--c1-regal-blue);

  box-shadow: var(--shadow-active);

}

.stage-card.complete {

  border-color: var(--stage-complete);

}

.stage-card.human-gate {

  border-color: var(--c1-punch-red);

  box-shadow: 0 4px 24px rgba(208, 48, 39, 0.15);

}

### Buttons

.btn-primary {

  background: var(--c1-regal-blue);

  color: white;

  border-radius: var(--radius-sm);

  padding: 12px 28px;

  font-weight: 600;

  letter-spacing: 0.02em;

  border: none;

  cursor: pointer;

  transition: background 0.2s ease, transform 0.1s ease;

}

.btn-primary:hover { background: \#003a61; transform: translateY(-1px); }

.btn-approve {

  background: var(--stage-complete);

  color: white;

  /\* same sizing as primary \*/

}

.btn-review {

  background: transparent;

  color: var(--c1-regal-blue);

  border: 2px solid var(--c1-regal-blue);

  border-radius: var(--radius-sm);

  padding: 10px 26px;

  font-weight: 600;

}

### Stage Label Pills

.stage-label {

  font-size: 0.65rem;

  font-weight: 700;

  letter-spacing: 0.1em;

  text-transform: uppercase;

  padding: 3px 10px;

  border-radius: 20px;

  background: var(--c1-light-gray);

  color: var(--c1-mid-gray);

}

.stage-label.running { background: var(--c1-regal-blue); color: white; }

.stage-label.complete { background: \#D1FAE5; color: \#065F46; }

.stage-label.human { background: \#FEE2E2; color: \#991B1B; }

---

## 6\. Page Layout

┌─────────────────────────────────────────────────────────┐

│  \[C1 Logo\]   IBE Flow   Sr Dir Demo · Card Tech AI      │

├─────────────────────────────────────────────────────────┤

│  \[Progress bar: stages 1-10 as dots\]                    │

├────────────────────────────┬────────────────────────────┤

│                            │  STATS PANEL               │

│  STAGE CARDS (vertical     │  Tests:  28 ✓ / 0 ✗       │

│  stack, each expanding     │  Coverage: 94%             │

│  when active)              │  Security: 0 issues        │

│                            │  Spec align: 98%           │

│  1\. INTENT    \[complete\]   │  Time: 00:04:12            │

│  2\. SPEC      \[complete\]   │                            │

│  3\. TESTS     \[complete\]   │  ─────────────────         │

│  4\. CODE      \[running ●\]  │  PIPELINE LOG              │

│  5\. REVIEW    \[pending\]    │  (scrollable stream        │

│  ...                       │   of events)               │

│  9\. HUMAN     \[⏸ paused\]  │                            │

│  10\. PROD     \[pending\]    │                            │

└────────────────────────────┴────────────────────────────┘

**Responsive:** On mobile, stats panel moves below the stage cards. Progress bar collapses to a minimal stepper.

---

## 7\. Tech Stack for Claude Code

- **Framework:** Vanilla HTML \+ CSS \+ JavaScript (no build step needed for Vercel static deploy)  
- **OR:** React with Vite if Claude Code prefers a component-based approach  
- **Animations:** CSS transitions \+ `setTimeout`/`setInterval` for log streaming  
- **No external dependencies required** (keep it self-contained)  
- **Font:** Attempt to load Capital One's actual font via `@font-face` scraped from their site; fallback to system sans-serif  
- **Deploy:** `vercel --prod` from root directory (add `vercel.json` if needed)

---

## 8\. Demo Script (for interviews / screen share)

"I built this to show how I think about agentic dev workflows — and specifically to use Capital One's own vocabulary. You published Intent-Based Engineering on your tech blog in February 2025\. This prototype operationalizes IBE with the agentic layer: AI generates the spec, writes tests first, codes to them, and a *different* model does code review to catch hallucinations. The pipeline pauses here — \[points to Stage 9\] — because the engineer is the fail-safe. You approve based on real signal: test results, QA metrics, spec alignment score. Not on vibes."

**Anticipated follow-up questions:**

- *Why a different LLM for review?* → "Same model that wrote the code has the same blind spots. An independent model is more likely to catch spec drift."  
- *What's 'spec alignment'?* → "Automated check that the diff still matches the original intent. Hallucination detection at the feature level."  
- *How does this scale to a team?* → "This is one developer's flow. At team scale, you add an orchestration layer — I'd pull from Capital One's multi-agent work at NVIDIA GTC 2026."

---

## 9\. What This Demonstrates (Hiring Signal Map)

| JD Requirement | Prototype Signal |
| :---- | :---- |
| "Player-Coach, ships production-ready code in hours" | You built this in a day |
| "Bridges Intent and Execution" | The whole pipeline — named after their own IBE |
| "AI-native workflows leveraging Claude" | Claude agents named explicitly in each stage |
| "Spec-driven design" | Stage 2 explicitly generates spec before code |
| "Fail-safe for AI output" | Stage 9 human gate with full evidence panel |
| "Code reviews meet world-class standards" | Stage 5 independent LLM review |
| "No hallucinations or technical debt" | Spec alignment score, review agent |
| "DevOps mindset" | Full CI \+ QA \+ canary deploy \+ rollback armed |

---

## 10\. Competitive Context (for interview conversations)

Capital One sits at **\#4 in US credit card receivables** (\~11% share) behind Chase (\~17%), Amex (\~12%), Citi (\~11%). They're differentiated by technology — the only top-5 issuer that built its entire stack on cloud (closed last data center 2021\) and uses proprietary AI underwriting for near-prime borrowers at scale.

**Recent moves relevant to this role:**

- Acquired **Brex** ($5B) for agentic AI in business banking — IBE \+ agentic dev is central to integrating that acquisition  
- Migrating card network to **Discover** (acquired 2024\) — massive Card Tech engineering scope  
- Presented **agentic AI at NVIDIA GTC 2026** — public commitment at the highest level  
- Publishing research at **ICLR 2026 and EACL 2026** — deep AI research culture

**The opportunity this role can hit on:** The Brex acquisition brings a suite of agentic AI products. The Card Tech AI Sr. Director role is likely going to be central to unifying Brex's agentic stack with Capital One's IBE platform. The prototype nods at this without saying it — the pipeline is *exactly* what that integration work looks like.

---

## 11\. Handoff Notes for Claude Code

**Repo name suggestion:** `c1-ibe-flow`

**File structure:**

/

├── index.html        \# single file, self-contained

├── style.css         \# or embedded in HTML

├── pipeline.js       \# stage definitions, animation engine

├── vercel.json       \# { "version": 2 }

└── README.md         \# brief deploy instructions

**Key implementation notes:**

1. Stage definitions should be a JS array of objects (`{ id, label, agent, logs[], duration }`) so stages are easy to edit without touching layout code  
2. The log streaming effect: push log lines one at a time with `setTimeout` staggered at \~200ms per line  
3. Stage 9 (human gate) should stop the auto-advance timer and wait for explicit button click  
4. Stats panel counters should tick up as stages complete (not all at once)  
5. The progress bar dots should use CSS `transition: background-color 0.4s ease`  
6. Mobile breakpoint: `768px` — stack layout changes, stats move below  
7. On Vercel: static deploy, no serverless functions needed

**To get the real Capital One font:**  
Open `https://www.capitalone.com/tech/` in DevTools → Network → Filter by "font" → grab the WOFF2 URLs. Embed them in the CSS. If blocked by CORS, fall back to `system-ui, -apple-system, sans-serif`.

---

*Built to demonstrate IBE in action. Intent → Execution.*  
