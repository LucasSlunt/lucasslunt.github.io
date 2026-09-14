class NameSortingStrategy {
    compare(first, second) {
        return first.name.localeCompare(second.name, undefined, { sensitivity: 'base' });
    }
}