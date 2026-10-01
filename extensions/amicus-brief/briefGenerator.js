// --- Amicus Brief Generator: Dual-Perspective Legal & Ethical Analysis ---

const AMICUS_SYSTEM_PROMPT = `You are an expert bioethicist and medical law analyst.
Generate a structured, dual-perspective brief addressing both the legal and ethical dimensions of a healthcare case.
Output must be clear, balanced, and educational—not an actual legal opinion.`;

async function loadJurisdictionRules() {
  try {
    const response = await fetch('./extensions/amicus-brief/jurisdictionRules.json');
    return await response.json();
  } catch (error) {
    console.error('Failed to load jurisdiction rules:', error);
    return {};
  }
}

function generateDualBrief(caseObj, rules) {
  const { title, summary, jurisdiction, tags } = caseObj;
  const jurisdictionRules = rules[jurisdiction] || rules['US'] || {};

  const legalPerspective = generateLegalBrief(caseObj, jurisdictionRules);
  const ethicalPerspective = generateEthicalBrief(caseObj, jurisdictionRules);

  return {
    caseTitle: title,
    caseSummary: summary,
    jurisdiction,
    tags,
    generatedAt: new Date().toISOString(),
    legal: legalPerspective,
    ethical: ethicalPerspective,
    disclaimer: generateDisclaimer()
  };
}

function generateLegalBrief(caseObj, rules) {
  const { title } = caseObj;
  return {
    perspective: 'Legal & Jurisdictional Analysis',
    framework: rules.legalFramework || 'Not specified',
    applicableLaw: rules.applicableLaws || [],
    patientPathway: {
      title: 'Patient/Plaintiff Pathway',
      description: generatePatientPathway(caseObj, rules),
      relevantCases: rules.patientRelevantCases || [],
      legalPrinciples: [
        'Informed consent and autonomy',
        'Right to refuse treatment',
        'Medical malpractice standards',
        'Patient privacy and confidentiality'
      ]
    },
    institutionPathway: {
      title: 'Institution/Defense Pathway',
      description: generateInstitutionPathway(caseObj, rules),
      relevantCases: rules.institutionRelevantCases || [],
      legalPrinciples: [
        'Duty of care standards',
        'Professional judgment deference',
        'Institutional liability limits',
        'Good Samaritan protections'
      ]
    },
    keyLegalQuestions: rules.keyQuestions || []
  };
}

function generateEthicalBrief(caseObj, rules) {
  return {
    perspective: 'Ethical & Principlist Analysis',
    framework: 'Four Core Principles (Beauchamp & Childress)',
    autonomy: {
      principle: 'Autonomy (Self-Governance)',
      description: generateAutonomyAnalysis(caseObj),
      questions: [
        'Does the patient have decision-making capacity?',
        'Was informed consent obtained?',
        'Are there constraints on the patient\'s choice?'
      ]
    },
    beneficence: {
      principle: 'Beneficence (Do Good)',
      description: generateBeneficenceAnalysis(caseObj),
      questions: [
        'What action maximizes benefit to the patient?',
        'How do we define and measure benefit?',
        'Are there competing definitions of benefit?'
      ]
    },
    nonMaleficence: {
      principle: 'Non-Maleficence (Do No Harm)',
      description: generateNonMaleficenceAnalysis(caseObj),
      questions: [
        'What harms are involved in each option?',
        'How can we minimize harm?',
        'Is harm justified by the benefit?'
      ]
    },
    justice: {
      principle: 'Justice (Fair Distribution)',
      description: generateJusticeAnalysis(caseObj),
      questions: [
        'Are resources allocated fairly?',
        'Is access equitable?',
        'Are systemic inequities present?'
      ]
    }
  };
}

function generatePatientPathway(caseObj, rules) {
  return `The patient/plaintiff might argue for autonomy-based rights, informed consent protections, and damages for violations. Under ${rules.jurisdiction || 'applicable'} law, the relevant legal doctrines include: ${(rules.applicableLaws || []).join(', ') || 'specific statutory protections'}. The patient\'s strongest legal claims typically rest on breach of informed consent, negligence, or violation of statutory rights.`;
}

function generateInstitutionPathway(caseObj, rules) {
  return `The institution might argue for professional judgment deference and that actions were consistent with standard of care. Under ${rules.jurisdiction || 'applicable'} law, institutions benefit from: ${(rules.institutionDefenses || []).join(', ') || 'established legal defenses'}. The institution\'s defense typically emphasizes evidence-based practice and reasonable decision-making under uncertainty.`;
}

function generateAutonomyAnalysis(caseObj) {
  return 'Autonomy emphasizes the patient\'s right to make informed decisions according to their values and preferences. Key considerations include capacity, consent quality, and whether the patient was adequately informed.';
}

function generateBeneficenceAnalysis(caseObj) {
  return 'Beneficence focuses on maximizing benefit to the patient. However, benefit can be defined in different ways: survival, quality of life, spiritual peace, or functionality. Those priorities may conflict.';
}

function generateNonMaleficenceAnalysis(caseObj) {
  return 'Non-maleficence requires minimizing harm. All medical interventions carry risks. Key questions: Are there unavoidable harms? Can they be reduced? Is the harm justified by the expected benefit?';
}

function generateJusticeAnalysis(caseObj) {
  return 'Justice demands fair treatment and equitable access. Consider whether resource allocation is equitable, if vulnerabilities are present, and whether systemic barriers influence the case.';
}

function generateDisclaimer() {
  return `⚠️ EDUCATIONAL DISCLAIMER\n\nThis brief is generated for educational and informational purposes only. It does NOT constitute formal legal advice, medical advice, or a substitute for professional consultation. For actual decisions affecting health, rights, or policy, users must consult qualified legal counsel and healthcare professionals. Laws change frequently. Verify current legal standards with authoritative sources.`;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    loadJurisdictionRules,
    generateDualBrief
  };
}
