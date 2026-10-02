const SORT_PREFERENCE_KEY = 'apples-sort-preference';
const applesState = {
    apples: [],
    query: '',
    sortField: 'rating',
    ascending: false
};

function restoreSortPreference() {
    try {
        const preference = JSON.parse(localStorage.getItem(SORT_PREFERENCE_KEY));
        if (preference && typeof preference.ascending === 'boolean' && sortingStrategies[preference.sortField]) {
            applesState.sortField = preference.sortField;
            applesState.ascending = preference.ascending;
        }
    } catch (error) {
        localStorage.removeItem(SORT_PREFERENCE_KEY);
    }
}

function saveSortPreference() {
    localStorage.setItem(SORT_PREFERENCE_KEY, JSON.stringify({
        sortField: applesState.sortField,
        ascending: applesState.ascending
    }));
}

function setQuery(nextQuery) {
    applesState.query = String(nextQuery || '').trim().toLowerCase();
}
