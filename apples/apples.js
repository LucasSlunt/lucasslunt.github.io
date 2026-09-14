const sortLabels = { name: 'name', rating: 'rating', dateDocumented: 'date documented' };
const state = { apples: [], query: '', sortField: 'name', ascending: true };
const elements = {
    rows: document.getElementById('apple-rows'),
    search: document.getElementById('apple-search'),
    sortField: document.getElementById('sort-field'),
    sortDirection: document.getElementById('sort-direction'),
    emptyState: document.getElementById('empty-state')
};

function formatDate(dateText) {
    const date = new Date(dateText);
    if (Number.isNaN(date.getTime())) return dateText;
    return date.toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' });
}

function compareApples(first, second) {
    let result;
    if (state.sortField === 'rating') result = Number(first.rating) - Number(second.rating);
    else if (state.sortField === 'dateDocumented') result = new Date(first.dateDocumented) - new Date(second.dateDocumented);
    else result = first.name.localeCompare(second.name, undefined, { sensitivity: 'base' });
    return state.ascending ? result : -result;
}

function getAttributeValue(apple) {
    if (state.sortField === 'rating') return `${apple.rating} / 10`;
    if (state.sortField === 'dateDocumented') return formatDate(apple.dateDocumented);
    return apple.name;
}

function render() {
    const filteredApples = state.apples.filter(apple => apple.name.toLowerCase().includes(state.query)).sort(compareApples);
    elements.rows.innerHTML = filteredApples.map((apple, index) => `
        <article class="apple-row" style="animation-delay: ${Math.min(index * 18, 260)}ms">
            <div class="apple-image-frame">
                <img class="apple-image" src="./ApplePictures/AllApples/${apple.id}.jpg" alt="${apple.name}" loading="lazy">
            </div>
            <div class="apple-name">
                <strong>${apple.name}</strong>
                <span class="stars" aria-label="Rating not displayed"><span aria-hidden="true">☆ ☆ ☆ ☆ ☆</span></span>
            </div>
            <div class="attribute-panel"><div class="attribute-value">${getAttributeValue(apple)}</div></div>
        </article>
    `).join('');
    elements.emptyState.hidden = filteredApples.length !== 0;
    elements.sortDirection.classList.toggle('is-descending', !state.ascending);
    elements.sortDirection.setAttribute('aria-label', `Sort ${state.ascending ? 'descending' : 'ascending'}`);
}

async function loadApples() {
    try {
        const response = await fetch('./apples.json');
        if (!response.ok) throw new Error(`Could not load apple data (${response.status})`);
        state.apples = await response.json();
        render();
    } catch (error) {
        elements.rows.innerHTML = '<p class="empty-state">The apple records could not be loaded.</p>';
        console.error(error);
    }
}

elements.search.addEventListener('input', event => { state.query = event.target.value.trim().toLowerCase(); render(); });
elements.sortField.addEventListener('change', event => { state.sortField = event.target.value; render(); });
elements.sortDirection.addEventListener('click', () => { state.ascending = !state.ascending; render(); });
loadApples();