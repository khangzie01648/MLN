import os

ARCHIVE_DIR = r"c:\Users\Admin\.gemini\antigravity\scratch\carl_jung_project\JUNG_ARCHIVE_FINAL"

HEADER_TEMPLATE = """# TOÀN THƯ CARL GUSTAV JUNG (THE JUNG COMPENDIUM)
**Biên soạn & Tổng hợp: Tác giả (Bạn)**
*Phiên bản: Final Edition*

---

"""

FOOTER_TEMPLATE = """
---

**© 2026 The Jung Compendium Project.**
*Tài liệu này là một phần của dự án Tái cấu trúc Di sản Carl Jung - Được tối ưu hóa cho Trải nghiệm Kỹ thuật số.*
"""

def standardize_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    original_content = content
    filename = os.path.basename(filepath)
    
    # Skip already standardized files (loose check)
    if "# TOÀN THƯ CARL GUSTAV JUNG" not in content and "# TOAN THU CARL GUSTAV JUNG" not in content:
        # Check if it has a different H1 at the top
        lines = content.splitlines()
        if lines and lines[0].startswith("# "):
            # It has a title, but not the Standard Branding. 
            # We prepend the Branding.
            print(f"[HEADER ADDED] {filename}")
            content = HEADER_TEMPLATE + content
        else:
            # It might be a frag or valid tile. 
            # If it doesn't start with #, it might be raw text. 
            # We still add the header.
            print(f"[HEADER ADDED] {filename}")
            content = HEADER_TEMPLATE + content
    else:
        print(f"[HEADER OK] {filename}")

    # Check footer
    if "© 2026 The Jung Compendium Project" not in content:
        print(f"[FOOTER ADDED] {filename}")
        content = content + FOOTER_TEMPLATE

    if content != original_content:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        return True
    return False

def main():
    count = 0
    for filename in os.listdir(ARCHIVE_DIR):
        if filename.endswith(".md"):
            filepath = os.path.join(ARCHIVE_DIR, filename)
            if standardize_file(filepath):
                count += 1
    
    print(f"\nTotal files standardized: {count}")

if __name__ == "__main__":
    main()
