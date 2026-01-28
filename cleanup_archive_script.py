
import os
import shutil

target_dir = r"c:\Users\Admin\.gemini\antigravity\scratch\carl_jung_project\JUNG_ARCHIVE_FINAL"

# Map: Target Final Name -> List of candidates (including the target name itself if it exists)
# Logic: We will pick the LARGEST file from the candidates, rename it to Target Name, and delete the rest.
clusters = {
    "archive_aeterna.md": [
        "archive_aeterna.md", "archive_aeterna_final.md", "archive_aeterna_v2.md", "archive_aeterna_v3.md"
    ],
    "archive_magnum_opus.md": [
        "archive_magnum_opus_complete.md", "archive_magnum_opus_completus.md", "archive_magnum_opus_redux.md"
    ],
    "archive_magnus_archive.md": [
        "archive_magnus_archive_final.md", "archive_magnus_archive_final_v2.md"
    ],
    "archive_omnibus.md": [
        "archive_omnibus_final_x.md", "archive_omnibus_maximus.md", "archive_omnibus_v4_ultimate.md", "archive_complete_omnibus.md"
    ],
    "archive_ultimate_compendium.md": [
        "archive_ultimate_compendium_omnis.md", "archive_ultimate_compendium_x.md"
    ],
    "ebook_jung.md": [
        "ebook_jung.md", "ebook_jung_v3_complete.md"
    ]
}

print("EXECUTING ARCHIVE CLEANUP (The Great Purge)...")

for target_name, candidates in clusters.items():
    print(f"\nProcessing Cluster: {target_name}")
    
    # 1. Identify existing files & sizes
    existing_candidates = []
    for c in candidates:
        path = os.path.join(target_dir, c)
        if os.path.exists(path):
            size = os.path.getsize(path)
            existing_candidates.append((c, size, path))
    
    if not existing_candidates:
        print("  -> No files found for this cluster.")
        continue
        
    # 2. Pick Winner (Largest)
    existing_candidates.sort(key=lambda x: x[1], reverse=True) # Sort by size desc
    winner_name, winner_size, winner_path = existing_candidates[0]
    
    print(f"  -> Detected {len(existing_candidates)} variants.")
    print(f"  -> WINNER: '{winner_name}' ({winner_size} bytes)")
    
    # 3. Execution
    target_path = os.path.join(target_dir, target_name)
    
    # Check if we need to rename or if the winner IS the target
    if winner_name == target_name:
        # The winner is already named correctly. Just delete others.
        print(f"  -> Winner is already named '{target_name}'. Keeping it.")
    else:
        # If target name exists (but is not the winner), it must be deleted first (it's in the losers list)
        pass 

    # Delete losers
    for c_name, _, c_path in existing_candidates:
        if c_name != winner_name:
            print(f"  -> DELETING Loser: '{c_name}'")
            os.remove(c_path)
    
    # Rename winner to target (if needed)
    if winner_name != target_name:
        if os.path.exists(target_path):
            # This should have been deleted above as a loser, but double check safety
            print(f"  -> Removing old '{target_name}' to make way for winner.")
            os.remove(target_path)
            
        print(f"  -> RENAMING '{winner_name}' to '{target_name}'")
        os.rename(winner_path, target_path)

print("\nCleanup Complete. The archive is now standardized.")
