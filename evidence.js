// --- Crowdsourced evidence submission ---
(() => {
  const STORAGE_KEY = 'genderPricingEvidence';

  const readEntries = () => {
    try {
      const entries = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(entries) ? entries : [];
    } catch (error) {
      console.error('Unable to read local evidence:', error);
      return [];
    }
  };

  const renderEntries = () => {
    const tableBody = document.getElementById('evidence-table-body');
    if (!tableBody) return;

    tableBody.replaceChildren();
    readEntries().forEach((entry) => {
      const row = document.createElement('tr');
      [entry.product, `${entry.priceA} / ${entry.priceB}`, entry.quantity,
        String(entry.equivalence.length)].forEach((value) => {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.appendChild(cell);
      });
      tableBody.appendChild(row);
    });
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

      const data = new FormData(form);
      const entry = {
        product: String(data.get('product') || '').trim(),
        priceA: String(data.get('priceA') || '').trim(),
        priceB: String(data.get('priceB') || '').trim(),
        quantity: String(data.get('quantity') || '').trim(),
        detailsA: String(data.get('detailsA') || '').trim(),
        detailsB: String(data.get('detailsB') || '').trim(),
        equivalence: data.getAll('equivalence'),
        submittedAt: new Date().toISOString()
      };

      if (data.get('_gotcha')) return;
      if (!form.checkValidity()) {
        form.reportValidity();
        status.textContent = 'Please complete all required fields.';
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
      submitButton.textContent = 'Submitting...';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' }
        });
        if (!response.ok) throw new Error(`Backend returned ${response.status}`);

        status.textContent = 'Evidence saved locally and submitted successfully.';
        form.reset();
      } catch (error) {
        console.error('Cloud submission failed:', error);
        status.textContent = 'Saved locally, but cloud submission failed. Please try again later.';
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Submit Evidence';
      }
    });
  });
})();
