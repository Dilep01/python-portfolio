const projects = {
  spendtrail: {
    number: '01 / 04 — SPENDTRAIL', category: 'Personal finance · Local-first application', title: 'SpendTrail',
    summary: 'A personal budgeting and expense tracker for Windows, with a React dashboard and an Android capture companion. It reserves commitments, savings, and a safety buffer before calculating everyday spending pace.',
    tags: ['Python', 'FastAPI', 'React', 'SQLite', 'Kotlin', 'Jetpack Compose', 'GitHub Actions'],
    flow: ['Capture alert', 'Encrypted queue', 'Private Wi-Fi sync', 'Human review', 'Record expense'],
    features: [
      'A Python ledger for bank, cash, wallet, and credit-card activity, with linked refunds and checks to avoid counting a purchase twice.',
      'Commitments-first budgets, spending-pace calculations, cycle history, and bank CSV preview and reconciliation.',
      'Supported SMS parsing and payment-notification capture into an encrypted Android queue. Private Wi-Fi synchronization uses TLS and requires review before a transaction is recorded.',
      'Encrypted backup and recovery, plus automated backend, React, and Android checks in GitHub Actions.'
    ],
    evidence: [['106', 'backend tests passing in recorded validation'], ['24', 'Android JVM tests passing'], ['2', 'GitHub Actions jobs passing']],
    limits: 'Single-user local release candidate. Repeated real-device and background capture testing remains pending. There is no direct bank/UPI connection or cloud sync. Automatic SMS support is limited to the supported ICICIT format; device-level reliability is not established.',
    repo: 'https://github.com/Dilep01/spendtrail'
  },
  incident: {
    number: '02 / 04 — INCIDENT COPILOT', category: 'Python full stack · Incident investigation', title: 'Enterprise Incident Investigation & Resolution Copilot',
    summary: 'A local incident-investigation workspace that collects evidence, retrieves published runbooks, and coordinates rule-based findings through LangGraph. Human review comes before remediation or manual closure.',
    tags: ['Python', 'FastAPI', 'React', 'TypeScript', 'LangGraph', 'SQLAlchemy', 'PostgreSQL', 'Redis', 'Celery', 'Docker'],
    flow: ['Collect evidence', 'Investigate', 'Review findings', 'Approve action', 'Verify recovery'],
    features: [
      'FastAPI REST APIs, React/TypeScript dashboards, evidence ingestion, relational persistence, and investigation checkpoints.',
      'Versioned keyword retrieval from runbooks, evidence citations, bounded read-only diagnostics, and Markdown investigation reports.',
      'Exact-action approvals, stale-evidence checks, and idempotent recovery against an isolated synthetic fault lab.',
      'Separate-author review for runbook publication and manual closure, with audit trails and independent lab-health verification.'
    ],
    evidence: [['79', 'backend tests passing'], ['15 / 15', 'container integration checks in the résumé'], ['10 / 10', 'synthetic regression cases passing']],
    limits: 'A local demonstration using rules and keyword search. It does not use an LLM or semantic RAG. Automated remediation is limited to the isolated synthetic fault lab. The résumé records Docker checks covering PostgreSQL, Redis, Celery, and Nginx; the older public portfolio still marks those integrations as unverified. Production incident accuracy and reliability are not established.',
    repo: 'https://github.com/Dilep01/enterprise-incident-copilot'
  },
  documind: {
    number: '03 / 04 — DOCUMIND AI', category: 'Document intelligence · Invoice automation', title: 'DocuMind AI',
    summary: 'An intelligent document-processing and invoice-review application. It extracts PDF text, applies OCR to scanned pages, and links extracted fields to source evidence so a reviewer can check and correct them.',
    tags: ['Python', 'FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'Tesseract OCR', 'Ollama', 'Docker'],
    flow: ['Upload', 'Extract / OCR', 'Review & correct', 'Approve revision', 'Export'],
    features: [
      'PDF and image uploads with durable processing jobs, retries, and preserved original documents.',
      'Source-linked invoice parsing, versioned corrections, concurrent-edit checks, and role-based access for three user roles.',
      'Current-revision approval before accounting export, with CSV and JSON output.',
      'Keyword search, optional local semantic search, and experimental cited document Q&A through Ollama without a paid API key.'
    ],
    evidence: [['12 / 12', 'correct header fields on each of 2 synthetic digital invoices'], ['57', 'backend tests passing'], ['4 + 2', 'frontend and browser tests passing']],
    limits: 'Validated locally with fictional documents and synthetic datasets. Scanned fields and tables can need correction. The two digital invoices do not establish general extraction accuracy. Local AI Q&A and prompt-injection mitigation are experimental; real-invoice accuracy and production reliability are not established.',
    repo: 'https://github.com/Dilep01/documind-ai'
  },
  retailiq: {
    number: '04 / 04 — RETAILIQ', category: 'Retail analytics · Demand forecasting & inventory planning', title: 'RetailIQ',
    summary: 'A Python/Django retail-planning application that turns validated sales data into SKU-level demand forecasts, explained replenishment proposals, and inventory-policy comparisons.',
    tags: ['Python', 'Django', 'pandas', 'scikit-learn', 'SciPy', 'SQLite', 'pytest'],
    flow: ['Validate sales', 'Backtest', 'Forecast', 'Plan inventory', 'Simulate'],
    features: [
      'Validated CSV imports, dashboards, and exports across synthetic and public sales data.',
      '28-day seasonal-naive and gradient-boosting forecasts, evaluated using chronological backtests and a separate historical holdout.',
      'Safety-stock and replenishment calculations that account for pack sizes, minimum order quantities, and integer budget allocation.',
      'Matched inventory simulations with budget and delivery-delay scenarios, plus a durable job queue and audit trail.'
    ],
    evidence: [['22,060', 'daily sales records processed across synthetic and public datasets'], ['32.2%', 'lower held-out MAE vs seasonal-naive across 20 UCI retail SKUs'], ['63', 'automated tests passing']],
    limits: 'Single-planner local application. Public-data forecast errors remain substantial. The 32.2% improvement describes a specific 20-product holdout, not general forecasting performance. Inventory outcomes are simulations with assumed costs and supplier inputs. No live procurement, savings, or stockout reduction is established.',
    repo: 'https://github.com/Dilep01/retailiq'
  }
};

const $ = (selector) => document.querySelector(selector);
const dialog = $('#project-dialog');
let dialogTrigger = null;

function makeTextElement(tag, text, className) {
  const element = document.createElement(tag);
  element.textContent = text;
  if (className) element.className = className;
  return element;
}

function openProject(key, trigger) {
  const project = projects[key];
  if (!project) return;
  dialogTrigger = trigger;
  $('#dialog-number').textContent = project.number;
  $('#dialog-category').textContent = project.category;
  $('#dialog-title').textContent = project.title;
  $('#dialog-summary').textContent = project.summary;
  $('#dialog-tags').replaceChildren(...project.tags.map(tag => makeTextElement('span', tag)));
  $('#dialog-flow').replaceChildren(...project.flow.map(step => makeTextElement('li', step)));
  $('#dialog-features').replaceChildren(...project.features.map(feature => makeTextElement('li', feature)));
  $('#dialog-evidence').replaceChildren(...project.evidence.map(([value, label]) => {
    const item = makeTextElement('div', '', 'evidence-item');
    item.append(makeTextElement('strong', value), makeTextElement('span', label));
    return item;
  }));
  $('#dialog-limit').textContent = project.limits;
  $('#dialog-repo').href = project.repo;
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add('dialog-open');
  $('.close-dialog').focus({preventScroll: true});
}

document.querySelectorAll('[data-project]').forEach(button => {
  button.addEventListener('click', () => openProject(button.dataset.project, button));
});
$('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  dialogTrigger?.focus({preventScroll: true});
});

