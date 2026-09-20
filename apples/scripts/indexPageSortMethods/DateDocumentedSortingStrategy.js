class DateDocumentedSortingStrategy {
    compare(first, second) {
        return Number(first.id) - Number(second.id);
    }
}