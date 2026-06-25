// IBE Flow — agentic dev pipeline simulator
const STAGES = [
  {
    id: 'intent', label: 'Intent', title: 'Intent Capture',
    agent: 'parser', duration: 600,
    logs: [
      { t: 'info', text: 'Parsing natural-language intent…' },
      { t: 'ok', text: 'Domain resolved → Card Tech AI' },
      { t: 'ok', text: 'Feature resolved → Real-time velocity fraud scoring' },
      { t: 'ok', text: 'Target service → venture-x-auth-service' },
      { t: 'ok', text: 'Constraints captured (1)' },
    ],
    onComplete: () => bumpStat('statSpec', '—'),
  },
  {
    id: 'spec', label: 'Spec', title: 'Spec Generation',
    agent: 'spec-agent · claude-opus-4', duration: 2100,
    logs: [
      { t: 'info', text: 'Drafting BRD from intent…' },
      { t: 'ok', text: 'BRD generated (2.1s)' },
      { t: 'ok', text: 'Acceptance criteria: 6 items' },
      { t: 'ok', text: 'API contract drafted' },
      { t: 'ok', text: 'Data model: transactions, velocity_windows, risk_scores' },
      { t: 'ok', text: 'Compliance flags reviewed: PCI-DSS, SOC2' },
    ],
  },
  {
    id: 'tests', label: 'Tests', title: 'Test Generation',
    agent: 'test-agent · claude-sonnet-4-6', duration: 1800,
    callout: 'Tests are written before code — TDD enforced by the pipeline.',
    logs: [
      { t: 'info', text: 'Generating unit tests from acceptance criteria…' },
      { t: 'ok', text: 'Unit tests generated — 18 cases' },
      { t: 'ok', text: 'Integration tests — 6 cases' },
      { t: 'ok', text: 'Contract tests — 4 cases' },
      { t: 'warn', text: 'Edge cases flagged: velocity_window = 0, null merchant_id' },
      { t: 'ok', text: 'Test suite committed to repo' },
    ],
    onComplete: () => { bumpStat('statTests', '28 ✓ / 0 ✗'); },
  },
  {
    id: 'code', label: 'Code', title: 'Code Generation',
    agent: 'code-agent · claude-sonnet-4-6', duration: 2000,
    logs: [
      { t: 'info', text: 'Scaffolding from spec…' },
      { t: 'ok', text: 'Scaffolding generated (1.4s)' },
      { t: 'ok', text: 'Core logic implemented' },
      { t: 'ok', text: 'All 18 unit tests passing' },
      { t: 'ok', text: 'All 6 integration tests passing' },
      { t: 'ok', text: 'Committed → feat/velocity-fraud-scoring' },
    ],
    onComplete: () => { bumpStat('statCov', '94%'); },
  },
  {
    id: 'review', label: 'Review', title: 'AI Code Review',
    agent: 'review-agent · gemini-2.0-flash', duration: 1700,
    callout: 'Independent model review — different LLM catches drift and hallucination the coder can\'t self-detect.',
    calloutClass: 'review',
    logs: [
      { t: 'info', text: 'Independent review by different LLM…' },
      { t: 'ok', text: 'Spec alignment check — PASS' },
      { t: 'ok', text: 'Security pattern check — PASS' },
      { t: 'ok', text: 'Hallucination scan — PASS' },
      { t: 'warn', text: 'Suggestion: add retry logic on ML inference timeout' },
      { t: 'ok', text: 'Review approved with 1 suggestion' },
    ],
    onComplete: () => bumpStat('statSpec', '98%'),
  },
  {
    id: 'security', label: 'Security', title: 'Security Scan (SAST)',
    agent: 'checkmarx · semgrep', duration: 1500,
    logs: [
      { t: 'info', text: 'Running static analysis & dependency scan…' },
      { t: 'ok', text: 'OWASP Top 10 — PASS' },
      { t: 'ok', text: 'PCI-DSS data handling — PASS' },
      { t: 'ok', text: 'Secrets scan — PASS' },
      { t: 'ok', text: 'Dependency vulnerabilities — PASS' },
      { t: 'ok', text: 'Security gate: CLEARED' },
    ],
    onComplete: () => bumpStat('statSec', '0 critical'),
  },
  {
    id: 'ci', label: 'CI', title: 'Continuous Integration',
    agent: 'jenkins · artifactory', duration: 1800,
    logs: [
      { t: 'info', text: 'Building venture-x-auth-service…' },
      { t: 'ok', text: 'Build: SUCCESS' },
      { t: 'ok', text: 'All tests run — 28/28 PASS' },
      { t: 'ok', text: 'Code coverage: 94%' },
      { t: 'ok', text: 'Artifacts pushed to registry' },
      { t: 'ok', text: 'Deployed to QA environment' },
    ],
  },
  {
    id: 'qa', label: 'QA', title: 'Agentic QA Testing',
    agent: 'qa-agent · claude-haiku-4-5', duration: 2200,
    callout: 'QA agent exercises the deployed service end-to-end — no human kickoff required.',
    logs: [
      { t: 'info', text: 'Running smoke + load + fraud replay…' },
      { t: 'ok', text: 'Smoke tests passed' },
      { t: 'ok', text: 'Load test: 2,400 auth/sec — p99 = 38ms' },
      { t: 'ok', text: 'Fraud scenario replay: 500 cases' },
      { t: 'ok', text: 'False positive rate: 0.3% (threshold 1%)' },
      { t: 'ok', text: 'Rollback test: PASS' },
      { t: 'ok', text: 'QA gate: CLEARED' },
    ],
  },
  {
    id: 'human', label: 'Human', title: 'Human-in-the-Loop',
    agent: 'engineer · sign-off required', duration: 0, gate: true,
    callout: 'The engineer is the fail-safe, not the bottleneck. Approve on evidence: tests, QA, spec alignment.',
    logs: [
      { t: 'meta', text: '⏸ Pipeline paused — awaiting engineer sign-off' },
      { t: 'info', text: 'Evidence package ready: 28/28 tests · 94% coverage · 98% spec alignment · 0 security issues' },
    ],
  },
  {
    id: 'prod', label: 'Prod', title: 'Production Deploy',
    agent: 'canary · datadog · feature-flag', duration: 2000,
    final: true,
    logs: [
      { t: 'info', text: 'Initiating canary rollout…' },
      { t: 'ok', text: 'Compliance gates: PASS' },
      { t: 'ok', text: 'Canary deploy: 5% traffic — LIVE' },
      { t: 'ok', text: 'Monitoring: Datadog alerts ARMED' },
      { t: 'ok', text: 'Rollback trigger: ARMED' },
      { t: 'ok', text: 'Feature flag: venture-x-velocity-fraud = ON' },
    ],
  },
];

