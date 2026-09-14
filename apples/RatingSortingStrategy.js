class RatingSortingStrategy {
    compare(first, second) {
        return Number(first.rating) - Number(second.rating);
    }
}