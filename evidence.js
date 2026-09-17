// --- Gender Pricing Transparency Engine: evidence submission ---

(() => {
  const STORAGE_KEY = 'genderPricingEvidence';
  const BACKEND_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

  const readEntries = () => {
    try {
      const entries = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(entries) ? entries : [];
    } catch (error) {
      console.error('Unable to read local evidence entries:', error);
      return [];
    }
  };

  const renderEntries = () => {
    const body = document.getElementById('evidence-table-body');
    if (!body) return;

    body.replaceChildren();
    readEntries().forEach((entry) => {
      const row = document.createElement('tr');
      [entry.product, `${entry.priceA} / ${entry.priceB}`, entry.quantity,
        entry.equivalence.length].forEach((value) => {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.appendChild(cell);
      });
      body.appendChild(row);
    });
  };

  const collectEntry = (form) => {
    const data = new FormData(form);
    return {
      product: String(data.get('product') || '').trim(),
      priceA: String(data.get('priceA') || '').trim(),
      priceB: String(data.get('priceB') || '').trim(),
      quantity: String(data.get('quantity') || '').trim(),
      detailsA: String(data.get('detailsA') || '').trim(),
      detailsB: String(data.get('detailsB') || '').trim(),
      equivalence: data.getAll('equivalence'),
      submittedAt: new Date().toISOString()
    };
  };

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('evidence-form');
    if (!form) return;

    const status = document.getElementById('evidence-status');
    const submitButton = form.querySelector('button[type="submit"]');
    renderEntries();

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      status.textContent = '';

      const entry = collectEntry(form);
      const requiredFields = [entry.product, entry.priceA, entry.priceB,
        entry.quantity, entry.detailsA, entry.detailsB];

      if (form.elements._gotcha?.value) return;
      if (requiredFields.some((value) => !value) || !form.checkValidity()) {
        status.textContent = 'Please complete all required fields.';
        form.reportValidity();
        return;
      }
      if (entry.equivalence.length < 2) {
        status.textContent = 'Select at least two objective equivalence checks.';
        return;
      }

      const entries = readEntries();
      entries.push(entry);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
      renderEntries();

      submitButton.disabled = true;
      submitButton.textContent = 'Submitting…';

      try {
        const response = await fetch(BACKEND_ENDPOINT, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (!response.ok) throw new Error(`Backend returned ${response.status}`);

        status.textContent = 'Evidence saved locally and submitted successfully.';
        form.reset();
      } catch (error) {
        console.error('Cloud evidence submission failed:', error);
        status.textContent = 'Saved locally, but cloud submission failed. Please try again later.';
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Submit Evidence';
      }
    });
  });
})();