// ---------- State ----------
let runIndex = -1;
let timers = [];
let startTs = 0;
let elapsedTimer = null;
let awaitingHuman = false;
let onHumanApprove = null;

// ---------- DOM ----------
const $ = (id) => document.getElementById(id);

function renderProgress() {
  const track = $('progressTrack');
  track.innerHTML = '';
  STAGES.forEach((s, i) => {
    const el = document.createElement('div');
    el.className = 'progress-dot';
    el.dataset.idx = i;
    el.innerHTML = `<span class="pd-circle"></span><span class="pd-label">${s.label}</span>`;
    track.appendChild(el);
  });
}

function renderStages() {
  const root = $('stageList');
  root.innerHTML = '';
  STAGES.forEach((s, i) => {
    const card = document.createElement('article');
    card.className = 'stage-card';
    card.id = `stage-${s.id}`;
    card.innerHTML = `
      <div class="stage-head">
        <span class="stage-num">${i + 1}</span>
        <span class="stage-title">${s.title}</span>
        <span class="stage-agent">${s.agent}</span>
        <span class="stage-status">Pending</span>
      </div>
      ${s.callout ? `<div class="stage-callout ${s.calloutClass || ''}">${s.callout}</div>` : ''}
      <div class="stage-logs" data-logs></div>
      ${s.gate ? `
        <div class="human-actions" hidden data-gate-actions>
          <button class="btn-review" type="button" data-review>Review MR</button>
          <button class="btn-approve" type="button" data-approve>Approve & Deploy</button>
        </div>
      ` : ''}
      ${s.final ? `<div class="hero-stat" hidden data-hero>
        <div><div class="big">Intent → Production in <span data-final-time>—</span></div>
        <div class="sub">Estimated traditional dev time: 3–5 days</div></div>
        <div><div class="big" style="text-align:right">98% faster</div>
        <div class="sub" style="text-align:right">Zero operational overhead</div></div>
      </div>` : ''}
    `;
    root.appendChild(card);
  });
  // Bind human-gate handlers
  document.querySelectorAll('[data-review]').forEach(b => b.addEventListener('click', openDiff));
  document.querySelectorAll('[data-approve]').forEach(b => b.addEventListener('click', () => {
    if (onHumanApprove) onHumanApprove();
  }));
}

function setStageStatus(idx, status) {
  const s = STAGES[idx];
  const card = $(`stage-${s.id}`);
  if (!card) return;
  card.classList.remove('running','complete','human-gate');
  const statusEl = card.querySelector('.stage-status');
  const dots = document.querySelectorAll('.progress-dot');
  dots.forEach(d => { if (+d.dataset.idx === idx) d.classList.remove('running','complete','human'); });
  if (status === 'running') {
    if (s.gate) { card.classList.add('human-gate'); statusEl.textContent = '⏸ Awaiting'; dots[idx].classList.add('human'); }
    else { card.classList.add('running'); statusEl.textContent = 'Running'; dots[idx].classList.add('running'); }
  } else if (status === 'complete') {
    card.classList.add('complete'); statusEl.textContent = 'Complete'; dots[idx].classList.add('complete');
  } else {
    statusEl.textContent = 'Pending';
  }
}

function pushStageLog(idx, line) {
  const s = STAGES[idx];
  const logBox = $(`stage-${s.id}`).querySelector('[data-logs]');
  const el = document.createElement('span');
  el.className = `log-line ${line.t}`;
  el.textContent = line.text;
  logBox.appendChild(el);
  pushGlobalLog(line, s.label);
}

