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

function getSortStrategy(field) {
    return sortingStrategies[field] || sortingStrategies.rating;
}

function compareApples(first, second, field = applesState.sortField, ascending = applesState.ascending) {
    const strategy = getSortStrategy(field);
    if (field === 'parents') {
        return strategy.compare(first, second, ascending);
    }

    const result = strategy.compare(first, second);
    return ascending ? result : -result;
}
