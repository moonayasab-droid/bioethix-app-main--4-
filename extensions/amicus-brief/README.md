# Amicus Brief Generator (extensions/amicus-brief)

This extension provides a minimal, non-invasive "amicus brief" generator for dual-perspective legal/ethical briefs and a static submission form that pre-fills a GitHub Issue for community contributions.

Key files
- briefGenerator.js — vanilla JS module that generates a structured brief and a minimal renderer.
- jurisdictionRules.json — sample rule-sets for US, EU, UAE (editable).
- submissionForm.html — a static form that opens a prefilled GitHub Issue (does not store data on the server).

Integration (no layout changes)
1. Copy the `extensions/amicus-brief` folder into your repo (it's already added on this branch).
2. Add this script to a page where you want to enable generating briefs (example uses module imports):

```html
<script type="module">
  import { loadJurisdictionRules, generateDualBrief, renderBriefToContainer } from './extensions/amicus-brief/briefGenerator.js';
  (async ()=>{
    const rules = await loadJurisdictionRules();
    const caseObj = {
      title: 'Example Case',
      summary: 'Short summary',
      facts: ['Patient did X', 'Doctor did Y'],
      jurisdiction: 'US',
      tags: ['autonomy']
    };
    const brief = generateDualBrief(caseObj, rules);
    // Render into an existing container on your page (must exist in your layout)
    renderBriefToContainer(brief, '#amicus-brief-container');
  })();
</script>
```

Notes
- This extension purposely does not alter your existing HTML/CSS. It renders into an element you provide.
- The generator is deterministic and template-based to avoid introducing external dependencies.
- For higher-quality natural-language briefs, consider adding an optional server-side LLM step with logging and auditing.

Security & privacy
- Do not accept unredacted PHI via the submission form. The form includes a prominent warning and the prefilled issue includes a checklist for maintainers.
- Add a privacy policy and data retention rules before accepting personal data.

Open-source contribution workflow
- Submissions created by the form will open as Issues with the label `submission:peer-review`.
- Use labels `submission:peer-review`, `submission:needs-redaction`, `submission:accepted` to triage.
- When accepting a case, consider creating a PR that adds a structured JSON file under `data/cases/` and a short markdown summary.

If you want, I can open a draft PR with these files and add a maintainer checklist or create GitHub Actions to automate PR creation when a submission is accepted. I preserved your layout and design — you can safely merge these files and then wire the generator into your existing UI where you want it to appear.
