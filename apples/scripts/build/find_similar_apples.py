"""Find two nearby apples with different strongest differentiating factors."""

import json
from pathlib import Path

from vectorize import VECTOR_FIELDS


def _differentiating_factor(first_vector, second_vector):
    return max(
        VECTOR_FIELDS,
        key=lambda field: abs(first_vector[field] - second_vector[field]),
    )


def find_similar_apples(apples, vectors, similarity_matrix):
    recommendations = {}
    apple_ids = [str(apple["id"]) for apple in apples]

    for apple_id in apple_ids:
        candidates = sorted(
            (
                (similarity_matrix[apple_id][candidate_id], candidate_id)
                for candidate_id in apple_ids
                if candidate_id != apple_id
            ),
            key=lambda item: (item[0], apple_ids.index(item[1])),
        )
        selected = []
        factors = set()
        for _, candidate_id in candidates:
            factor = _differentiating_factor(vectors[apple_id], vectors[candidate_id])
            if factor in factors:
                continue
            selected.append({"id": int(candidate_id), "differentiating_factor": factor})
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