---
title: "Homepage Architecture Blueprint"
description: "Documents regarding Homepage Architecture Blueprint in the Jungian archive."
category: "Specific Topics"
tags: ["jung", "archive", "specific"]
---

# TOÀN THƯ CARL GUSTAV JUNG (THE JUNG COMPENDIUM)
**Biên soạn & Tổng hợp: Tác giả (Bạn)**
*Phiên bản: Final Edition*

---

# BLUEPRINT TRANG CHỦ: MẠNG LƯỚI TÂM THỨC (THE DIGITAL MANDALA HOMEPAGE)

Để trình bày một khối lượng kiến thức khổng lồ (vừa học thuật, vừa huyền bí, vừa đời tư) mà không bị rối, chúng ta không thể dùng giao diện Blog truyền thống (dạng list bài viết từ trên xuống).

Chúng ta cần một cấu trúc **"Kiến trúc Thông tin Phân tầng" (Layered Information Architecture)**. Hãy tưởng tượng trang chủ như một **Ngôi đền** hoặc một **Mandala**.

Dưới đây là bản thiết kế chi tiết để đảm bảo **KHÔNG SÓT MỘT THÔNG TIN NÀO**.

---

## TẦNG 1: CÁNH CỔNG (THE PERSONA - HERO SECTION)
*Mục đích: Gây ấn tượng thị giác, xác lập tông màu (Mood).*

*   **Giao diện (UI):** Full màn hình.
*   **Hình ảnh (Visual):** Không dùng ảnh tĩnh. Dùng **Cinemagraph** (ảnh động nhẹ).
    *   *Gợi ý:* Gương mặt Jung già ở tháp Bollingen, tàn thuốc trên tẩu đang cháy đỏ, khói bay lờ đờ. Hoặc hình ảnh Philemon vỗ cánh chậm rãi.
*   **Văn bản (Text):**
    *   Tiêu đề lớn: **THE JUNG ARCHIVE** (Font Cinzel).
    *   Phụ đề: *A Digital Grimoire of the Unconscious* (Quyển sách ma thuật số của Vô thức).
    *   **Random Quote:** Mỗi lần F5 sẽ hiện một câu nói khác nhau của Jung (Lấy từ file `wisdom_quotes.md`).
*   **Hành động (Call to Action):** Một nút bấm duy nhất ở giữa: **"ENTER THE DEPTHS"** (Đi vào chiều sâu).

---

## TẦNG 2: BỘ TỨ TRỤ CỘT (THE QUATERNITY - MAIN NAVIGATION)
*Mục đích: Chia luồng nội dung chính. Dựa trên số 4 thiêng liêng.*

Sau khi qua cổng, người dùng thấy 4 Cánh cửa lớn (Cards) đại diện cho 4 mảng dữ liệu đã sắp xếp:

### 1. CỬA BẮC: TRIẾT HỌC & THẦN HỌC (THE SPIRIT)
*   *Mô tả:* "Cuộc chiến với Chúa và các Tư tưởng."
*   *Chứa các file:*
    *   `JUNG_ARCHIVE_PHILOSOPHICAL_CORE.md` (Kant & Nhận thức luận).
    *   `philosophical_wars_and_theology.md` (Answer to Job).
    *   `JUNG_PHILOSOPHICAL_DEEP_DIVE_EXTENSIONS.md` (Schopenhauer, Hiện sinh).
    *   `JUNG_PHILOSOPHICAL_CONNECTIONS_MAP.md` (Sơ đồ kết nối).

### 2. CỬA NAM: ĐỜI SỐNG & TIỂU SỬ (THE MATTER)
*   *Mô tả:* "Người đàn ông bằng xương bằng thịt."
*   *Chứa các file:*
    *   `README.md` (Biên niên sử Matrix).
    *   `chapter_1_origins.md` đến `chapter_6_late_years_legacy.md`.
    *   `the_unseen_jung.md` (Jung đời thường: Nấu ăn, Đi lính).

### 3. CỬA ĐÔNG: HUYỀN HỌC & BÍ ẨN (THE EAST / ESOTERICA)
*   *Mô tả:* "Những điều cấm kỵ và Khoa học bị lãng quên."
*   *Chứa các file:*
    *   `JUNG_ALCHEMICAL_SYMBOLISM_DECODED.md` (Giả kim thuật).
    *   `JUNG_POLITICAL_AND_OCCULT_FILES.md` (UFO, Ma quỷ, Hitler).
    *   `missing_pieces_deep_dive.md` (Vụ án Dương vật, Tam điểm).

