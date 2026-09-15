class ParentsSortingStrategy {
    compare(first, second, ascending = true) {
        const firstIsUnknown = first.parents === 'Unknown';
        const secondIsUnknown = second.parents === 'Unknown';
        if (firstIsUnknown !== secondIsUnknown) return firstIsUnknown ? 1 : -1;

        const result = first.parents.localeCompare(second.parents, undefined, { sensitivity: 'base' });
        return ascending ? result : -result;
    }
}