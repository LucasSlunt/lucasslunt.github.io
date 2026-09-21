const applePageElements = {
    rows: document.getElementById('apple-rows'),
    search: document.getElementById('apple-search'),
    sortField: document.getElementById('sort-field'),
    sortDirection: document.getElementById('sort-direction'),
    emptyState: document.getElementById('empty-state')
};

window.applePageElements = applePageElements;

async function loadApples() {
    try {
        const response = await fetch('./data/apples.json');
        if (!response.ok) throw new Error(`Could not load apple data (${response.status})`);

        applesState.apples = await response.json();
        renderApplePage();
    } catch (error) {
        if (applePageElements.rows) {
            applePageElements.rows.innerHTML = '<p class="empty-state">The apple records could not be loaded.</p>';
        }
        console.error(error);
    }
}

function initApplePage() {
    const elements = applePageElements;
    if (!elements.rows || !elements.search || !elements.sortField || !elements.sortDirection || !elements.emptyState) {
        return;
    }

    window.applePageElements = elements;
    restoreSortPreference();
    renderSortState();

    elements.search.addEventListener('input', event => {
        setQuery(event.target.value);
        renderApplePage();
    });

    elements.sortField.addEventListener('change', event => {
        applesState.sortField = event.target.value;
        saveSortPreference();
        renderApplePage();
    });

    elements.sortDirection.addEventListener('click', () => {
        applesState.ascending = !applesState.ascending;
        saveSortPreference();
        renderApplePage();
    });

    loadApples();
}

window.initApplePage = initApplePage;

document.addEventListener('DOMContentLoaded', () => {
    if (document.body && document.body.dataset.page === 'apple-index') {
        initApplePage();
    }
});
