"""Calculate the pairwise Euclidean distance matrix for apple vectors."""

import math
import json
from pathlib import Path

from vectorize import VECTOR_FIELDS, vectorize_apples


def calculate_similarity_matrix(apples, vectors=None):
    if vectors is None:
        vectors = vectorize_apples(apples)

    apple_ids = [str(apple["id"]) for apple in apples]
    matrix = {apple_id: {} for apple_id in apple_ids}
    for row_index, first_id in enumerate(apple_ids):
        for column_index in range(row_index, len(apple_ids)):
            second_id = apple_ids[column_index]
            distance = math.sqrt(
                sum(
                    (vectors[first_id][field] - vectors[second_id][field]) ** 2
                    for field in VECTOR_FIELDS
                )
            )
            matrix[first_id][second_id] = distance
            matrix[second_id][first_id] = distance
    return matrix


def write_similarity_matrix(apples, output_file: Path, vectors=None):
    matrix = calculate_similarity_matrix(apples, vectors)
    output_file.write_text(json.dumps(matrix, indent=2) + "\n", encoding="utf-8")