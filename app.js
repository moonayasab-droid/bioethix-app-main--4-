// --- BioEthix & MedLaw Application Logic ---

const ANALYZER_SYSTEM_PROMPT = `You are an expert bioethics and medical law analyst.
Analyze the user's dilemma and output a structured analysis covering these exact 5 areas:

1. **Ethical Conflict**: Identify core principles (autonomy, beneficence, non-maleficence, justice) and where they clash.
2. **Relevant Legal Doctrine & Precedent**: Name specific legal frameworks, acts, or standards (e.g., Mature Minor Doctrine, Emergency Exception, Best Interests Standard).
3. **Decision-Making Authority**: Explicitly separate WHO holds legal authority to decide from what is ethically preferable.
4. **Multi-Perspective Analysis**n   - Patient Perspective:
   - Family / Guardian Perspective:
   - Healthcare Provider Perspective:
   - Legal / State Interest:
5. **Complicating Factors & Jurisdictional Caveats**: Note key variables (e.g., patient age, terminal prognosis, local jurisdictional differences).`;

// Defensive, consolidated event wiring for the page's interactive features.
document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // allow normal anchor behavior when it's an external hash like '#'
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) targetElement.scrollIntoView({ behavior: "smooth" });
    });
  });

  // --- Analyzer ---
  const analyzeBtn = document.getElementById("analyze-btn");
  const inputField = document.getElementById("case-input") || document.querySelector("textarea");
  const resultContainer = document.getElementById("analyzer-result");

  if (analyzeBtn) {
    analyzeBtn.addEventListener("click", () => {
      try {
        const query = (inputField && inputField.value) ? inputField.value.trim() : "";
        if (!query) {
          alert("Please enter a dilemma to analyze.");
          return;
        }

        // Ensure result container is visible (it may have the .hidden class)
        if (resultContainer) {
          resultContainer.classList.remove('hidden');
          resultContainer.innerHTML = `<p style="color: #94a3b8;">Analyzing scenario with multi-perspective framework...</p>`;
        }

        // Simulate async work / API call and render a structured breakdown
        setTimeout(() => {
          if (!resultContainer) return;
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
      } catch (err) {
        console.error('Analyzer handler error', err);
        alert('An error occurred while running the analyzer. Check console for details.');
      }
    });
  }

  // --- Community Vote ---
  const btnAgree = document.getElementById('btn-agree');
  const btnDisagree = document.getElementById('btn-disagree');
  const pctAgree = document.getElementById('pct-agree');
  const pctDisagree = document.getElementById('pct-disagree');
  const totalCountEl = document.getElementById('total-count');
  const voteFill = document.getElementById('vote-fill');

  function parseNumberFromText(text) {
    const m = (text || '').match(/(\d+)/);
    return m ? parseInt(m[1], 10) : 0;
  }

  function updateVoteDisplay(agreeCount, total) {
    const agreePct = total > 0 ? Math.round((agreeCount / total) * 100) : 0;
    const disagreePct = 100 - agreePct;
    if (pctAgree) pctAgree.textContent = agreePct + '%';
    if (pctDisagree) pctDisagree.textContent = disagreePct + '%';
    if (voteFill) voteFill.style.width = agreePct + '%';
    if (totalCountEl) totalCountEl.textContent = `Based on ${total} votes`;
  }

  if ((btnAgree || btnDisagree) && pctAgree && pctDisagree && totalCountEl) {
    // derive starting counts from displayed percentages and total
    let totalVotes = parseNumberFromText(totalCountEl.textContent) || 0;
    let agreePctStart = parseNumberFromText(pctAgree.textContent) || 0;
    // compute agree count (round to nearest integer)
    let agreeCount = Math.round((agreePctStart / 100) * totalVotes);

    const voteHandler = (isAgree) => {
      try {
        // Increment counts
        if (isAgree) agreeCount += 1;
        totalVotes += 1;
        updateVoteDisplay(agreeCount, totalVotes);
        // Optionally: send to server via fetch() here
      } catch (err) {
        console.error('Vote handler error', err);
      }
    };

    if (btnAgree) btnAgree.addEventListener('click', () => voteHandler(true));
    if (btnDisagree) btnDisagree.addEventListener('click', () => voteHandler(false));
  }

  // --- Feedback (inline reveal) ---
  const feedbackBtn = Array.from(document.querySelectorAll('.btn-primary')).find(b => /feedback/i.test(b.textContent || ''));
  if (feedbackBtn) {
    feedbackBtn.addEventListener('click', (e) => {
      try {
        // Find the nearest feature-card (the feedback card)
        const card = feedbackBtn.closest('.feature-card');
        if (!card) return;
        // If we've already added the feedback form, focus the textarea
        let existing = card.querySelector('#feedback-text');
        if (existing) { existing.focus(); return; }

        // Create a simple inline feedback form (keeps visuals unchanged; inserted into the card)
        const form = document.createElement('div');
        form.className = 'feedback-form';
        form.style.marginTop = '12px';

        form.innerHTML = `
          <textarea id="feedback-text" rows="4" placeholder="Share your thoughts..." style="width:100%; padding:12px; border-radius:8px; border:1px solid var(--card-border); background:var(--bg-color); color:var(--text-main); box-sizing:border-box;"></textarea>
          <div style="display:flex; gap:8px; margin-top:8px;">
            <button id="feedback-submit" class="btn btn-primary">Submit</button>
            <button id="feedback-cancel" class="btn btn-secondary">Cancel</button>
          </div>
        `;

        card.appendChild(form);
        const textarea = form.querySelector('#feedback-text');
        const submit = form.querySelector('#feedback-submit');
        const cancel = form.querySelector('#feedback-cancel');
        if (textarea) textarea.focus();

        submit.addEventListener('click', () => {
          const val = textarea.value.trim();
          if (!val) { alert('Please enter feedback before submitting.'); textarea.focus(); return; }
          // Here you would POST feedback to your backend. We'll simulate success.
          form.innerHTML = '<p style="color:var(--text-muted)">Thanks — your feedback has been recorded.</p>';
          setTimeout(() => {
            // keep confirmation briefly, then remove the form
            if (form && form.parentNode) form.parentNode.removeChild(form);
          }, 1200);
          console.log('User feedback submitted:', val);
        });

        cancel.addEventListener('click', () => { if (form && form.parentNode) form.parentNode.removeChild(form); });

      } catch (err) {
        console.error('Feedback form error', err);
      }
    });
  }

});