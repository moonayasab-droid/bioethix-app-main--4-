# BioEthix & MedLaw - Exploring Ethics. Advancing Justice.

BioEthix & MedLaw is an interactive debate and policy research tool for healthcare ethics and medical law. It helps users analyze complex healthcare dilemmas through structured ethical frameworks, legal reasoning, and public discussion.

## Project Architecture

```text
bioethix-app-main--4-/
├── index.html                      # Main application shell and navigation
├── app.js                          # Core client-side logic for analyzer, voting, feedback
├── style.css                       # Visual design, layout, and responsive behavior
├── README.md                       # Project overview, roadmap, and developer docs
├── LICENSE                         # Open-source licensing terms
├── components/                     # Reusable UI blocks and widgets
├── pages/                          # Page-level views and sections
├── utils/                          # Shared helper functions and data utilities
├── assets/                         # Images, icons, fonts, and static media
├── tests/                          # Unit and integration tests
├── extensions/
│   └── amicus-brief/
│       ├── briefGenerator.js      # Generates dual-perspective legal/ethical outputs
│       ├── jurisdictionRules.json  # Jurisdictional and ethical rule data
│       ├── submissionForm.html     # Optional static issue-generation form
│       └── README.md               # Extension-specific documentation
├── data/
│   └── cases/                      # Case library and structured examples
├── .github/                        # CI and repository automation
└── docs/                           # Supporting project documentation
```

### Data Flow

```text
User interaction
  ├─ Input / analyzer request → app.js → analysis view
  ├─ Vote interaction → app.js → vote totals and UI update
  ├─ Search and case browsing → page data and UI state
  └─ Brief generation → extensions/amicus-brief/ → rendered legal/ethical summary
```

## Source Citations

This project draws on established bioethics and legal sources, including:

- Beauchamp, Tom L. and James F. Childress, Principles of Biomedical Ethics.
- World Medical Association, Declaration of Helsinki.
- UNESCO, Universal Declaration on Bioethics and Human Rights.
- U.S. Department of Health & Human Services, Belmont Report and HIPAA guidance.
- Council of Europe, Bioethics Convention and related legal standards.
- PubMed, Cochrane Library, SSRN, and Google Scholar as research sources.
- Jurisdiction-specific standards and policy references for US, EU, and UAE contexts.

## Legal/Medical Disclaimer

This platform is for educational and informational purposes only and does not constitute formal legal or medical advice. It is not a substitute for professional judgment by a qualified attorney, physician, or healthcare professional. Users should consult relevant professionals for specific legal or clinical decisions and should not rely on this website for urgent or emergency matters.

## Contribution Guidelines

1. Fork the repository.
2. Create a feature branch.
3. Make focused changes in the relevant files.
4. Follow existing code style and keep the project accessible and readable.
5. Validate behavior in a browser and test where appropriate.
6. Open a pull request with a clear summary and links to any related issues.

## Issue Tracker & Roadmap

- GitHub Issues: https://github.com/moonayasab-droid/bioethix-app-main--4-/issues
- Planned work includes expanding the case library, improving accessibility, adding automated testing, and broadening jurisdiction coverage.

## Testing Strategy

Use browser-level smoke testing for navigation, analyzer behavior, vote logic, and responsive layout. Where automated tooling is configured, use:

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

