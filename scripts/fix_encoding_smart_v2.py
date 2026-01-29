
import os

target_dir = r"c:\Users\Admin\.gemini\antigravity\scratch\carl_jung_project\JUNG_ARCHIVE_FINAL"

# CP1252 Map: 0x80-0x9F map to these Unicode chars:
CP1252_EXTRAS = set([
    '\u20ac', '\u201a', '\u0192', '\u201e', '\u2026', '\u2020', '\u2021', '\u02c6',
    '\u2030', '\u0160', '\u2039', '\u0152', '\u008d', '\u017d', '\u008f', '\u0090',
    '\u2018', '\u2019', '\u201c', '\u201d', '\u2022', '\u2013', '\u2014', '\u02dc',
    '\u2122', '\u0161', '\u203a', '\u0153', '\u009d', '\u017e', '\u0178'
])

def is_cp1252_char(char):
    if ord(char) <= 0xFF:
        return True
    return char in CP1252_EXTRAS

def smart_fix_text(text):
    buffer = []
    result = []
    
    def process_buffer():
        if not buffer:
            return ""
        
        chunk = "".join(buffer)
        buffer.clear()
        
        # Try to fix
        try:
            # Encode using cp1252 (which handles Euro sign etc)
            raw_bytes = chunk.encode('cp1252')
            
            # Decode as UTF-8
            decoded = raw_bytes.decode('utf-8')
            
            # Heuristic checks:
            # 1. New text length < Old text length (almost always true for UTF-8 -> CP1252 expansion)
            # 2. But we must be careful not to corrupt valid CP1252 strings that happen to be valid UTF-8.
            #    e.g. "Ã" (C3) -> valid UTF-8? No (unexpected end).
            #    "Ãª" (C3 AA) -> "ê". Len 2 -> Len 1.
            #    "…" (Ellipsis) -> b'\x85' -> Invalid UTF-8. Safe.
            
            # If length is significantly reduced, it's a very strong signal.
            # If length is same? e.g. ASCII -> ASCII. OK.
            
            return decoded
        except (UnicodeEncodeError, UnicodeDecodeError):
            return chunk

    for char in text:
        if is_cp1252_char(char):
            buffer.append(char)
        else:
            if buffer:
                result.append(process_buffer())
            result.append(char)
            
    if buffer:
        result.append(process_buffer())
        
    return "".join(result)

count = 0
print("Starting Smart Fix V2...")

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
