My personal website. Acts as a portfolio for my programming projects, and a place to find my apples page.
Domain is lucasslunt.com

## Building apple pages

The individual apple pages are generated from `apples/data/apples.json` with Jinja2.
Install the build dependency and run the build from the repository root before deploying:

```text
python -m pip install -r apples/scripts/build/requirements.txt
python apples/scripts/build/build.py
```

This creates one page per apple in `apples/apple_pages/`. The build validates that every record has the fields used by the template and that its image exists in `apples/ApplePictures/AllApples`.
