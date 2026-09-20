"""Convert categorical apple attributes into normalized vectors."""

from pathlib import Path


ATTRIBUTE_GROUPS = {
    "sweetness": [
        ["Not sweet"],
        ["Mildly sweet", "Barely sweet"],
        ["Fairly sweet"],
        ["Sweet"],
        ["Very sweet"],
        ["Incredibly sweet"],
    ],
    "sourness": [
        ["Not sour"],
        ["Barely sour", "Barely tart", "Mildly sour", "Mildly tart"],
        ["Slightly sour", "Slightly tart"],
        ["Spritely"],
        ["Tart"],
        ["Sour", "Quite tart", "Quite sour"],
        ["Very sour"],
    ],
    "juiciness": [
        ["Very dry"],
        ["Dry"],
        ["Slightly dry"],
        ["Fairly juicy"],
        ["Moderate"],
        ["Juicy", "Watery"],
        ["Very juicy"],
        ["Ridiculously juicy"],
    ],
    "texture": [
        ["Muddy", "Rubbery"],
        ["Mealy"],
        ["Very soft"],
        ["Soft"],
        ["Fairly soft"],
        ["Fairly crisp", "Slightly crisp"],
        ["Crisp"],
        ["Very crisp", "Hard"],
        ["Crunchy", "Dense"],
        ["Very crunchy"],
    ],
    "size": [
        ["Toonie"],
        ["Golf ball"],
        ["Fist"],
        ["Baseball"],
        ["Softball"],
        ["Humungous"],
    ],
}

VECTOR_FIELDS = tuple(ATTRIBUTE_GROUPS)


def _matches(value, option):
    normalized_value = value.strip().lower()
    normalized_option = option.lower()
    return normalized_value == normalized_option or normalized_value.startswith(f"{normalized_option},")


def _rank(value, groups, apple_id, field):
    for rank, group in enumerate(groups):
        if any(_matches(value, option) for option in group):
            return rank
    raise ValueError(f"Unknown {field} value {value!r} for apple {apple_id}")


def vectorize_apples(apples):
    vectors = {}
    for apple in apples:
        vector = {}
        for field, groups in ATTRIBUTE_GROUPS.items():
            rank = _rank(apple[field], groups, apple["id"], field)
            vector[field] = rank / (len(groups) - 1)
        vectors[str(apple["id"])] = vector
    return vectors


def write_vectors(apples, output_file: Path):
    import json

    output_file.write_text(json.dumps(vectorize_apples(apples), indent=2) + "\n", encoding="utf-8")