
import os

target_file = r"c:\Users\Admin\.gemini\antigravity\scratch\carl_jung_project\JUNG_ARCHIVE_FINAL\archive_transcendental.md"

def try_fixing(filepath):
    print(f"Processing: {filepath}")
    with open(filepath, 'r', encoding='utf-8-sig') as f:
        content = f.read()
    
    # Method 1: Latin-1 with replace
    try:
        latin1_fixed = content.encode('latin1').decode('utf-8', errors='replace')
        print("Latin-1 (replace): SUCCESS")
        print(f"Snippet: {latin1_fixed[:200]}")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(latin1_fixed)
        print("Saved Latin-1 version.")
        return
    except Exception as e:
        print(f"Latin-1 failed: {e}")

try_fixing(target_file)
