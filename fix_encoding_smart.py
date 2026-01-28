
import os
import re

target_dir = r"c:\Users\Admin\.gemini\antigravity\scratch\carl_jung_project\JUNG_ARCHIVE_FINAL"

# Regex to find sequences of Latin-1 characters that might be Mojibake.
# We look for 2 or more consecutive Latin-1 characters (including extended ASCII 0x80-0xFF).
# Mojibake for Vietnamese usually involves extended ASCII chars (Ã, Â, etc).
# We exclude ASCII (< 128) from forcing a fix unless they are part of a sequence with extended chars.
# Actually, blindly trying to fix ALL Latin-1 sequences is safest if we validate UTF-8.

def smart_fix_text(text):
    # Split text into chunks of "Potential Mojibake" (Latin-1) and "Safe Unicode" (High Unicode)
    # CP1252 range is 0x00-0xFF (with some holes filled). 
    # But Python 'latin1' enforces 0x00-0xFF only.
    # Our previous error showed '\u2026' (Ellipsis) which is > 0xFF.
    
    # We iterate and build a buffer of Latin-1 chars.
    buffer = []
    result = []
    
    def process_buffer():
        if not buffer:
            return ""
        
        chunk = "".join(buffer)
        buffer.clear()
        
        # Try to fix this chunk
        try:
            # We assume the chunk is Mojibake from CP1252 or Latin1
            # First, try to encode to bytes using Latin-1 (preserves 0x00-0xFF exactly)
            raw_bytes = chunk.encode('latin1')
            
            # Now try to interpret these bytes as UTF-8
            decoded = raw_bytes.decode('utf-8')
            
            # If successful, we check heuristics:
            # 1. Is it shorter? (Usually yes, 2 bytes -> 1 char)
            # 2. Does it contain valid Vietnamese or common chars?
            # 3. If it decodes to valid UTF-8, it is HIGHLY likely to be the original text,
            #    UNLESS the original text was just random bytes that happened to be valid UTF-8.
            #    (Unlikely for natural language).
            return decoded
            
        except (UnicodeEncodeError, UnicodeDecodeError):
            # Failed to fix, return original
            return chunk

    for char in text:
        if ord(char) <= 0xFF:
            buffer.append(char)
        else:
            # High Unicode character (e.g. 'Ư', '…')
            # Flush buffer first
            if buffer:
                result.append(process_buffer())
            result.append(char)
            
    # Flush remaining
    if buffer:
        result.append(process_buffer())
        
    return "".join(result)

print("Starting Smart Encoding Fix...")
count = 0

for filename in os.listdir(target_dir):
    if not filename.endswith(".md"):
        continue
        
    filepath = os.path.join(target_dir, filename)
    try:
        with open(filepath, 'r', encoding='utf-8-sig') as f:
            content = f.read()
            
        fixed = smart_fix_text(content)
        
        if fixed != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(fixed)
            print(f"Fixed: {filename}")
            count += 1
            
    except Exception as e:
        print(f"Error {filename}: {e}")

print(f"Total fixed: {count}")
