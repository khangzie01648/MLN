
import os

filepath = r"c:\Users\Admin\.gemini\antigravity\scratch\carl_jung_project\JUNG_ARCHIVE_FINAL\archive_transcendental.md"

try:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    print(f"Content length: {len(content)}")
    print(f"First 20 chars: {repr(content[:20])}")
    
    # Try Latin-1
    try:
        encoded = content.encode('latin1')
        decoded = encoded.decode('utf-8')
        print("Latin-1 fix SUCCESS")
        print(f"Snippet: {decoded[:50]}")
    except Exception as e:
        print(f"Latin-1 failed: {e}")
        # Find the character that failed
        for i, c in enumerate(content):
            try:
                c.encode('latin1')
            except:
                print(f"First failing char at index {i}: {repr(c)} (U+{ord(c):04X})")
                break

    # Try CP1252
    try:
        encoded = content.encode('cp1252')
        decoded = encoded.decode('utf-8')
        print("CP1252 fix SUCCESS")
    except Exception as e:
        print(f"CP1252 failed: {e}")

except Exception as e:
    print(f"File read failed: {e}")
