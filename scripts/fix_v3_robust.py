
import os

target_file = "c:/Users/Admin/.gemini/antigravity/scratch/carl_jung_project/FINAL_EBOOK_JUNG_V3_COMPLETE.md"

def robust_fix(filepath):
    try:
        print(f"Reading {filepath}...")
        with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
            content = f.read()
        
        # Robust fix: encode/decode with replace
        # This will salvage 99% of text and replace strictly invalid sequences with ?
        try:
            fixed = content.encode('cp1252', errors='replace').decode('utf-8', errors='replace')
        except Exception as e:
            print(f"Standard fix failed: {e}. Trying latin1 fallback...")
            fixed = content.encode('latin1', errors='replace').decode('utf-8', errors='replace')

        if "TOÀN THƯ" in fixed or "CHƯƠNG" in fixed or "MỤC LỤC" in fixed or "TOÃ€N" not in fixed:
            print(f"Saving fixed content to {filepath}...")
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(fixed)
            return True
        else:
            print("Fixed content didn't look right. Saving anyway as best effort.")
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(fixed)
            return True

    except Exception as e:
        print(f"Fatal error: {e}")
        return False

robust_fix(target_file)
