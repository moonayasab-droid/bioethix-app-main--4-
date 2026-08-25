// Add or update the prompt definition at the top of app.js
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

// Use this helper inside your existing submission event listener to display the result safely
function displayDetailedAnalysis(resultContainer, analysis) {
  resultContainer.innerHTML = `
    <div style="margin-top: 20px; padding: 20px; border-top: 2px solid var(--border-light, #e2e8f0);">
      <h3 style="margin-top: 0;">⚖️ Multi-Perspective Case Breakdown</h3>
      
      <p><strong>1. Ethical Conflict:</strong><br>${analysis.ethicalConflict}</p>
      <p><strong>2. Relevant Legal Doctrine & Precedent:</strong><br>${analysis.legalDoctrine}</p>
      <p><strong>3. Decision-Making Authority:</strong><br>${analysis.decisionAuthority}</p>
      
      <p><strong>4. Multi-Perspective Analysis:</strong></p>
      <ul>
        <li><strong>Patient:</strong> ${analysis.perspectives.patient}</li>
        <li><strong>Family / Guardian:</strong> ${analysis.perspectives.family}</li>
        <li><strong>Healthcare Provider:</strong> ${analysis.perspectives.provider}</li>
         </ul>

      <p><strong>5. Complicating Factors & Jurisdictional Caveats:</strong><br>${analysis.caveats}</p>
    </div>
  `;
}


