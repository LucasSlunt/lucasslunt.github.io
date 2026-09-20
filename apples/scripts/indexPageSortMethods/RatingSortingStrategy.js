class RatingSortingStrategy {
    compare(first, second) {
        const ratingDifference = Number(first.rating) - Number(second.rating);
        if (ratingDifference !== 0) return ratingDifference;
        return Number(first.id) - Number(second.id);
    }
}