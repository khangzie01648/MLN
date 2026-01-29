
import os

target_dir = r"c:\Users\Admin\.gemini\antigravity\scratch\carl_jung_project\JUNG_ARCHIVE_FINAL"

def fix_content(text):
    # Strip BOM if present (although utf-8-sig should handle it, explicit check helps)
    if text.startswith('\ufeff'):
        text = text[1:]
        
    # Try CP1252 first (standard Windows)
    # The Euro sign € (U+20AC) often appears in Mojibake for byte 0x80
    try:
        return text.encode('cp1252').decode('utf-8')
    except:
        pass
    
    # Try Latin-1
    try:
        return text.encode('latin1').decode('utf-8')
    except:
        pass
        
    return None

count = 0
fixed_files = []
failed_files = []

print("Starting encoding fix...")

for filename in os.listdir(target_dir):
    if not filename.endswith(".md"):
        continue
        
    filepath = os.path.join(target_dir, filename)
    try:
        # Use utf-8-sig to handle headers automatically
        with open(filepath, 'r', encoding='utf-8-sig') as f:
            content = f.read()
        
        fixed = fix_content(content)
        
        if fixed and fixed != content:
            # Check length sanity: Usually fixed text is shorter (multi-byte chars become single chars)
            # or the same length. Mojibake -> Correct is 'Ã' + 'ª' (2 chars) -> 'ê' (1 char).
            # So len(fixed) < len(content) is expected for Vietnamese.
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(fixed)
            print(f"Fixed: {filename}")
            fixed_files.append(filename)
            count += 1
            
    except Exception as e:
        print(f"Error processing {filename}: {e}")
        failed_files.append(filename)

print(f"Total fixed: {count}")
