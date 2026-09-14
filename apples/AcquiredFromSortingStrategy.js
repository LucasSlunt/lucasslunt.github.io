class AcquiredFromSortingStrategy {
    compare(first, second) {
        return first.acquiredFrom.localeCompare(second.acquiredFrom, undefined, { sensitivity: 'base' });
    }
}