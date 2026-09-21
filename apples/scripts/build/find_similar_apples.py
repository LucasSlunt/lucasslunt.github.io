"""Find two nearby apples with different strongest differentiating factors."""

import json
import random
from pathlib import Path

from vectorize import VECTOR_FIELDS


COMPARISON_WORDS = {
    "sweetness": ("sweeter", "less sweet"),
    "sourness": ("more sour", "less sour"),
    "juiciness": ("juicier", "less juicy"),
    "texture": ("crunchier", "softer"),
    "size": ("larger", "smaller"),
}


def _differentiating_factor(first_vector, second_vector):
    return max(
        VECTOR_FIELDS,
        key=lambda field: abs(first_vector[field] - second_vector[field]),
    )


def _comparison(first_vector, second_vector, factor):
    if factor == "very similar":
        return "is very similar"
    if second_vector[factor] > first_vector[factor]:
        return f"is {COMPARISON_WORDS[factor][0]}"
    return f"is {COMPARISON_WORDS[factor][1]}"


def find_similar_apples(apples, vectors, similarity_matrix):
    recommendations = {}
    apple_ids = [str(apple["id"]) for apple in apples]
    apples_by_id = {str(apple["id"]): apple for apple in apples}

    for apple_id in apple_ids:
        candidates = [
            (similarity_matrix[apple_id][candidate_id], candidate_id)
            for candidate_id in apple_ids
            if candidate_id != apple_id
        ]
        random.shuffle(candidates)
        candidates.sort(key=lambda item: item[0])
        selected = []
        factors = set()
        for _, candidate_id in candidates:
            if similarity_matrix[apple_id][candidate_id] == 0:
                factor = "very similar"
            else:
                factor = _differentiating_factor(vectors[apple_id], vectors[candidate_id])
            if factor in factors:
                continue
            selected.append(
                {
                    "id": int(candidate_id),
                    "name": apples_by_id[candidate_id]["name"],
                    "differentiating_factor": factor,
                    "comparison": _comparison(vectors[apple_id], vectors[candidate_id], factor),
                }
            )
            factors.add(factor)
            if len(selected) == 2:
                break

        if len(selected) < 2:
            raise ValueError(f"Could not find two unique differentiating factors for apple {apple_id}")
        recommendations[apple_id] = selected

    return recommendations


def write_recommendations(apples, vectors, similarity_matrix, output_file: Path):
    recommendations = find_similar_apples(apples, vectors, similarity_matrix)
    output_file.write_text(json.dumps(recommendations, indent=2) + "\n", encoding="utf-8")