/* extensions/amicus-brief/briefGenerator.js
   Dual-perspective brief generator (vanilla JS module)
   Usage (browser):
     <script type="module">
       import { generateDualBrief } from './extensions/amicus-brief/briefGenerator.js';
       // fetch jurisdictionRules.json and call generateDualBrief(caseObj, rules)
     </script>

   This file is intentionally self-contained and makes no changes to existing layout or styles.
*/

export function generateDualBrief(caseObj, jurisdictionRules) {
  const j = jurisdictionRules[caseObj.jurisdiction] || jurisdictionRules['US'];
  const frameworks = ['autonomy','beneficence','nonmaleficence','justice'];

  function detectIssues(facts) {
    const issues = [];
    const ftext = (facts||[]).join(' ').toLowerCase();
    if (ftext.includes('consent')) issues.push('informed consent');
    if (ftext.includes('privacy') || ftext.includes('data')) issues.push('data privacy');
    if (ftext.includes('neglig') || ftext.includes('malpractice')) issues.push('medical negligence / malpractice');
    if (ftext.includes('autonomy') || ftext.includes('refus')) issues.push('patient autonomy / refusal of treatment');
    return issues.length ? issues : ['standard of care / liability'];
  }

  const issues = detectIssues(caseObj.facts || []);

  function summarizeBreach(issue, c) {
    const snippet = (c.facts && c.facts[0]) || c.summary || '';
    return `Facts indicate: ${snippet.slice(0,300)}`;
  }

  function buildArgument(issue, perspective) {
    // normalize key for lookup
    const key = Object.keys(j.legal_principles).find(k => k.toLowerCase().includes(issue.split(' ')[0])) || issue;
    const rule = j.legal_principles[key] || {desc: `Apply ${issue}`, weight:0.5};

    const ethical_map = frameworks.map(f => ({ principle: f, relevance: (caseObj.tags||[]).includes(f) ? 0.9 : 0.3 }));

    const application = perspective === 'plaintiff'
      ? `Argue that the defendant breached ${issue} by ${summarizeBreach(issue, caseObj)}. Emphasize ${j.common_claims && (j.common_claims[issue] || j.common_claims[key]) || 'duty, breach, causation, and damages.'}`
      : `Argue that the defendant met the standard of care or that causation/foreseeability is lacking. Emphasize mitigating facts and adherence to protocols.`;

    const likely_outcome = perspective === 'plaintiff'
      ? (rule.weight > 0.5 ? 'Favorable to plaintiff likely' : 'Outcome uncertain / depends on evidence')
      : (rule.weight <= 0.5 ? 'Favorable to defense likely' : 'Outcome uncertain / fact-specific');

    return {
      issue,
      legal_principle: rule.desc || rule,
      application,
      ethical_considerations: ethical_map,
      likely_outcome,
      confidence: Math.round((rule.weight||0.5) * 100) + '%',
      citations: (j.citation_templates && (j.citation_templates[issue] || j.citation_templates[key])) || []
    };
  }

  const plaintiffArgs = issues.map(issue => buildArgument(issue, 'plaintiff'));
  const defenseArgs = issues.map(issue => buildArgument(issue, 'defense'));

  return {
    metadata: { title: caseObj.title, jurisdiction: caseObj.jurisdiction, generated_at: new Date().toISOString() },
    plaintiff: plaintiffArgs,
    defense: defenseArgs,
    ethical_frame: frameworks.map(p => ({ principle: p, note: `Consider ${p}` })),
    raw_issues: issues
  };
}

// Small helper for demo integration in the browser (non-invasive):
export async function loadJurisdictionRules(path = './extensions/amicus-brief/jurisdictionRules.json') {
  const r = await fetch(path, {cache: 'no-store'});
  if (!r.ok) throw new Error('Failed to load jurisdiction rules: ' + r.status);
  return r.json();
}

export function renderBriefToContainer(brief, container) {
  // container: DOM element. This renderer is minimal and intentionally does not modify site styles.
  const el = (typeof container === 'string') ? document.querySelector(container) : container;
  if (!el) throw new Error('Container not found for renderBriefToContainer');
  el.innerHTML = '';

  const meta = document.createElement('div');
  meta.innerHTML = `<strong>${brief.metadata.title}</strong> — <em>${brief.metadata.jurisdiction}</em> <br/><small>generated: ${brief.metadata.generated_at}</small>`;
  el.appendChild(meta);

  const section = (title, arr) => {
    const h = document.createElement('h3');
    h.textContent = title;
    el.appendChild(h);
    arr.forEach(item => {
      const card = document.createElement('div');
      card.style.border = '1px solid #ddd';
      card.style.padding = '0.6rem';
      card.style.margin = '0.5rem 0';
      const html = [`<strong>Issue:</strong> ${item.issue}`,
                    `<strong>Legal principle:</strong> ${item.legal_principle}`,
                    `<strong>Application:</strong> ${item.application}`,
                    `<strong>Likely outcome:</strong> ${item.likely_outcome} (${item.confidence})`];
      if (item.citations && item.citations.length) html.push(`<strong>Citations:</strong> ${item.citations.join('; ')}`);
      card.innerHTML = html.join('<br/>');
      el.appendChild(card);
    });
  };

  section('Plaintiff / Patient Arguments', brief.plaintiff);
  section('Defense / Institution Arguments', brief.defense);

  const ethics = document.createElement('div');
  ethics.innerHTML = `<h4>Ethical framework</h4>${brief.ethical_frame.map(e=>`<div><strong>${e.principle}</strong>: ${e.note}</div>`).join('')}`;
  el.appendChild(ethics);
}
