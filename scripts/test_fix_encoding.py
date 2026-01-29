
import os

file_path = r"c:\Users\Admin\.gemini\antigravity\scratch\carl_jung_project\JUNG_ARCHIVE_FINAL\archive_transcendental.md"

def try_fix(text):
    try:
        # Common Mojibake: UTF-8 interpreted as Windows-1252 or Latin-1
        # We try to reverse it: encode to latin1 (bytes), then decode as utf-8
        # Using latin1 is safer for fully reversible byte-to-char mapping
        fixed = text.encode('latin1').decode('utf-8')
        return fixed
    except Exception as e:
        return f"Error latin1: {e}"

def try_fix_cp1252(text):
    try:
        fixed = text.encode('cp1252').decode('utf-8')
        return fixed
    except Exception as e:
        return f"Error cp1252: {e}"

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print(f"Original snippet: {content[:100]}")
    
    fixed_latin1 = try_fix(content)
    print(f"\nFixed (latin1) snippet: {fixed_latin1[:100] if not fixed_latin1.startswith('Error') else fixed_latin1}")
    
    fixed_cp1252 = try_fix_cp1252(content)
    print(f"\nFixed (cp1252) snippet: {fixed_cp1252[:100] if not fixed_cp1252.startswith('Error') else fixed_cp1252}")

except Exception as e:
    print(f"File read error: {e}")
