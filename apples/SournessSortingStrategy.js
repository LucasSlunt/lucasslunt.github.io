class SournessSortingStrategy {
    ranks = ['Very sour', 'Sour', 'Quite tart', 'Quite sour', 'Tart', 'Spritely', 'Slightly sour', 'Slightly tart', 'Barely sour', 'Barely tart', 'Mildly sour', 'Mildly tart', 'Not sour'];

    compare(first, second) {
        return this.ranks.indexOf(first.sourness) - this.ranks.indexOf(second.sourness);
    }
}