### 4. CỬA TÂY: KHO TÀNG TÁC PHẨM (THE WEST / WORKS)
*   *Mô tả:* "Di sản học thuật chính thống."
*   *Chứa các file:*
    *   `JUNG_PHILOSOPHICAL_OMNIBUS.md` (Giải phẫu 20 tập Collected Works).
    *   `glossary_concepts_symbols.md` (Từ điển khái niệm).

---

## TẦNG 3: MÊ CUNG KIẾN THỨC (THE LABYRINTH - CONTENT GRID)
*Mục đích: Hiển thị chi tiết để "không sót bài nào".*

Dưới 4 trụ cột là một khu vực lưới (Grid) hiển thị tất cả các bài viết nhỏ lẻ (Granular Content) mà người dùng có thể tò mò.

*   **Layout:** Masonry Grid (Các ô to nhỏ ghép vào nhau như bức tường đá).
*   **Các thẻ bài nổi bật (Featured Cards):**
    *   **"The Red Book Gallery":** Một ô trượt ngang (Carousel) hiển thị tranh vẽ trong Sách Đỏ.
    *   **"The Alchemical Zoo":** Một ô tương tác bấm vào để xem ý nghĩa Rồng, Sư tử, Chó sói.
    *   **"The Map of Relations":** Hiển thị sơ đồ tư duy (Graph) nối Jung với Freud, Pauli, Nietzsche.
*   **Bộ lọc (Filter Bar):** Cho phép lọc theo: *Nhập môn (Beginner)*, *Chuyên sâu (Hardcore)*, *Huyền bí (Occult)*.

---

## TẦNG 4: PHÒNG THÍ NGHIỆM (THE ALCHEMICAL LAB - INTERACTIVE FOOTER)
*Mục đích: Tương tác cá nhân và Kết thúc.*

Trang web không kết thúc bằng footer thông thường. Nó kết thúc bằng **Công cụ**.

1.  **Synchronicity Dice (Gieo quẻ):** Một nút bấm 3D. Bấm vào sẽ hiện ra một thông điệp ngẫu nhiên (hoặc một lá bài Tarot/Dịch) dành riêng cho người dùng lúc đó.
2.  **Shadow Mirror (Gương soi bóng):** (Nếu có webcam) Hiệu ứng phản chiếu hình ảnh người dùng nhưng bị làm mờ hoặc đổi màu (Negative), kèm dòng chữ: *"Thứ bạn nhìn thấy là Persona. Thứ nhìn lại bạn là Shadow."*
3.  **Newsletter "The Raven":** Đăng ký nhận bài viết mới (Biểu tượng con quạ).

---

## GỢI Ý ĐIỀU HƯỚNG (NAVIGATION FLOW)
*   Đừng dùng Menu ngang truyền thống (Home, About, Contact) ở trên đầu, nó phá vỡ không khí Cinematic.
*   Dùng **Hamburger Menu** (Menu ẩn) ở góc, biểu tượng là hình **Mandala nhỏ**. Khi bấm vào, Mandala xoay và mở ra danh sách các liên kết.

---

## TỔNG KẾT: TẠI SAO CẤU TRÚC NÀY KHÔNG BỎ SÓT THÔNG TIN?
1.  **Phân loại rõ ràng:** Mọi file bạn có đều đã được nhét vào 1 trong 4 Cánh Cửa (Bắc, Nam, Đông, Tây). Không có file nào bị "mồ côi".
2.  **Tầng Grid (Mê cung):** Là nơi hứng tất cả các bài viết nhỏ lẻ (trivia, deep dive) mà không làm loãng luồng chính.
3.  **Tính khám phá:** Người dùng cảm thấy như đang thám hiểm một thư viện cổ chứ không phải đang đọc danh sách link.

---

**© 2026 The Jung Compendium Project.**
*Tài liệu này là một phần của dự án Tái cấu trúc Di sản Carl Jung - Được tối ưu hóa cho Trải nghiệm Kỹ thuật số.*
