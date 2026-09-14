class ParentsSortingStrategy {
    compare(first, second) {
        return first.parents.localeCompare(second.parents, undefined, { sensitivity: 'base' });
    }
}