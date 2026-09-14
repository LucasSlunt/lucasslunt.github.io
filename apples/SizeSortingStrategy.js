class SizeSortingStrategy {
    ranks = ['Humungous', 'Softball', 'Baseball', 'Fist', 'Golf ball', 'Toonie'];

    compare(first, second) {
        return this.rank(first.size) - this.rank(second.size);
    }

    rank(value) {
        const normalizedValue = value.toLowerCase();
        const rank = this.ranks.findIndex(item => normalizedValue === item.toLowerCase() || normalizedValue.startsWith(`${item.toLowerCase()},`));
        return rank === -1 ? this.ranks.length : rank;
    }
}