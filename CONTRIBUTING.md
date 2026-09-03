# Contributing to Bioethix

Thank you for your interest in contributing educational case studies and improvements to Bioethix.

Guidelines for submitting case studies
- Redact all personal health identifiers (PHI) before submitting. Examples of PHI: full names, addresses, dates of birth, medical record numbers, exact dates tied to an individual, and other identifiers.
- Use the submission form at `extensions/amicus-brief/submissionForm.html` (or open a new issue and use the `submission:peer-review` label).
- Provide a one-paragraph summary, anonymized facts, jurisdiction, and optional references.

Triage & review process (recommended)
- New submissions should be labeled `submission:peer-review` and triaged by maintainers.
- If PHI remains, add the label `submission:needs-redaction` and request redaction from the submitter.
- Accepted submissions should be added as structured JSON under `data/cases/` and summarized in a PR.

Legal & privacy
- This project is for educational purposes and does not provide legal advice. Add a visible disclaimer on pages that generate legal analysis.
- If you intend to collect case data at scale or store PII, add GDPR/HIPAA-compliant storage and explicit consent flows.

Code of conduct
- By contributing, you agree to follow the project's Code of Conduct (consider adding CODE_OF_CONDUCT.md).
