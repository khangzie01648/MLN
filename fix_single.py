
import os

target_file = r"c:\Users\Admin\.gemini\antigravity\scratch\carl_jung_project\JUNG_ARCHIVE_FINAL\archive_transcendental.md"

def try_fixing(filepath):
    print(f"Processing: {filepath}")
    with open(filepath, 'r', encoding='utf-8-sig') as f:
        content = f.read()
    
    print(f"Read {len(content)} chars.")
    
    # Method 1: Latin-1
    try:
        latin1_fixed = content.encode('latin1').decode('utf-8')
        print("Latin-1: SUCCESS")
        print(f"Snippet: {latin1_fixed[:100]}")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(latin1_fixed)
        print("Saved Latin-1 version.")
        return
    except Exception as e:
        print(f"Latin-1 failed: {e}")

    # Method 2: CP1252
    try:
        cp1252_fixed = content.encode('cp1252').decode('utf-8')
        print("CP1252: SUCCESS")
        print(f"Snippet: {cp1252_fixed[:100]}")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(cp1252_fixed)
        print("Saved CP1252 version.")
        return
    except Exception as e:
        print(f"CP1252 failed: {e}")

try_fixing(target_file)
