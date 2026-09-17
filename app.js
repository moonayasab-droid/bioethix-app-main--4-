// --- BioEthix & MedLaw Application Logic ---

const ANALYZER_SYSTEM_PROMPT = `You are an expert bioethics and medical law analyst.
Analyze the user's dilemma and output a structured analysis covering these exact 5 areas:

1. **Ethical Conflict**: Identify core principles (autonomy, beneficence, non-maleficence, justice) and where they clash.
2. **Relevant Legal Doctrine & Precedent**: Name specific legal frameworks, acts, or standards.
3. **Decision-Making Authority**: Explicitly separate who holds legal authority from what is ethically preferable.
4. **Multi-Perspective Analysis**: Patient, family/guardian, healthcare provider, and legal/state perspectives.
5. **Complicating Factors & Jurisdictional Caveats**: Note key variables and jurisdictional differences.`;

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // --- Analyzer ---
  const analyzeBtn = document.getElementById("analyze-btn");
  const inputField = document.getElementById("case-input");
  const resultContainer = document.getElementById("analyzer-result");

  if (analyzeBtn) {
    analyzeBtn.addEventListener("click", () => {
      const query = inputField ? inputField.value.trim() : "";
      if (!query) {
        alert("Please enter a dilemma to analyze.");
        return;
      }
      if (resultContainer) {
        resultContainer.classList.remove("hidden");
        resultContainer.innerHTML = `
          <div style="margin-top:20px;padding:20px;border-top:2px solid var(--border-light,#e2e8f0);text-align:left;">
            <h3 style="margin-top:0;color:#1d4ed8;">⚖️ Multi-Perspective Case Breakdown</h3>
            <p><strong>1. Ethical Conflict:</strong><br>Autonomy, beneficence, non-maleficence, and justice may conflict in complex cases.</p>
            <p><strong>2. Relevant Legal Doctrine & Precedent:</strong><br>Applicable standards depend on the facts and jurisdiction.</p>
            <p><strong>3. Decision-Making Authority:</strong><br>Legal authority may differ from the ethically preferred outcome.</p>
            <p><strong>4. Multi-Perspective Analysis:</strong></p>
            <ul style="padding-left:20px;"><li>Patient perspective</li><li>Family / guardian perspective</li><li>Healthcare provider perspective</li><li>Legal / state interest</li></ul>
            <p><strong>5. Complicating Factors & Jurisdictional Caveats:</strong><br>Consider age, prognosis, consent, and local law.</p>
          </div>`;
      }
    });
  }

  // --- Community Vote ---
  const btnAgree = document.getElementById("btn-agree");
  const btnDisagree = document.getElementById("btn-disagree");
  const pctAgree = document.getElementById("pct-agree");
  const pctDisagree = document.getElementById("pct-disagree");
  const totalCountEl = document.getElementById("total-count");
  const voteFill = document.getElementById("vote-fill");

  const numberFromText = (text) => {
    const match = (text || "").match(/(\d+)/);
    return match ? Number(match[1]) : 0;
  };

  if (pctAgree && pctDisagree && totalCountEl) {
    let totalVotes = numberFromText(totalCountEl.textContent);
    let agreeCount = Math.round((numberFromText(pctAgree.textContent) / 100) * totalVotes);
    const updateVoteDisplay = () => {
      const agreePercent = totalVotes ? Math.round((agreeCount / totalVotes) * 100) : 0;
      pctAgree.textContent = `${agreePercent}%`;
      pctDisagree.textContent = `${100 - agreePercent}%`;
      if (voteFill) voteFill.style.width = `${agreePercent}%`;
      totalCountEl.textContent = `Based on ${totalVotes} votes`;
    };
    const vote = (agree) => {
      if (agree) agreeCount += 1;
      totalVotes += 1;
      updateVoteDisplay();
    };
    if (btnAgree) btnAgree.addEventListener("click", () => vote(true));
    if (btnDisagree) btnDisagree.addEventListener("click", () => vote(false));
  }

  // --- Feedback ---
  const feedbackBtn = Array.from(document.querySelectorAll(".btn-primary")).find((button) => /feedback/i.test(button.textContent || ""));
  if (feedbackBtn) {
    feedbackBtn.addEventListener("click", () => {
      const card = feedbackBtn.closest(".feature-card");
      if (!card || card.querySelector("#feedback-text")) return;
      const wrapper = document.createElement("div");
      wrapper.className = "feedback-form";
      wrapper.style.marginTop = "12px";
      wrapper.innerHTML = `<textarea id="feedback-text" rows="4" placeholder="Share your thoughts..." style="width:100%;padding:12px;border-radius:8px;"></textarea><div style="display:flex;gap:8px;margin-top:8px;"><button type="button" id="feedback-submit" class="btn btn-primary">Submit</button><button type="button" id="feedback-cancel" class="btn btn-secondary">Cancel</button></div>`;
      card.appendChild(wrapper);
      const textarea = wrapper.querySelector("#feedback-text");
      textarea.focus();
      wrapper.querySelector("#feedback-submit").addEventListener("click", () => {
        if (!textarea.value.trim()) { alert("Please enter feedback before submitting."); return; }
        wrapper.innerHTML = '<p style="color:var(--text-muted)">Thanks — your feedback has been recorded.</p>';
        setTimeout(() => wrapper.remove(), 1200);
      });
      wrapper.querySelector("#feedback-cancel").addEventListener("click", () => wrapper.remove());
    });
  }

  // --- Crowdsourced evidence submission ---
  const evidenceForm = document.getElementById("evidence-form");
  if (evidenceForm) {
    const STORAGE_KEY = "genderPricingEvidence";
    const status = document.getElementById("evidence-status");
    const tableBody = document.getElementById("evidence-table-body");
    const submitButton = evidenceForm.querySelector('button[type="submit"]');

    const readEntries = () => {
      try {
        const entries = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        return Array.isArray(entries) ? entries : [];
      } catch (error) {
        console.error("Unable to read local evidence entries:", error);
        return [];
      }
    };

    const renderEntries = () => {
      if (!tableBody) return;
      tableBody.replaceChildren();
      readEntries().forEach((entry) => {
        const row = document.createElement("tr");
        [entry.product, `${entry.priceA} / ${entry.priceB}`, entry.quantity, String((entry.equivalence || []).length)].forEach((value) => {
          const cell = document.createElement("td");
          cell.textContent = value;
          row.appendChild(cell);
        });
        tableBody.appendChild(row);
      });
    };

    renderEntries();
    evidenceForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (status) status.textContent = "";

      const formData = new FormData(evidenceForm);
      if (formData.get("_gotcha")) return;
      const entry = {
        product: String(formData.get("product") || "").trim(),
        priceA: String(formData.get("priceA") || "").trim(),
        priceB: String(formData.get("priceB") || "").trim(),
        quantity: String(formData.get("quantity") || "").trim(),
        detailsA: String(formData.get("detailsA") || "").trim(),
        detailsB: String(formData.get("detailsB") || "").trim(),
        equivalence: formData.getAll("equivalence"),
        submittedAt: new Date().toISOString()
      };

      if (!evidenceForm.checkValidity()) {
        evidenceForm.reportValidity();
        if (status) status.textContent = "Please complete all required fields.";
        return;
      }
      if (entry.equivalence.length < 2) {
        if (status) status.textContent = "Select at least two objective equivalence checks.";
        return;
      }

      const entries = readEntries();
      entries.push(entry);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
      renderEntries();

      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";
      try {
        const response = await fetch(evidenceForm.action, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" }
        });
        if (!response.ok) throw new Error(`Backend returned ${response.status}`);
        if (status) status.textContent = "Evidence saved locally and submitted successfully.";
        evidenceForm.reset();
      } catch (error) {
        console.error("Cloud evidence submission failed:", error);
        if (status) status.textContent = "Saved locally, but cloud submission failed. Please try again later.";
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Submit Evidence";
      }
    });
  }
});
