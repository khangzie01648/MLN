
import os
import difflib
from itertools import combinations

target_dir = r"c:\Users\Admin\.gemini\antigravity\scratch\carl_jung_project\JUNG_ARCHIVE_FINAL"

print("Scanning for INTERNAL duplicates (All-to-All) in JUNG_ARCHIVE_FINAL...")

files = {}
file_sizes = {}

# 1. Load all files
for f in os.listdir(target_dir):
    if f.endswith(".md"):
        path = os.path.join(target_dir, f)
        try:
            with open(path, 'r', encoding='utf-8', errors='ignore') as file:
                content = file.read()
                files[f] = content
                file_sizes[f] = len(content)
        except Exception as e:
            print(f"Error reading {f}: {e}")

print(f"Loaded {len(files)} files.")

# 2. Compare pairs
# We prioritize comparing files with similar names or sizes
suspicious_pairs = []

filenames = sorted(list(files.keys()))

# Strategy: Check name similarity first to reduce O(N^2) complexity
# If distinct filenames have identical content, that's a big red flag.
for f1, f2 in combinations(filenames, 2):
    # Skip extremely different sizes (if one is 10% of the other, likely not a dupe, or just a subset)
    s1 = file_sizes[f1]
    s2 = file_sizes[f2]
    
    if s1 == 0 or s2 == 0: continue
    
    ratio = min(s1, s2) / max(s1, s2)
    
    # If size is similar (>70%), check content similarity
    if ratio > 0.7:
        # Quick check: First 100 chars
        if files[f1][:100] == files[f2][:100]:
            # Deeper check
            similarity = difflib.SequenceMatcher(None, files[f1], files[f2]).ratio()
            if similarity > 0.8:
                suspicious_pairs.append((f1, f2, similarity, "High Content Overlap"))
        
        # Name check: "archive_aeterna.md" vs "archive_aeterna_final.md"
        elif f1.split('_')[1] == f2.split('_')[1]:
             # Same topic, check similarity
             similarity = difflib.SequenceMatcher(None, files[f1], files[f2]).ratio()
             if similarity > 0.6:
                 suspicious_pairs.append((f1, f2, similarity, "Similar Name & Content"))

# 3. Report
print("\n--- DUPLICATION REPORT ---")
seen = set()
for f1, f2, score, reason in sorted(suspicious_pairs, key=lambda x: x[2], reverse=True):
    if (f1, f2) not in seen:
        print(f"MATCH {score*100:.1f}%: '{f1}' vs '{f2}'")
        print(f"   -> Reason: {reason}")
        print(f"   -> Sizes: {len(files[f1])} vs {len(files[f2])}")
        
        # Auto-recommend
        keep = f1 if len(files[f1]) >= len(files[f2]) else f2
        drop = f2 if keep == f1 else f1
        if "final" in keep and "final" not in drop: pass
        elif "final" in drop and "final" not in keep: keep, drop = drop, keep
        
        print(f"   -> RECOMMENDATION: Keep '{keep}', Delete '{drop}'")
        seen.add((f1, f2))

if not suspicious_pairs:
    print("No significant internal duplicates found.")
