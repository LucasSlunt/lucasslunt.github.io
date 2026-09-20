class SweetnessSortingStrategy {
    rankGroups = [
        ['Incredibly sweet'],
        ['Very sweet'],
        ['Sweet'],
        ['Fairly sweet'],
        ['Mildly sweet', 'Barely sweet'],
        ['Not sweet']
    ];

    compare(first, second) {
        return this.rank(first.sweetness) - this.rank(second.sweetness);
    }

    rank(value) {
        return this.rankGroups.findIndex(group => group.includes(value));
    }
}