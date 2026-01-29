import os

ARCHIVE_DIR = r"c:\Users\Admin\.gemini\antigravity\scratch\carl_jung_project\JUNG_ARCHIVE_FINAL"

# Map prefixes to Human Readable Categories
CATEGORY_MAP = {
    "archive_": "The Compendium",
    "vn_": "Core Vietnamese Essentials",
    "essay_": "Essays & Perspectives",
    "biography_": "Biography Chapters",
    "topic_": "Specific Topics",
    "ebook_": "Digital Books"
}

def format_title(filename):
    # Remove extension
    name = filename.replace(".md", "")
    
    # Check prefixes
    for prefix, category in CATEGORY_MAP.items():
        if name.startswith(prefix):
            # Remove prefix for the raw title part (optional, depending on taste)
            # strictly speaking, "archive_aeterna" -> "Aeterna"
            raw_name = name[len(prefix):]
            return raw_name.replace("_", " ").title(), category
    
    return name.replace("_", " ").title(), "General"

def inject_metadata(filepath, filename):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Skip if already has frontmatter (starts with ---)
    if content.strip().startswith("---"):
        print(f"[SKIP] {filename} (Already has Frontmatter)")
        return False

    title, category = format_title(filename)
    
    # Custom Overrides for famous files
    if "archive_abraxas_edition" in filename:
        title = "The Abraxas Edition"
        description = "A deep esoteric exploration of the Seven Sermons and the Pleroma."
    elif "vn_01" in filename:
        title = "Tiểu Sử Cuộc Đời (Biography)"
        description = "Chi tiết về cuộc đời, gia đình và những biến cố của Carl Jung."
    else:
        description = f"Documents regarding {title} in the Jungian archive."

    frontmatter = f"""---
title: "{title}"
description: "{description}"
category: "{category}"
tags: ["jung", "archive", "{category.lower().split()[0]}"]
---

"""
    new_content = frontmatter + content
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)
    
    print(f"[INJECT] {filename} -> Title: {title}")
    return True

def main():
    count = 0
    for filename in os.listdir(ARCHIVE_DIR):
        if filename.endswith(".md"):
            filepath = os.path.join(ARCHIVE_DIR, filename)
            if inject_metadata(filepath, filename):
                count += 1
    
    print(f"\nTotal files processed: {count}")

if __name__ == "__main__":
    main()