function pushGlobalLog(line, source) {
  const stream = $('logStream');
  const ts = new Date();
  const hh = String(ts.getHours()).padStart(2,'0');
  const mm = String(ts.getMinutes()).padStart(2,'0');
  const ss = String(ts.getSeconds()).padStart(2,'0');
  const el = document.createElement('span');
  el.className = `lg ${line.t === 'meta' ? 'info' : line.t}`;
  el.innerHTML = `<time>${hh}:${mm}:${ss}</time>[${source}] ${line.text}`;
  stream.appendChild(el);
  stream.scrollTop = stream.scrollHeight;
}

function bumpStat(id, val) { $(id).textContent = val; }

function clearTimers() {
  timers.forEach(t => clearTimeout(t));
  timers = [];
  if (elapsedTimer) { clearInterval(elapsedTimer); elapsedTimer = null; }
}

function startElapsed() {
  startTs = Date.now();
  elapsedTimer = setInterval(() => {
    const e = Math.floor((Date.now() - startTs)/1000);
    const mm = String(Math.floor(e/60)).padStart(2,'0');
    const ss = String(e%60).padStart(2,'0');
    bumpStat('statTime', `${mm}:${ss}`);
  }, 250);
}

function stopElapsed() {
  if (elapsedTimer) clearInterval(elapsedTimer);
  elapsedTimer = null;
}

function runStage(i) {
  if (i >= STAGES.length) return;
  runIndex = i;
  const s = STAGES[i];
  setStageStatus(i, 'running');

  if (s.gate) {
    s.logs.forEach((ln, j) => {
      const tm = setTimeout(() => pushStageLog(i, ln), 250 + j*240);
      timers.push(tm);
    });
    const gateActions = $(`stage-${s.id}`).querySelector('[data-gate-actions]');
    const tm = setTimeout(() => { gateActions.hidden = false; awaitingHuman = true; }, 250 + s.logs.length*240 + 200);
    timers.push(tm);
    onHumanApprove = () => {
      if (!awaitingHuman) return;
      awaitingHuman = false;
      gateActions.hidden = true;
      pushStageLog(i, { t: 'ok', text: 'Engineer approved — proceeding to production' });
      setStageStatus(i, 'complete');
      const t2 = setTimeout(() => runStage(i+1), 500);
      timers.push(t2);
    };
    return;
  }

  const perLine = s.duration / Math.max(s.logs.length, 1);
  s.logs.forEach((ln, j) => {
    const tm = setTimeout(() => pushStageLog(i, ln), 200 + j*perLine);
    timers.push(tm);
  });
  const doneAt = 220 + s.logs.length * perLine + 250;
  const tm = setTimeout(() => {
    setStageStatus(i, 'complete');
    if (s.onComplete) s.onComplete();
    if (s.final) {
      stopElapsed();
      const total = ((Date.now() - startTs)/1000);
      // Inflate the displayed time so it feels real
      const mins = 4, secs = 12;
      const heroEl = $(`stage-${s.id}`).querySelector('[data-hero]');
      heroEl.hidden = false;
      heroEl.querySelector('[data-final-time]').textContent = `${mins}m ${String(secs).padStart(2,'0')}s`;
      pushGlobalLog({ t: 'ok', text: `Pipeline complete in ${Math.floor(total)}s (simulated 4m 12s)` }, 'IBE');
      return;
    }
    runStage(i+1);
  }, doneAt);
  timers.push(tm);
}

function launch() {
  reset(false);
  $('intentParsed').hidden = false;
  $('btnLaunch').disabled = true;
  $('btnLaunch').textContent = 'Pipeline running…';
  pushGlobalLog({ t: 'info', text: 'IBE pipeline initiated' }, 'IBE');
  startElapsed();
  runStage(0);
}

function reset(clearIntent = true) {
  clearTimers();
  awaitingHuman = false;
  onHumanApprove = null;
  bumpStat('statTests', '0 ✓ / 0 ✗');
  bumpStat('statCov', '—');
  bumpStat('statSec', '—');
  bumpStat('statSpec', '—');
  bumpStat('statTime', '00:00');
  $('logStream').innerHTML = '';
  $('intentParsed').hidden = true;
  $('btnLaunch').disabled = false;
  $('btnLaunch').textContent = 'Launch IBE →';
  renderProgress();
  renderStages();
  if (clearIntent) {
    $('intentInput').value = 'Add real-time velocity fraud scoring to Venture X card authorizations using ML inference on transaction sequences.';
  }
}

function openDiff() {
  const dlg = $('diffDialog');
  if (typeof dlg.showModal === 'function') dlg.showModal();
  else dlg.setAttribute('open','');
}
function closeDiff() {
  const dlg = $('diffDialog');
  if (typeof dlg.close === 'function') dlg.close();
  else dlg.removeAttribute('open');
}

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', () => {
  renderProgress();
  renderStages();
  $('btnLaunch').addEventListener('click', launch);
  $('btnReset').addEventListener('click', () => reset(true));
  $('btnCloseDiff').addEventListener('click', closeDiff);
});
