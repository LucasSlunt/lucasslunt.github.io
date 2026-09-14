class TextureSortingStrategy {
    ranks = ['Very crunchy', 'Crunchy', 'Dense', 'Very crisp', 'Hard', 'Crisp', 'Fairly crisp', 'Slightly crisp', 'Fairly soft', 'Soft', 'Very soft', 'Mealy', 'Muddy', 'Rubbery'];

    compare(first, second) {
        return this.rank(first.texture) - this.rank(second.texture);
    }

    rank(value) {
        const normalizedValue = value.toLowerCase();
        const rank = this.ranks.findIndex(item => normalizedValue === item.toLowerCase() || normalizedValue.startsWith(`${item.toLowerCase()},`));
        return rank === -1 ? this.ranks.length : rank;
    }
}