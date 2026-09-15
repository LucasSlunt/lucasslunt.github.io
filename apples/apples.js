const sortLabels = {
    acquiredFrom: 'acquired from',
    name: 'name',
    rating: 'rating',
    parents: 'parents',
    dateDocumented: 'date documented',
    sweetness: 'sweetness',
    sourness: 'sourness',
    juiciness: 'juiciness',
    texture: 'texture',
    size: 'size'
};
const state = { apples: [], query: '', sortField: 'rating', ascending: false };
const sortingStrategies = {
    acquiredFrom: new AcquiredFromSortingStrategy(),
    name: new NameSortingStrategy(),
    rating: new RatingSortingStrategy(),
    parents: new ParentsSortingStrategy(),
    dateDocumented: new DateDocumentedSortingStrategy(),
    sweetness: new SweetnessSortingStrategy(),
    sourness: new SournessSortingStrategy(),
    juiciness: new JuicinessSortingStrategy(),
    texture: new TextureSortingStrategy(),
    size: new SizeSortingStrategy()
};
const elements = {
    rows: document.getElementById('apple-rows'),
    search: document.getElementById('apple-search'),
    sortField: document.getElementById('sort-field'),
    sortDirection: document.getElementById('sort-direction'),
    emptyState: document.getElementById('empty-state')
};

function compareApples(first, second) {
    const strategy = sortingStrategies[state.sortField];
    const result = strategy.compare(first, second, state.ascending);
    if (state.sortField === 'parents') return result;
    return state.ascending ? result : -result;
}

function getAttributeValue(apple) {
    if (state.sortField === 'name' || state.sortField === 'rating') return `${apple.rating} / 10`;
    if (state.sortField === 'dateDocumented') return apple.dateDocumented;
    return apple[state.sortField];
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
    elements.sortDirection.setAttribute('aria-label', `Sort ${state.ascending ? 'descending' : 'ascending'} by ${sortLabels[state.sortField]}`);
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