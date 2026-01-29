
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

def debug_smart_fix(text):
    buffer = []
    
    print(f"Analyzing text length: {len(text)}")
    for i, char in enumerate(text[:50]): # Check first 50 chars
        in_set = is_cp1252_char(char)
        print(f"Char '{char}' (U+{ord(char):04X}): In Set? {in_set}")
        if in_set:
            buffer.append(char)
        else:
            print(f"BREAK BUFFER at U+{ord(char):04X}")
            if buffer:
                chunk = "".join(buffer)
                print(f"Processing Chunk: '{chunk}'")
                try:
                    enc = chunk.encode('cp1252')
                    print(f"  Encoded bytes: {enc}")
                    dec = enc.decode('utf-8')
                    print(f"  Decoded: '{dec}' (SUCCESS)")
                except Exception as e:
                    print(f"  Failed: {e}")
            buffer.clear()
            
match_file = r"c:\Users\Admin\.gemini\antigravity\scratch\carl_jung_project\JUNG_ARCHIVE_FINAL\archive_transcendental.md"
with open(match_file, 'r', encoding='utf-8-sig') as f:
    content = f.read()

# Find the "TOÃ€N" line
idx = content.find("TOÃ€N")
if idx == -1:
    print("Could not find TOÃ€N string!")
    offset = 0
else:
    print(f"Found TOÃ€N at index {idx}")
    offset = idx

debug_smart_fix(content[offset:offset+50])
