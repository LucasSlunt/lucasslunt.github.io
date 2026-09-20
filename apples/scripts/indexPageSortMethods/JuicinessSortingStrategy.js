class JuicinessSortingStrategy {
    rankGroups = [
        ['Ridiculously juicy'],
        ['Very juicy'],
        ['Juicy', 'Watery'],
        ['Moderate'],
        ['Fairly juicy'],
        ['Slightly dry'],
        ['Dry'],
        ['Very dry']
    ];

    compare(first, second) {
        return this.rank(first.juiciness) - this.rank(second.juiciness);
    }

    rank(value) {
        return this.rankGroups.findIndex(group => group.includes(value));
    }
}