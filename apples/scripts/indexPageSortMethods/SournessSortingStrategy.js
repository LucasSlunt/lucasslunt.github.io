class SournessSortingStrategy {
    rankGroups = [
        ['Very sour'],
        ['Sour', 'Quite tart', 'Quite sour'],
        ['Tart'],
        ['Spritely'],
        ['Slightly sour', 'Slightly tart'],
        ['Barely sour', 'Barely tart', 'Mildly sour', 'Mildly tart'],
        ['Not sour']
    ];

    compare(first, second) {
        return this.rank(first.sourness) - this.rank(second.sourness);
    }

    rank(value) {
        return this.rankGroups.findIndex(group => group.includes(value));
    }
}