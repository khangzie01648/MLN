export interface PillarConfig {
    id: string;
    name: string;
    nameVi: string;
    subtitle?: string;
    description: string;
    icon?: string;
    color: string;
    articles?: any[]; // Keep it optional for client-side
}

export const PILLAR_META: Record<string, PillarConfig> = {
    biography: { id: "biography", name: "Biography", nameVi: "TIỂU SỬ & CUỘC ĐỜI", description: "Hành trình từ Kesswil đến Cận tử.", color: "#ef4444" },
    concepts: { id: "concepts", name: "Concepts", nameVi: "CẤU TRÚC TÂM THỨC", description: "Bản đồ của Ego, Shadow và Self.", color: "#3b82f6" },
    red_book: { id: "red_book", name: "The Red Book", nameVi: "SÁCH ĐỎ & THỊ KIẾN", description: "Cuộc đối đầu vĩ đại với Vô thức.", color: "#dc2626" },
    alchemy: { id: "alchemy", name: "Alchemy", nameVi: "GIẢ KIM THUẬT", description: "Sự chuyển hóa tâm lý qua biểu tượng.", color: "#eab308" },
    practice: { id: "practice", name: "Practice", nameVi: "THỰC HÀNH & TRỊ LIỆU", description: "Giải mộng và Active Imagination.", color: "#10b981" },
    symbols: { id: "symbols", name: "Symbols", nameVi: "BIỂU TƯỢNG HỌC", description: "Ngôn ngữ của giấc mơ và thần thoại.", color: "#8b5cf6" },
    spirit: { id: "spirit", name: "Spirit", nameVi: "TÂM LINH & TÔN GIÁO", description: "Gnosis, Phương Đông và Thiên Chúa.", color: "#f97316" },
    legacy: { id: "legacy", name: "Legacy", nameVi: "DI SẢN & TƯƠNG LAI", description: "MBTI, Văn hóa đại chúng và AI.", color: "#ec4899" },
    cosmos: { id: "cosmos", name: "Cosmos", nameVi: "VŨ TRỤ & ĐỒNG BỘ", description: "Sự gặp gỡ giữa Vật lý và Tâm lý.", color: "#6366f1" },
    encounters: { id: "encounters", name: "Encounters", nameVi: "QUAN HỆ & GẶP GỠ", description: "Freud, Pauli và những cuộc gặp định mệnh.", color: "#06b6d4" }
};

// Array for iteration in UI
export const PILLARS: PillarConfig[] = Object.values(PILLAR_META);
