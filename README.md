# BioEthix & MedLaw - Exploring Ethics. Advancing Justice.

BioEthix & MedLaw is an interactive debate and policy research tool for healthcare ethics and medical law. It helps users analyze complex healthcare dilemmas through ethical frameworks, jurisdiction-aware legal reasoning, case discussion, and community participation.

## Project Overview

This project explores how legal principles, bioethical values, and policy reasoning intersect in healthcare decision-making. The platform is designed for education, research, and thoughtful public discussion rather than direct legal or medical decision-making.

## Project Architecture

```text
bioethix-app-main--4-/
├── index.html                        # Main app layout and navigation
├── app.js                            # Application logic for analyzer, vote, feedback
├── style.css                         # Site theme, layout, and component styling
├── README.md                         # Project documentation
├── LICENSE                           # Project license
├── extensions/
│   └── amicus-brief/
│       ├── briefGenerator.js         # Generates dual-perspective legal/ethical outputs
│       ├── jurisdictionRules.json    # Legal and ethical rule sets by jurisdiction
│       ├── submissionForm.html        # Optional static issue form
│       └── README.md                 # Extension-specific documentation
├── data/
│   └── cases/                        # Planned project case library
├── assets/                           # Static files, icons, and media
├── tests/                            # Unit and integration test suite (planned)
├── evidence.js                       # Removed: legacy evidence-local-storage logic
├── sumbit.html                       # Removed: legacy evidence submission page
└── .github/                          # Repository automation and issue templates
```

### Data Flow

```text
User Input
  │
  ├─ case text → app.js → analyzer-result
  │
  ├─ vote action → app.js → vote UI updates
  │
  └─ brief generation → extensions/amicus-brief/ → rendered ethical/legal analysis
```

## Source Citations

This project draws on established bioethics and legal sources, including:

- Beauchamp, T. L., and Childress, J. F., Principles of Biomedical Ethics.
- World Medical Association, Declaration of Helsinki.
- UNESCO, Universal Declaration on Bioethics and Human Rights.
- U.S. Department of Health & Human Services, Belmont Report and HIPAA guidance.
- Council of Europe, Bioethics Convention and related legal frameworks.
- PubMed, Cochrane Library, SSRN, and Google Scholar for evidence-based research.
- Jurisdiction-specific standards for US, EU, and UAE contexts.

## Legal and Medical Disclaimer

This platform is for educational and informational purposes only. It does not constitute formal legal advice, medical advice, diagnosis, treatment guidance, or a professional relationship with a licensed attorney or physician. Users should consult qualified professionals for specific legal or medical questions. This project is not a substitute for professional advice and should not be used for emergency or urgent decisions.

## Contribution Guidelines

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-change
   ```
3. Make focused changes using semantic HTML, accessible markup, and clear JavaScript patterns.
4. Avoid adding unverified legal or medical claims.
5. Test locally in a modern browser.
6. Commit with a clear message and open a pull request to the main branch.

## Issue Tracker & Roadmap

- GitHub Issues: https://github.com/moonayasab-droid/bioethix-app-main--4-/issues
- Planned work: expand case library, improve accessibility, add automated testing, and increase jurisdiction coverage.

## Testing Strategy

Use a browser-based smoke test for navigation, analyzer behavior, vote logic, and responsive layout. When configured, run:

```bash
npm install
npm test
npm run test:e2e
npm run test:a11y
```

## Task Checklist

* [x] Remove Submit Evidence section
* [ ] Add clear project architecture
* [ ] Add proper source citations
* [ ] Add disclaimer
* [ ] Add contribution guidelines
* [ ] Add issue tracker/roadmap
* [ ] Add tests where appropriate

## Additional Notes

The earlier "Submit Evidence" feature and its local-storage flow have been intentionally removed to keep the platform focused on ethics and legal analysis rather than product-comparison data collection.
