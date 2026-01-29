
import os
import difflib

target_dir = r"c:\Users\Admin\.gemini\antigravity\scratch\carl_jung_project\JUNG_ARCHIVE_FINAL"
source_files = [f"vn_{i:02d}" for i in range(1, 9)] # vn_01 to vn_08 (prefix match)

print("Checking for duplication between vn_XX files and the rest of the archive...")

# Read source content (the new files)
sources = {}
for filename in os.listdir(target_dir):
    for prefix in source_files:
        if filename.startswith(prefix) and filename.endswith(".md"):
            with open(os.path.join(target_dir, filename), 'r', encoding='utf-8', errors='ignore') as f:
                sources[filename] = f.read()

# Compare against other files
duplicates = []
for filename in os.listdir(target_dir):
    if filename not in sources and filename.endswith(".md"):
        filepath = os.path.join(target_dir, filename)
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        # Simple check: Does a significant chunk of source exist in target?
        # We check topic coverage.
        
        for src_name, src_content in sources.items():
            # Check title similarity or exact large substring match
            # This is a heuristic.
            
            # 1. Check if file is small and contained entirely in source (Legacy file?)
            if len(content) < len(src_content) and len(content) > 500:
                s = difflib.SequenceMatcher(None, src_content, content)
                match = s.find_longest_match(0, len(src_content), 0, len(content))
                if match.size > 200: # 200 chars exact match is suspicious
                    duplicates.append(f"POTENTIAL DUPLICATE: '{filename}' might be inside '{src_name}' (Match len: {match.size})")
            
            # 2. Check overlap in general topics (Title checks)
            # (Skipped for code simplicity, manual review better for semantic titles)

print(f"Scanned {len(sources)} source files against {len(os.listdir(target_dir)) - len(sources)} archive files.")
if not duplicates:
    print("No exact text copy-paste duplicates found.")
else:
    for d in duplicates:
        print(d)
