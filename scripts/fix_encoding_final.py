
import os

target_dir = r"c:\Users\Admin\.gemini\antigravity\scratch\carl_jung_project\JUNG_ARCHIVE_FINAL"

def fix_content(text):
    # Try CP1252 first (standard Windows)
    try:
        return text.encode('cp1252').decode('utf-8')
    except:
        pass
    
    # Try Latin-1 (ISO-8859-1) - less likely if Euro sign acts as 0x80
    try:
        return text.encode('latin1').decode('utf-8')
    except:
        pass
    
    return None

count = 0
fixed_files = []
failed_files = []

for filename in os.listdir(target_dir):
    if not filename.endswith(".md"):
        continue
        
    filepath = os.path.join(target_dir, filename)
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if content needs fixing
        # If the file contains valid Vietnamese characters like 'Ư', 'Ơ' (which are not in cp1252), 
        # the encode step will FAIL, which is good (we don't want to double-fix correct files).
        # We only want to fix if the content consists ONLY of chars found in CP1252/Latin1
        # (which happens when UTF-8 bytes are mapped to single-byte chars).
        
        fixed = fix_content(content)
        
        if fixed and fixed != content:
            # Heuristic: Check if the fixed version looks "better"?
            # Or just trust the reversible encoding.
            # If 'fixed' succeeded, it means 'content' ONLY contained characters mappable to CP1252 bytes
            # AND those bytes formed valid UTF-8.
            # This is a VERY strong signal of mojibake.
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(fixed)
            print(f"Fixed: {filename}")
            fixed_files.append(filename)
            count += 1
            
    except Exception as e:
        print(f"Error processing {filename}: {e}")
        failed_files.append(filename)

print(f"Total fixed: {count}")
print(f"Failed files: {len(failed_files)}")
