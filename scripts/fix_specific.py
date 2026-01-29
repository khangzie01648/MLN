
import os

target_file = "c:/Users/Admin/.gemini/antigravity/scratch/carl_jung_project/FINAL_EBOOK_JUNG_V3_COMPLETE.md"
target_file_v2 = "c:/Users/Admin/.gemini/antigravity/scratch/carl_jung_project/FINAL_EBOOK_JUNG_V2_ULTRADEEP.md"

def aggressive_fix(filepath):
    try:
        print(f"Reading {filepath}...")
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Try CP1252 (Windows default) first, as it covers curly quotes, bullets, etc.
        # This reverses the "UTF-8 bytes interpreted as Windows-1252" error
        try:
            fixed = content.encode('cp1252').decode('utf-8')
            print("Successfully encoded with cp1252 and decoded as utf-8")
        except UnicodeEncodeError as e:
            print(f"CP1252 Encode failed: {e}. Trying latin1...")
            try:
                fixed = content.encode('latin1').decode('utf-8')
                print("Successfully encoded with latin1 and decoded as utf-8")
            except UnicodeEncodeError as e2:
                print(f"Latin1 Encode failed: {e2}. Attempting recovery with replacement...")
                # Last resort: encode with cp1252, ignore errors, then decode
                fixed = content.encode('cp1252', errors='ignore').decode('utf-8')

        if "TOÀN THƯ" in fixed or "CHƯƠNG" in fixed or "MỤC LỤC" in fixed:
            print(f"Success markers found. Saving {filepath}...")
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(fixed)
            return True
        else:
            print("Fixed content does not contain expected Vietnamese markers. Not saving.")
            # print snippet
            print("Snippet:", fixed[:100])
            return False

    except Exception as e:
        print(f"Fatal error: {e}")
        return False

print("Processing V3...")
aggressive_fix(target_file)
print("\nProcessing V2...")
aggressive_fix(target_file_v2)
