---
title: "Website User Flow And Wireframes"
description: "Documents regarding Website User Flow And Wireframes in the Jungian archive."
category: "Specific Topics"
tags: ["jung", "archive", "specific"]
---

# TOÀN THƯ CARL GUSTAV JUNG (THE JUNG COMPENDIUM)
**Biên soạn & Tổng hợp: Tác giả (Bạn)**
*Phiên bản: Final Edition*

---

# SƠ ĐỒ TRẢI NGHIỆM NGƯỜI DÙNG & CẤU TRÚC TRANG (UX FLOW & WIREFRAMES)

Tài liệu này mô tả chi tiết dòng chảy (Flow) của người dùng từ khi bước vào "Ngôi đền số" này cho đến khi đi sâu vào từng ngóc ngách.

---

## 1. TRIẾT LÝ ĐIỀU HƯỚNG: "THE MANDALA NAVIGATION"
Khác với web thường (cấu trúc Cây: Trang chủ -> Hạng mục -> Bài viết), web này dùng cấu trúc **Vòng Tròn (Mandala)**.
*   **Trang chủ** là Tâm điểm.
*   **4 Trụ cột** là 4 hướng Đông Tây Nam Bắc.
*   Người dùng luôn quay về Tâm để đi sang hướng khác.

---

## 2. CHI TIẾT TỪNG MÀN HÌNH (SCREEN-BY-SCREEN)

### A. TRANG CHỦ (THE GATEWAY)
*Giao diện chào đón & Phân loại sơ bộ.*

1.  **Màn hình Chờ (Preloader):**
    *   *Visual:* Một vòng tròn Mandala đang được vẽ tay (tự động vẽ từng nét).
    *   *Text:* "Đang triệu hồi các Cổ mẫu..." (Summoning Archetypes...).
2.  **Hero Section (Màn hình chính):**
    *   *Visual:* Chân dung Jung (Cinemagraph - khói thuốc bay).
    *   *Tương tác:* Di chuột vào mắt Jung -> Mắt ông sáng lên (hiệu ứng "Insight").
    *   *Nút bấm:* "Bước vào" (Enter).
3.  **The Quaternity (Menu điều hướng chính):**
    *   4 Thẻ bài lớn (Cards) chiếm 4 góc hoặc xếp ngang:
        *   **Biên niên sử (Life):** Hình tháp đá. (Màu Xám).
        *   **Triết học (Philosophy):** Hình ngọn lửa vàng. (Màu Vàng).
        *   **Huyền học (Esoterica):** Hình con rồng hoặc ngọc đá quý. (Màu Tím).
        *   **Tác phẩm (Works):** Hình kệ sách cổ. (Màu Nâu).
4.  **The Labyrinth (Lưới bài viết):**
    *   Bên dưới là các ô Masonry (lộn xộn có chủ đích) hiển thị tiêu đề các bài viết nhỏ ("Deep Dive: Vụ án dương vật", "UFO là gì?"). Khuyến khích khám phá ngẫu nhiên.

---

### B. TRANG DANH MỤC (THE NEXUS PAGES - 4 TRỤ CỘT)
*Mỗi trụ cột có một không khí (Atmosphere) riêng biệt.*

**Ví dụ: Trang TRIẾT HỌC (Philosophy Nexus)**
*   **Background:** Màu đen sâu, có các hạt bụi vàng bay lơ lửng (tượng trưng cho tia sáng trí tuệ).
*   **Tiêu đề:** Font chữ *Cinzel* to bản: "THE BATTLEFIELD OF IDEAS".
*   **Danh sách bài viết:** Không liệt kê dạng list buồn tẻ.
    *   Hiển thị dạng **"Dòng thời gian tư tưởng" (Timeline of Ideas)**.
    *   *Node 1:* Kant & Nhận thức luận.
    *   *Node 2:* Gặp gỡ Freud.
    *   *Node 3:* Câu trả lời cho Gióp.
    *   -> Người dùng cuộn chuột (Scroll) để đi dọc theo dòng lịch sử tư tưởng này.

