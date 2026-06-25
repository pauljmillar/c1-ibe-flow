# IBE Flow — Capital One Card Tech AI

A static, single-page prototype of an **Intent-Based Engineering** agentic dev pipeline, built for the Sr. Director, Software Engineering — Card Tech AI interview.

Type an intent, click **Launch IBE**, and watch a 10-stage agentic pipeline run from spec generation → tests → code → independent LLM review → security → CI → agentic QA → human gate → canary deploy.

## Run locally

```bash
python3 -m http.server 5173
# → http://localhost:5173
```

## Deploy

```bash
vercel --prod
```

Vanilla HTML/CSS/JS — no build step, no dependencies.
