# 🏛️ THE JUNG DIGITAL LIBRARY (KHO TÀNG C.G. JUNG)

> **"Không có sự ra đời của ý thức nếu không có đau đớn."** — C.G. Jung

 Dự án **Thư Viện Số Carl Jung** là một nỗ lực kỹ thuật số nhằm lưu trữ, chuẩn hóa và hiển thị toàn bộ di sản tri thức của Carl Gustav Jung dưới dạng một trải nghiệm web "điện ảnh" (Cinematic Web Experience).

---

## 🌟 TÌNH TRẠNG DỰ ÁN (PROJECT STATUS)

Dự án đã hoàn thành **Giai đoạn 3 & 4 (Integration & UI)**.

### 1. KHO LƯU TRỮ CHUẨN HÓA (Approved Archive)
*   **Số lượng:** 113 Tác phẩm & Tài liệu gốc.
*   **Định dạng:** Markdown chuẩn (`.md`) với Frontmatter Metadata đầy đủ.
*   **Cấu trúc:**
    *   **Sách Cốt Lõi (`vn_*`):** 10 chủ đề nền tảng đã được mở rộng nội dung gấp 10 lần.
    *   **Hồ Sơ Toàn Thư (`archive_*`):** Các bộ sưu tập đồ sộ (Master Compendium).
    *   **Tiểu Luận (`essay_*`):** Các bài phân tích chuyên sâu.

### 2. GIAO DIỆN "CINEMATIC" (The Void UI)
*   **Theme:** "Deep Void" (Hư không thẳm sâu) - Nền tối `#0a0b10` kết hợp viền vàng kim `#d4af37`.
*   **The Grand Hall (`/library`):**
    *   **Masonry Grid:** Lưới hiển thị sách tự động sắp xếp thông minh.
    *   **Real-time Filter & Search:** Tìm kiếm và lọc theo chủ đề (Giả kim thuật, Sách Đỏ, UFO...) ngay lập tức.
    *   **Staggered Animation:** Hiệu ứng các cuốn sách "bay" ra từ hư không.
*   **Deep Reader (`/library/[slug]`):**
    *   **Typography:** Sử dụng Font **Cinzel** (Tiêu đề) và **Serif** (Nội dung) cho trải nghiệm đọc như sách cổ.
    *   **Sticky TOC:** Mục lục tự động trượt theo người đọc.
    *   **Visuals:** Render đầy đủ hình ảnh, blockquote, và các định dạng Markdown phức tạp.

---

## 🛠️ CÔNG NGHỆ SỬ DỤNG (TECH STACK)

Dự án được xây dựng trên nền tảng Web hiện đại nhất (2025-2026 Ready):

*   **Core:** [Next.js 16](https://nextjs.org/) (App Router, Server Components).
*   **Language:** TypeScript (Strict Mode).
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) + Custom Design Tokens.
*   **Animation:** [Framer Motion v12](https://www.framer.com/motion/) (Spring physics, Layout transitions).
*   **Content Engine:**
    *   `gray-matter`: Xử lý Metadata (YAML Frontmatter).
    *   `react-markdown` (v9): Render nội dung an toàn và đẹp mắt.
    *   `rehype-raw` / `remark-gfm`: Hỗ trợ HTML & GitHub Flavored Markdown.

---

## 🚀 HƯỚNG DẪN CÀI ĐẶT (GETTING STARTED)

Để chạy Thư viện trên máy cục bộ của bạn:

1.  **Cài đặt Dependencies:**
    ```bash
    npm install
    # Lưu ý: Nếu gặp lỗi xung đột peer-deps, hãy dùng:
    # npm install --legacy-peer-deps
    ```

2.  **Khởi chạy Server Development:**
    ```bash
    npm run dev
    ```

3.  **Truy cập Thư viện:**
    Mở trình duyệt và vào: `http://localhost:8080/library`

---

## 📂 CẤU TRÚC THƯ MỤC (DIRECTORY)

```
.
├── app/
│   ├── library/             # Phân hệ Thư viện Chính
│   │   ├── [slug]/          # Trang đọc chi tiết (Dynamic Route)
│   │   ├── layout.tsx       # "Deep Void" Theme Layout
│   │   └── page.tsx         # Trang chủ "Grand Hall"
│   └── ...
├── components/
│   └── library/
│       ├── ArchiveReader.tsx # Component hiển thị nội dung & TOC
│       └── LibraryExplorer.tsx # Component lưới sách & Tìm kiếm
├── content/                 # Nội dung gốc (Legacy)
├── JUNG_ARCHIVE_FINAL/      # KHO LƯU TRỮ CHÍNH THỨC (113 files)
├── lib/
│   └── content-config.ts    # Bộ não xử lý dữ liệu (Scanner & Mapper)
└── ...
```

---

*“Người nhìn ra bên ngoài thì mơ mộng, người nhìn vào bên trong thì tỉnh thức.”*
