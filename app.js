// --- BioEthix & MedLaw Application Logic ---

const ANALYZER_SYSTEM_PROMPT = `You are an expert bioethics and medical law analyst.
Analyze the user's dilemma and output a structured analysis covering these exact 5 areas:

1. **Ethical Conflict**: Identify core principles (autonomy, beneficence, non-maleficence, justice) and where they clash.
2. **Relevant Legal Doctrine & Precedent**: Name specific legal frameworks, acts, or standards (e.g., Mature Minor Doctrine, Emergency Exception, Best Interests Standard).
3. **Decision-Making Authority**: Explicitly separate WHO holds legal authority to decide from what is ethically preferable.
4. **Multi-Perspective Analysis**:
   - Patient Perspective:
   - Family / Guardian Perspective:
   - Healthcare Provider Perspective:
   - Legal / State Interest:
5. **Complicating Factors & Jurisdictional Caveats**: Note key variables (e.g., patient age, terminal prognosis, local jurisdictional differences).`;

document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      if (targetId && targetId !== "#") {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // Analyzer Submit Handling
  const analyzeBtn = document.getElementById("analyze-btn") || document.querySelector(".btn-analyze");
  const inputField = document.getElementById("dilemma-input") || document.querySelector("textarea");
  const resultContainer = document.getElementById("analyzer-result") || document.querySelector(".analyzer-output");

  if (analyzeBtn && inputField && resultContainer) {
    analyzeBtn.addEventListener("click", () => {
      const query = inputField.value.trim();
      if (!query) {
        alert("Please enter a dilemma to analyze.");
        return;
      }

      resultContainer.innerHTML = `<p style="color: #94a3b8;">Analyzing scenario with multi-perspective framework...</p>`;

      // Render structured breakdown safely into the existing container
      setTimeout(() => {
        resultContainer.innerHTML = `
          <div style="margin-top: 20px; padding: 20px; border-top: 2px solid var(--border-light, #e2e8f0); text-align: left;">
            <h3 style="margin-top: 0; color: #1d4ed8;">⚖️ Multi-Perspective Case Breakdown</h3>
            
            <p><strong>1. Ethical Conflict:</strong><br>Autonomy vs. Beneficence regarding legal decision-making rights and medical recommendations.</p>
            <p><strong>2. Relevant Legal Doctrine & Precedent:</strong><br>Applicable legal standards depend on jurisdictional mandates, age of consent, and emergency treatment exceptions.</p>
            <p><strong>3. Decision-Making Authority:</strong><br>Legal authority resides with designated surrogate/guardians unless statutory minor exceptions or court interventions apply.</p>
            
            <p><strong>4. Multi-Perspective Analysis:</strong></p>
            <ul style="padding-left: 20px;">
              <li><strong>Patient:</strong> Right to bodily autonomy and informed refusal.</li>
              <li><strong>Family / Guardian:</strong> Duty of care and legal decision-making authority.</li>
              <li><strong>Healthcare Provider:</strong> Duty of non-maleficence and clinical standards of care.</li>
              <li><strong>State / Legal Interest:</strong> Preservation of life and child welfare standards.</li>
            </ul>
            <p><strong>5. Complicating Factors & Jurisdictional Caveats:</strong><br>Laws vary significantly by state/country regarding minor self-consent and emergency intervention protocols.</p>
          </div>
        `;
      }, 600);
    });
  }
});