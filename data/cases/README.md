# Case Library Format & Guidelines

## Structured Case Format

Each case should be submitted as a JSON file in this directory following this structure:

```json
{
  "id": "case-001",
  "title": "Case Title",
  "summary": "Brief one-sentence summary",
  "dateSubmitted": "2024-10-01",
  "jurisdiction": ["US", "EU", "UAE"],
  "keywords": ["autonomy", "beneficence", "pediatrics"],
  "facts": {
    "background": "Detailed case background and context",
    "clinicalSituation": "What is happening medically",
    "legalContext": "What legal issues are at play",
    "stakeholders": [
      {
        "name": "Patient / Subject",
        "role": "Individual whose care/rights are at issue",
        "perspective": "Their interests and concerns"
      },
      {
        "name": "Healthcare Provider / Institution",
        "role": "Doctor, hospital, or clinical team",
        "perspective": "Their obligations and concerns"
      },
      {
        "name": "Family / Guardian",
        "role": "Decision-maker if patient cannot decide",
        "perspective": "Their role and responsibilities"
      },
      {
        "name": "State / Legal Authority",
        "role": "Regulatory or enforcement body",
        "perspective": "Public policy and legal compliance"
      }
    ]
  },
  "ethicalDilemmas": [
    {
      "principle": "Autonomy",
      "description": "How does patient decision-making authority apply?",
      "conflict": "Conflict with other principles or constraints",
      "relevantFramework": "Informed consent, capacity assessment"
    },
    {
      "principle": "Beneficence",
      "description": "What would maximize patient benefit?",
      "conflict": "Trade-offs with other ethical duties",
      "relevantFramework": "Best interest standard, duty of care"
    },
    {
      "principle": "Non-maleficence",
      "description": "What harms must be avoided or minimized?",
      "conflict": "Tensions with providing necessary treatment",
      "relevantFramework": "Risk-benefit analysis, do no harm"
    },
    {
      "principle": "Justice",
      "description": "What is fair or equitable in this situation?",
      "conflict": "Resource allocation or access disparities",
      "relevantFramework": "Fair distribution, equal access"
    }
  ],
  "competingPerspectives": {
    "patientPerspective": "What the patient or their advocate would prioritize",
    "providerPerspective": "What the healthcare team believes is best",
    "familyPerspective": "What the family or guardian prefers",
    "statePerspective": "What the law or public policy requires",
    "resolutionPathways": "Possible ways forward that respect or balance these views"
  },
  "jurisdictionalAnalysis": {
    "US": {
      "applicableLaw": "Federal statute, state law, case precedent",
      "legalPrinciple": "How U.S. law addresses this issue",
      "citations": ["42 U.S.C. § 1983", "Cruzan v. Director, Missouri Department of Health"],
      "versionDate": "2024-10-01"
    },
    "EU": {
      "applicableLaw": "EU Directive, Member State law",
      "legalPrinciple": "How EU law addresses this issue",
      "citations": ["EU Charter of Fundamental Rights Article 3", "GDPR"],
      "versionDate": "2024-10-01"
    },
    "UAE": {
      "applicableLaw": "UAE Federal Law, Emirates-specific law",
      "legalPrinciple": "How UAE law addresses this issue",
      "citations": ["UAE Federal Law No. 4 of 2016"],
      "versionDate": "2024-10-01"
    }
  },
  "sources": [
    {
      "type": "academic",
      "title": "Full Title of Source",
      "authors": ["Author One", "Author Two"],
      "publisher": "Journal or Publisher Name",
      "year": 2024,
      "url": "https://example.com",
      "accessDate": "2024-10-01"
    }
  ],
  "disclaimer": "This case is provided for educational purposes and does not constitute legal or medical advice. Consult qualified professionals for actual decisions.",
  "moderationStatus": "pending",
  "moderationNotes": "Any reviewer feedback or approval status"
}
```

## Submission Guidelines

1. Accuracy: All facts must be verifiable or clearly marked as hypothetical.
2. Balance: Present competing perspectives fairly without advocating for a particular outcome.
3. Citations: Include academic, legal, and policy sources for all claims.
4. Relevance: Cases should raise genuine ethical or legal questions in healthcare.
5. Sensitivity: Redact patient identifiers and avoid gratuitous personal details.
6. Format: Follow the JSON structure exactly for consistency and automated parsing.

## Moderation Criteria

Cases are accepted when they:
- [ ] Follow the structured format
- [ ] Contain verifiable or clearly hypothetical facts
- [ ] Present balanced perspectives
- [ ] Include proper citations
- [ ] Avoid unsourced medical or legal claims
- [ ] Are relevant to healthcare ethics and/or medical law
- [ ] Protect patient privacy
- [ ] Include a clear disclaimer

## Open-Source Contributions

Contributors are welcome to:
1. Fork this repo
2. Add a new case JSON file in `data/cases/`
3. Open a pull request with the case and sources
4. Respond to reviewer feedback
5. Once approved, the case appears on the platform

For questions, open a GitHub Issue or contact the maintainers.