const menuButton = $('.menu-button');
function closeMenu() {
  $('#navigation').classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
}
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Close menu' : 'Open menu');
  $('#navigation').classList.toggle('open', expanded);
});
document.querySelectorAll('#navigation a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) closeMenu();
});
window.matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let motionPaused = reducedMotion.matches;
try {
  const preference = localStorage.getItem('dilep-motion');
  if (preference !== null) motionPaused = preference === 'paused';
} catch { /* Motion controls still work when storage is unavailable. */ }
function updateMotion() {
  document.documentElement.classList.toggle('motion-paused', motionPaused);
  $('#motion-toggle').setAttribute('aria-pressed', String(motionPaused));
  $('.motion-text').textContent = motionPaused ? 'Resume motion' : 'Pause motion';
  $('.motion-icon').textContent = motionPaused ? '▷' : 'Ⅱ';
}
$('#motion-toggle').addEventListener('click', () => {
  motionPaused = !motionPaused;
  updateMotion();
  try { localStorage.setItem('dilep-motion', motionPaused ? 'paused' : 'playing'); } catch { /* Optional preference persistence. */ }
});
reducedMotion.addEventListener('change', event => {
  motionPaused = event.matches;
  updateMotion();
});
updateMotion();

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  document.documentElement.classList.add('js-ready');
}

$('.copy-email').addEventListener('click', async () => {
  const email = 'dilepdeepu001@gmail.com';
  try {
    await navigator.clipboard.writeText(email);
    $('#copy-status').textContent = 'Email copied. Say hello when you’re ready.';
  } catch {
    $('#copy-status').textContent = email;
    const range = document.createRange();
    range.selectNodeContents($('#copy-status'));
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
  }
});

function updateClock() {
  $('#local-time').textContent = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date()) + ' IST';
}
updateClock();
setInterval(updateClock, 60000);
$('#year').textContent = new Date().getFullYear();
