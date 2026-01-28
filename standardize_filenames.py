import os
import re

TARGET_DIR = "JUNG_ARCHIVE_FINAL"

# Ensure we are in the right directory
if not os.path.exists(TARGET_DIR):
    print(f"Directory {TARGET_DIR} not found.")
    exit()

files = [f for f in os.listdir(TARGET_DIR) if f.endswith(".md") or f.endswith(".MD")]

def clean_name(name):
    original_name = name
    name = name.lower()
    name = name.replace(".md", "")
    
    # Category: VN Core (01_...)
    if re.match(r"^\d{2}_", name):
        return f"vn_{name}.md"
    
    # Category: Biography (chapter_...)
    if name.startswith("chapter_"):
        return name.replace("chapter_", "biography_chapter_") + ".md"
    
    # Category: Archive (JUNG_ARCHIVE_, FINAL_EBOOK_, JUNG_)
    if name.startswith("jung_archive_"):
        new_name = name.replace("jung_archive_", "archive_")
        return f"{new_name}.md"
    
    if name.startswith("final_ebook_"):
        new_name = name.replace("final_ebook_", "ebook_")
        return f"{new_name}.md"
        
    if name.startswith("jung_"):
        new_name = name.replace("jung_", "archive_")
        return f"{new_name}.md"

    # Category: Topic (remove 'the_')
    if name.startswith("the_"):
        new_name = name[4:] # Remove 'the_'
        return f"essay_{new_name}.md"
        
    # Default: Add 'essay_' prefix if it doesn't have a distinct one, 
    # to separate from system files? 
    # Actually, if it's just 'biology_and_the_body.md', let's keep it or add 'topic_'.
    # Let's add 'topic_' to generic essays to group them.
    
    # List of known prefixes that are "generic"
    known_prefixes = ["biography", "archive", "ebook", "vn", "essay"]
    if not any(name.startswith(p) for p in known_prefixes):
        return f"topic_{name}.md"

    return f"{name}.md"

print(f"Processing {len(files)} files...")
count = 0
for filename in files:
    new_name = clean_name(filename)
    if new_name != filename.lower(): # Only rename if changed (case insensitive check mostly)
        src = os.path.join(TARGET_DIR, filename)
        dst = os.path.join(TARGET_DIR, new_name)
        
        # Handle collision
        if os.path.exists(dst):
            print(f"Skipping {filename} -> {new_name} (Destination exists)")
            continue
            
        try:
            os.rename(src, dst)
            print(f"Renamed: {filename} -> {new_name}")
            count += 1
        except Exception as e:
            print(f"Error renaming {filename}: {e}")

print(f"Done. Renamed {count} files.")
