class JuicinessSortingStrategy {
    ranks = ['Ridiculously juicy', 'Very juicy', 'Juicy', 'Watery', 'Moderate', 'Fairly juicy', 'Slightly dry', 'Dry', 'Very dry'];

    compare(first, second) {
        return this.ranks.indexOf(first.juiciness) - this.ranks.indexOf(second.juiciness);
    }
}