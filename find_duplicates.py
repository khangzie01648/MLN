import os
import hashlib
from collections import defaultdict
import difflib

TARGET_DIR = "JUNG_ARCHIVE_FINAL"

def get_file_hash(filepath):
    """Calculates MD5 hash of file content."""
    hasher = hashlib.md5()
    with open(filepath, 'rb') as f:
        buf = f.read()
        hasher.update(buf)
    return hasher.hexdigest()

def find_duplicates(directory):
    if not os.path.exists(directory):
        print(f"Directory {directory} not found.")
        return

    files = [f for f in os.listdir(directory) if f.endswith(".md") or f.endswith(".MD")]
    
    # 1. Exact Content Duplicates
    hashes = defaultdict(list)
    print("--- Scanning for Exact Content Duplicates ---")
    for filename in files:
        path = os.path.join(directory, filename)
        file_hash = get_file_hash(path)
        hashes[file_hash].append(filename)
    
    exact_dupes_found = False
    for file_hash, filenames in hashes.items():
        if len(filenames) > 1:
            exact_dupes_found = True
            print(f"\n[!] Exact content match detected ({len(filenames)} files):")
            for f in filenames:
                print(f"  - {f}")
    
    if not exact_dupes_found:
        print("No exact content duplicates found.")

    # 2. Name Similarity (Potential Versioning)
    print("\n--- Scanning for Similar Filenames (Potential Versions) ---")
    # Sort files to put similar names close together
    files.sort()
    
    seen = set()
    possible_versions = []
    
    for i in range(len(files)):
        for j in range(i + 1, len(files)):
            f1 = files[i]
            f2 = files[j]
            
            # Simple heuristic: if one name is contained in another, or they share a long prefix
            # Remove extension for comparison
            n1 = f1.rsplit('.', 1)[0]
            n2 = f2.rsplit('.', 1)[0]
            
            # Calculate similarity ratio
            ratio = difflib.SequenceMatcher(None, n1, n2).ratio()
            
            if ratio > 0.8: # High similarity trigger
                possible_versions.append((f1, f2, ratio))

    if possible_versions:
        # Group by the base file (f1) to clean up output
        reported = set()
        for f1, f2, ratio in possible_versions:
            pair_key = tuple(sorted((f1, f2)))
            if pair_key not in reported:
                print(f"  - Similarity {ratio:.2f}: '{f1}' vs '{f2}'")
                reported.add(pair_key)
    else:
        print("No suspiciously similar filenames found.")

find_duplicates(TARGET_DIR)
