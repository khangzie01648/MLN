
import os

target_dir = r"c:\Users\Admin\.gemini\antigravity\scratch\carl_jung_project\JUNG_ARCHIVE_FINAL"

# CP1252 Extras Map (Unicode -> Byte)
CP1252_MAP = {
    '\u20ac': 0x80, '\u201a': 0x82, '\u0192': 0x83, '\u201e': 0x84, '\u2026': 0x85, '\u2020': 0x86, '\u2021': 0x87, '\u02c6': 0x88,
    '\u2030': 0x89, '\u0160': 0x8a, '\u2039': 0x8b, '\u0152': 0x8c, '\u008d': 0x8d, '\u017d': 0x8e, '\u008f': 0x8f, '\u0090': 0x90,
    '\u2018': 0x91, '\u2019': 0x92, '\u201c': 0x93, '\u201d': 0x94, '\u2022': 0x95, '\u2013': 0x96, '\u2014': 0x97, '\u02dc': 0x98,
    '\u2122': 0x99, '\u0161': 0x9a, '\u203a': 0x9b, '\u0153': 0x9c, '\u009d': 0x9d, '\u017e': 0x9e, '\u0178': 0x9f
}

def smart_fix_text(text):
    buffer = []
    result = []
    
    def process_buffer():
        if not buffer:
            return ""
        
        chunk = "".join(buffer)
        
        # Convert to bytes using Custom Logic
        byte_list = []
        try:
            for c in chunk:
                if c in CP1252_MAP:
                    byte_list.append(CP1252_MAP[c])
                elif ord(c) <= 0xFF:
                    byte_list.append(ord(c))
                else:
                    # Should not happen as we filter before process_buffer
                    raise ValueError("High Unicode in buffer")
            
            raw_bytes = bytes(byte_list)
            
            # Decode as UTF-8
            decoded = raw_bytes.decode('utf-8')
            
            # If validated, use it
            return decoded
        except Exception:
            # Fallback to original
            return chunk
        finally:
            buffer.clear()

    for char in text:
        # Check if char is "Mojibakable" (Latin-1 or CP1252 extra)
        if ord(char) <= 0xFF or char in CP1252_MAP:
            buffer.append(char)
        else:
            # High Unicode (e.g. Correct Vietnamese chars, or unmappable)
            if buffer:
                result.append(process_buffer())
            result.append(char)
            
    if buffer:
        result.append(process_buffer())
        
    return "".join(result)

count = 0
print("Starting Smart Fix V3...")

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
