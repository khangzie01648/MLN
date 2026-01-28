import os

ARCHIVE_DIR = r"c:\Users\Admin\.gemini\antigravity\scratch\carl_jung_project\JUNG_ARCHIVE_FINAL"
REQUIRED_HEADER = "# TOÀN THƯ CARL GUSTAV JUNG (THE JUNG COMPENDIUM)"
REQUIRED_FOOTER = "© 2026 The Jung Compendium Project"

def verify_files():
    total_files = 0
    passed_files = 0
    failed_files = []

    print(f"Verifying files in: {ARCHIVE_DIR}\n")

    for filename in os.listdir(ARCHIVE_DIR):
        if filename.endswith(".md"):
            total_files += 1
            filepath = os.path.join(ARCHIVE_DIR, filename)
            
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()
            
            has_header = REQUIRED_HEADER in content
            has_footer = REQUIRED_FOOTER in content
            
            if has_header and has_footer:
                passed_files += 1
            else:
                issues = []
                if not has_header: issues.append("Missing Header")
                if not has_footer: issues.append("Missing Footer")
                failed_files.append(f"{filename} -> {', '.join(issues)}")

    print(f"Total MD Files: {total_files}")
    print(f"Passed: {passed_files}")
    print(f"Failed: {len(failed_files)}")

    if failed_files:
        print("\n--- FAILED FILES ---")
        for fail in failed_files:
            print(fail)
    else:
        print("\nSUCCESS: All files verified successfully.")

if __name__ == "__main__":
    verify_files()
