function getAttributeValue(apple, field = applesState.sortField) {
    if (field === 'name' || field === 'rating') return `${apple.rating} / 10`;
    if (field === 'dateDocumented') return apple.dateDocumented;
    return apple[field];
}

function getAppleCardClasses(apple) {
    const classes = ['apple-row'];

    if (apple.rating === 10) classes.push('is-perfect');
    if (apple.rating === 1) classes.push('is-one');
    if (apple.sweetness === 'Incredibly sweet') classes.push('is-max-sweetness');
    if (apple.sourness === 'Very sour') classes.push('is-max-sourness');

    return classes.join(' ');
}

function matchesSearch(apple) {
    if (!applesState.query) return true;

    const name = apple.name.toLowerCase();
    const attribute = String(getAttributeValue(apple)).toLowerCase();
    return name.includes(applesState.query) || attribute.includes(applesState.query);
}

function renderAppleRows(apples) {
    return apples.map((apple, index) => `
        <article class="${getAppleCardClasses(apple)}" style="animation-delay: ${Math.min(index * 18, 260)}ms">
            <div class="apple-image-frame">
                <img class="apple-image" src="./ApplePictures/AllApples/${apple.id}.jpg" alt="${apple.name}" loading="lazy">
            </div>
            <div class="apple-name">
                <a href="./apple_pages/${apple.id}.html"><strong>${apple.name}</strong></a>
                <span class="stars" aria-label="Rating not displayed"><span aria-hidden="true">☆ ☆ ☆ ☆ ☆</span></span>
            </div>
            <div class="attribute-panel"><div class="attribute-value">${getAttributeValue(apple)}</div></div>
        </article>
    `).join('');
}

function renderEmptyState(hasResults) {
    const elements = window.applePageElements || {
        emptyState: document.getElementById('empty-state')
    };

    if (elements.emptyState) {
        elements.emptyState.hidden = hasResults;
    }
}

function renderSortState() {
    const elements = window.applePageElements || {
        sortDirection: document.getElementById('sort-direction'),
        sortField: document.getElementById('sort-field')
    };

    if (elements.sortField) {
        elements.sortField.value = applesState.sortField;
    }

    if (elements.sortDirection) {
        elements.sortDirection.classList.toggle('is-descending', !applesState.ascending);
        elements.sortDirection.setAttribute(
            'aria-label',
            `Sort ${applesState.ascending ? 'descending' : 'ascending'} by ${sortLabels[applesState.sortField]}`
        );
    }
}

function renderApplePage() {
    const elements = window.applePageElements || {
        rows: document.getElementById('apple-rows')
    };

    const filteredApples = applesState.apples
        .filter(matchesSearch)
        .sort((first, second) => compareApples(first, second));

    if (elements.rows) {
        elements.rows.innerHTML = renderAppleRows(filteredApples);
    }

    renderEmptyState(filteredApples.length !== 0);
    renderSortState();
}