**Ví dụ: Trang HUYỀN HỌC (Esoterica Nexus)**
*   **Background:** Màu tím tối huyền bí, nền có họa tiết các biểu tượng Hoàng đạo mờ ảo.
*   **Danh sách bài viết:** Hiển thị dạng **"Bản đồ Sao" (Constellation Map)**.
    *   Các bài viết là các Ngôi sao. Nối với nhau bằng các đường kẻ mờ.
    *   Click vào Ngôi sao "Alchemy" -> Zoom vào bài viết Giả kim thuật.

---

### C. TRANG BÀI VIẾT (THE SCROLL - ARTICLE DETAIL)
*Nơi trải nghiệm đọc sâu (Deep Reading) diễn ra.*

1.  **Header:**
    *   Hình ảnh Cover Art (Do AI vẽ theo style Sơn dầu).
    *   Tiêu đề bài viết & Thời gian đọc (VD: "15 phút lặn sâu").
2.  **Thanh Tiến độ (Progress Bar):**
    *   Là một con rắn **Ouroboros** (Rắn cắn đuôi) chạy quanh viền màn hình. Khi đọc hết bài, con rắn cắn được đuôi -> Hoàn thành vòng tròn.
3.  **Nội dung (Typography):**
    *   Chữ màu kem (Cream) trên nền tối (Dark Charcoal) để đỡ mỏi mắt.
    *   **Marginalia (Ghi chú bên lề):** Các chú thích không nằm ở cuối trang (Footnote) mà nằm ngay bên lề (giống sách cổ). Bấm vào sẽ mở rộng ra.
4.  **Các công cụ đọc:**
    *   **Nút "Bật đèn/Tắt đèn":** Chuyển đổi giao diện Sáng/Tối.
    *   **Nút "Focus Mode":** Ẩn hết Menu, chỉ còn chữ.
5.  **Kết thúc bài:**
    *   Không hiện "Bài liên quan" rác.
    *   Hiện: **"Cánh cửa tiếp theo"** (Next Portal). Dẫn dắt người đọc đi theo lộ trình logic (VD: Đọc xong "Bóng tối" thì dẫn sang "Cách chữa lành").

---

### D. TRANG TƯƠNG TÁC (THE TOOLS)

**1. Phòng Gương (The Shadow Mirror Page)**
*   Trang này yêu cầu quyền Camera.
*   Giữa màn hình là một cái khung gương cổ điển.
*   Hình ảnh người dùng hiện lên nhưng bị xử lý: Đen trắng, noise (nhiễu hạt), đôi mắt có thể bị che đi hoặc làm sáng lên.
*   Dòng chữ hiện ra: *"Hãy nhìn vào kẻ lạ mặt trong gương. Hắn muốn nói gì với ngươi?"*

**2. Phòng Gieo Quẻ (Synchronicity Chamber)**
*   Một không gian 3D tối giản.
*   Có một khối đa diện (xúc xắc) lơ lửng.
*   User bấm "Gieo" -> Khối xoay và vỡ ra -> Hiện lên một lá bài (Tarot/Hình ảnh Archetype) + Một trích dẫn của Jung giải thích tình trạng hiện tại của người dùng.

---

## 3. USER FLOW (LUỒNG ĐI CỦA KHÁCH)

1.  **Khách Vãng Lai (The Wanderer):**
    *   Vào Home -> Bị ấn tượng bởi Visual -> Bấm random vào một ô ở "Mê cung" (Lưới bài viết) -> Đọc 1 bài -> Thoát. (Mục tiêu: Gây ấn tượng).

2.  **Người Tìm Kiếm (The Seeker):**
    *   Vào Home -> Chọn Cửa "Triết học" -> Xem Timeline -> Chọn bài "Answer to Job" -> Đọc sâu -> Bấm sang bài tiếp theo "God Image". (Mục tiêu: Kiến thức).

3.  **Người Thực Hành (The Initiate):**
    *   Vào Home -> Vào Cửa "Đời sống" -> Tìm bài "Giải mã giấc mơ" -> Đọc hướng dẫn -> Mở trang "Gieo quẻ" để tìm cảm hứng -> Viết nhật ký. (Mục tiêu: Ứng dụng).

---

**© 2026 The Jung Compendium Project.**
*Tài liệu này là một phần của dự án Tái cấu trúc Di sản Carl Jung - Được tối ưu hóa cho Trải nghiệm Kỹ thuật số.*
