
import os
import sys

def fix_mojibake(text):
    # Common mojibake repairs for Vietnamese
    # CP1252/Latin1 interpreted as UTF-8 bytes
    try:
        # Most common scenario: UTF-8 bytes read as CP1252 or Latin1
        # We need to reverse it: encode to latin1, then decode as utf-8
        return text.encode('latin1').decode('utf-8')
    except:
        try:
            return text.encode('cp1252').decode('utf-8')
        except:
            return text

def check_and_fix_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Indicator of mojibake: "Ã" followed by common characters
        if "Ã" in content or "Ä" in content:
            fixed = fix_mojibake(content)
            
            # Sanity check: did we actually change anything and does it look better?
            # Check for Vietnamese markers in fixed text
            if fixed != content:
                # If the fix results in common Vietnamese chars like 'ư', 'ơ', 'đ', 'ê'
                # and reduces the count of 'Ã', it's likely good.
                if "ư" in fixed or "ơ" in fixed or "đ" in fixed or "ê" in fixed:
                    print(f"Fixing file: {filepath}")
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(fixed)
                    return True
    except Exception as e:
        print(f"Failed to process {filepath}: {e}")
    return False

search_dir = "c:/Users/Admin/.gemini/antigravity/scratch/carl_jung_project"
count = 0
for root, dirs, files in os.walk(search_dir):
    for file in files:
        if file.endswith(".md"):
            if check_and_fix_file(os.path.join(root, file)):
                count += 1

print(f"Finished. Fixed {count} files.")
