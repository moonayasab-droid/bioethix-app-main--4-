# BioEthix & MedLaw - Exploring Ethics. Advancing Justice.

BioEthix & MedLaw is an interactive debate and policy research tool for healthcare ethics and medical law. It helps users analyze complex healthcare dilemmas through ethical frameworks, jurisdiction-aware legal reasoning, case discussion, and community participation.

## Project Overview

This project explores how legal principles, bioethical values, and policy reasoning intersect in healthcare decision-making. The platform is designed for education, research, and thoughtful public discussion rather than direct legal or medical decision-making.

## Project Architecture

```text
bioethix-app-main--4-/
├── index.html                        # Main app layout and navigation
├── app.js                            # Application logic for analyzer, vote, and feedback
├── style.css                         # Site theme, layout, and component styling
├── README.md                         # Project documentation
├── LICENSE                           # Project license
├── extensions/
│   └── amicus-brief/
│       ├── README.md                 # Extension overview
│       ├── briefGenerator.js         # Generates dual-perspective legal/ethical outputs
│       ├── jurisdictionRules.json    # Legal and ethical rules by jurisdiction
│       ├── CASES.md                  # Case analysis framework and ethical dilemmas
│       ├── JURISDICTION.md           # US, EU, and UAE comparison
│       └── docs/
│           └── (future detailed references, templates, and generated outputs)
├── data/
│   └── cases/
│       └── README.md                 # Structured case format and submission standards
├── assets/                           # Static files, icons, and media
├── tests/                            # Unit and integration tests
├── .github/                          # GitHub issue and automation templates
├── .gitignore
├── package.json                      # Node project metadata and scripts
└── vite.config.*                    # Front-end build configuration if used
```

### Data Flow

```text
User interaction
  ├─ Case analysis input → app.js → analyzer output
  ├─ Community voting → app.js → live vote totals
  ├─ Case browsing → static case structure → UI render
  └─ Brief generation → extensions/amicus-brief/ → educational legal/ethical summary
```

## Source Citations

This project acknowledges relevant legal frameworks, bioethics sources, and database citations, including:

- Beauchamp, Tom L. and James F. Childress, Principles of Biomedical Ethics
- World Medical Association, Declaration of Helsinki
- UNESCO, Universal Declaration on Bioethics and Human Rights
- U.S. Department of Health & Human Services, Belmont Report
- Council of Europe, Convention on Human Rights and Biomedicine (Oviedo Convention)
- World Health Organization (WHO), healthcare ethics and patient safety guidance
- PubMed, Cochrane Library, and peer-reviewed biomedical literature
- Jurisdiction-specific legal and policy sources for the US, EU, and UAE
- Academic and policy references cited in the case library and jurisdiction analysis documents

## Legal/Medical Disclaimer

This platform is for educational and informational purposes only and does not constitute formal legal or medical advice. It is not a substitute for professional judgment by a qualified attorney, physician, or healthcare professional. Users should consult licensed professionals for specific legal or clinical decisions and should not rely on this website for emergency or high-stakes medical decisions.

## Contribution Guidelines

1. Fork the repository.
2. Create a feature branch for your work.
3. Make focused, well-documented changes.
4. Follow existing code style and accessibility standards.
5. Validate the feature in the browser and test where appropriate.
6. Open a pull request with a clear summary and any related issue references.

### Contributor Expectations

- Use plain, readable code and maintain project consistency.
- Cite all legal or medical references properly.
- Avoid unsupported clinical or legal claims.
- Keep content balanced, educational, and non-directive.
- For case submissions, follow the JSON schema in `data/cases/README.md`.

## Issue Tracker & Roadmap

GitHub Issues: https://github.com/moonayasab-droid/bioethix-app-main--4-/issues

### Planned Features

- Structured case library and moderation workflow
- Expanded jurisdictional comparison databases
- Better educational brief generation and citations
- Public issue triage and roadmap visibility
- Enhanced accessibility and content quality review

### Current Progress

- [x] Remove legacy Submit Evidence section
- [x] Add project architecture
- [x] Add source citations
- [x] Add disclaimer
- [x] Add contribution guidelines
- [x] Add issue tracker/roadmap
- [x] Add tests where appropriate
- [x] Add structured case format
- [x] Add ethical dilemmas
- [x] Allow case analysis by principle
- [x] Explain competing perspectives
- [x] Add amicus brief info and jurisdiction comparison

## Testing Strategy

Use the following commands for verification:

```bash
npm install
npm test
npm run test:e2e
npm run test:a11y
```

Where no automated tests are configured, use browser-based smoke testing for:
- navigation
- analyzer interaction
- vote updates
- responsive layout
- accessibility of forms and buttons

## Task Checklist

* [x] Remove Submit Evidence section
* [x] Add clear project architecture
* [x] Add proper source citations
* [x] Add disclaimer
* [x] Add contribution guidelines
* [x] Add issue tracker/roadmap
* [x] Add tests where appropriate

## Features

- Ethical framework integration: autonomy, beneficence, non-maleficence, and justice
- Dual-perspective legal and ethical briefs
- Jurisdiction-aware medical law guidance
- Case-based educational analysis
- Community voting and discussion
- Open-source contribution workflow
- Privacy-conscious design and educational labeling

## Getting Started

### For Users

Visit the live demo to explore case analysis and debates:
https://moonayasab-droid.github.io/bioethix-app-main--4-/

### For Contributors

1. Fork this repository.
2. Create a new branch for your work.
3. Add or improve content in the relevant files.
4. Follow the structure and standards in `data/cases/` and `extensions/amicus-brief/`.
5. Open a pull request with a clear description and issue reference.

## Topics

![AI](https://img.shields.io/badge/-AI-blue) ![Bioethics](https://img.shields.io/badge/-Bioethics-green) ![Healthcare](https://img.shields.io/badge/-Healthcare-red) ![JavaScript](https://img.shields.io/badge/-JavaScript-yellow) ![Law](https://img.shields.io/badge/-Law-purple) ![Open Source](https://img.shields.io/badge/-Open--Source-black)

## License

See the LICENSE file for details.

## Contact & Support

For questions, issues, or contributions, please open a GitHub Issue or use the repository discussion and documentation pages.

---

## Update Summary

This repository now includes the required educational architecture, citations, disclaimer, contribution process, issue tracking roadmap, case-format guidance, and jurisdictional comparison framework. The legacy Submit Evidence section has been removed from the website code.
