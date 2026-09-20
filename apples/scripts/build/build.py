"""Generate one static detail page for every apple in data/apples.json."""

import argparse
import json
from pathlib import Path

from jinja2 import Environment, FileSystemLoader, StrictUndefined, select_autoescape


APPLE_DIR = Path(__file__).resolve().parents[2]
DATA_FILE = APPLE_DIR / "data" / "apples.json"
DESCRIPTION_FILE = APPLE_DIR / "data" / "appleDescriptionsLong.json"
TEMPLATE_DIR = APPLE_DIR / "templates"
DEFAULT_OUTPUT_DIR = APPLE_DIR / "apple_pages"
REQUIRED_FIELDS = {
    "id",
    "name",
    "acquiredFrom",
    "dateDocumented",
    "rating",
    "sweetness",
    "sourness",
    "juiciness",
    "texture",
    "size",
}


def load_apples():
    with DATA_FILE.open(encoding="utf-8-sig") as data_file:
        apples = json.load(data_file)

    if not isinstance(apples, list):
        raise ValueError("apples.json must contain a list of apple records")

    for apple in apples:
        missing_fields = REQUIRED_FIELDS - apple.keys()
        if missing_fields:
            missing = ", ".join(sorted(missing_fields))
            raise ValueError(f"Apple {apple.get('id', '<unknown>')} is missing: {missing}")
        image_path = APPLE_DIR / "ApplePictures" / "AllApples" / f"{apple['id']}.jpg"
        if not image_path.is_file():
            raise FileNotFoundError(f"Missing image for apple {apple['id']}: {image_path}")

    return apples


def load_descriptions():
    with DESCRIPTION_FILE.open(encoding="utf-8-sig") as description_file:
        descriptions = json.load(description_file)

    if not isinstance(descriptions, list):
        raise ValueError("appleDescriptionsLong.json must contain a list")

    description_by_id = {}
    for item in descriptions:
        if not isinstance(item, dict) or "id" not in item or "description" not in item:
            raise ValueError("Each apple description must contain an id and description")
        if item["id"] in description_by_id:
            raise ValueError(f"Duplicate description for apple {item['id']}")
        description_by_id[item["id"]] = item["description"]

    return description_by_id


def build(output_dir):
    apples = load_apples()
    descriptions = load_descriptions()
    missing_descriptions = [apple["id"] for apple in apples if apple["id"] not in descriptions]
    if missing_descriptions:
        missing = ", ".join(str(apple_id) for apple_id in missing_descriptions)
        raise ValueError(f"Missing descriptions for apples: {missing}")

    environment = Environment(
        loader=FileSystemLoader(TEMPLATE_DIR),
        autoescape=select_autoescape(["html", "xml"]),
        undefined=StrictUndefined,
    )
    template = environment.get_template("apple.html.j2")
    output_dir.mkdir(parents=True, exist_ok=True)

    for apple in apples:
        output_file = output_dir / f"{apple['id']}.html"
        apple["description"] = descriptions[apple["id"]]
        output_file.write_text(template.render(apple=apple), encoding="utf-8")

    print(f"Generated {len(apples)} apple pages in {output_dir}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=DEFAULT_OUTPUT_DIR,
        help="Directory for generated pages (default: apples/apple_pages)",
    )
    args = parser.parse_args()
    build(args.output_dir if args.output_dir.is_absolute() else APPLE_DIR / args.output_dir)