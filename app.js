document.addEventListener("DOMContentLoaded", () => {

// Theme Toggle
const themeBtn = document.getElementById("theme-toggle");
if (themeBtn) {
themeBtn.addEventListener("click", () => {
document.body.classList.toggle("light-theme");
});
}

// Live Filtering
const filterBtns = document.querySelectorAll(".filter-btn");
const caseCards = document.querySelectorAll(".case-card");

filterBtns.forEach(btn => {
btn.addEventListener("click", () => {
filterBtns.forEach(b => b.classList.remove("active"));
btn.classList.add("active");

const filter = btn.getAttribute("data-filter");

caseCards.forEach(card => {
if (filter === "all" || card.getAttribute("data-category") === filter) {
card.style.display = "flex";
} else {
card.style.display = "none";
}
});
});
});

// Search Bar Filter
const searchInput = document.getElementById("case-search");
if (searchInput) {
searchInput.addEventListener("input", (e) => {
const query = e.target.value.toLowerCase();
caseCards.forEach(card => {
const text = card.textContent.toLowerCase();
if (text.includes(query)) {
card.style.display = "flex";
} else {
card.style.display = "none";
}
});
});
}

// Interactive Vote Widget
const btnAgree = document.getElementById("btn-agree");
const btnDisagree = document.getElementById("btn-disagree");
const pctAgree = document.getElementById("pct-agree");
const pctDisagree = document.getElementById("pct-disagree");
const voteFill = document.getElementById("vote-fill");
const totalCount = document.getElementById("total-count");

let agreeVotes = 84;
let totalVotes = 124;

function renderVote() {
let agreePct = Math.round((agreeVotes / totalVotes) * 100);
let disagreePct = 100 - agreePct;
pctAgree.textContent = `${agreePct}%`;
pctDisagree.textContent = `${disagreePct}%`;
voteFill.style.width = `${agreePct}%`;
totalCount.textContent = `Based on ${totalVotes} votes`;
}

if (btnAgree && btnDisagree) {
btnAgree.addEventListener("click", () => {
agreeVotes++;
totalVotes++;
renderVote();
});

btnDisagree.addEventListener("click", () => {
totalVotes++;
renderVote();
});
}

// Analyzer Simulator
const analyzeBtn = document.getElementById("analyze-btn");
const caseInput = document.getElementById("case-input");
const analyzerResult = document.getElementById("analyzer-result");

if (analyzeBtn && caseInput && analyzerResult) {
analyzeBtn.addEventListener("click", () => {
const text = caseInput.value.trim();
if (!text) {
alert("Please enter a case summary first!");
return;
}

analyzerResult.classList.remove("hidden");
analyzerResult.innerHTML = `<p><i class="fa-solid fa-spinner fa-spin"></i> Analyzing case dynamics...</p>`;

setTimeout(() => {
analyzerResult.innerHTML = `
<h4>Analysis Summary</h4>
<p style="margin-top:0.5rem; font-size: 0.9rem; color: #94a3b8;">
<strong>Ethical Conflict:</strong> Autonomy vs. Beneficence<br>
<strong>Legal Considerations:</strong> Informed Consent & Liability Protocols
</p>
`;
}, 1200);
});
}

});



