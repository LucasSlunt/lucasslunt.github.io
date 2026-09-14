class SweetnessSortingStrategy {
    ranks = ['Incredibly sweet', 'Very sweet', 'Sweet', 'Fairly sweet', 'Mildly sweet', 'Barely sweet', 'Not sweet'];

    compare(first, second) {
        return this.ranks.indexOf(first.sweetness) - this.ranks.indexOf(second.sweetness);
    }
}