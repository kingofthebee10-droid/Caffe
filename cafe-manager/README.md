# ☕ CAFE MANAGER - HỆ THỐNG QUẢN LÝ QUÁN CAFE TOÀN DIỆN

> **Phiên bản:** 1.0.0  
> **Ngày khởi tạo:** 02/04/2026  
> **Stack công nghệ:** React.js + Node.js + PostgreSQL

---

## 📋 MỤC LỤC

- [Giới thiệu](#giới-thiệu)
- [Kiến trúc hệ thống](#kiến-trúc-hệ-thống)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Cài đặt & Chạy dự án](#cài-đặt--chạy-dự-án)
- [Các module chính](#các-module-chính)
- [Lộ trình phát triển](#lộ-trình-phát-triển)
- [Đóng góp](#đóng-góp)
- [License](#license)

---

## GIỚI THIỆU

**Cafe Manager** là hệ thống phần mềm quản lý quán cafe tích hợp đầy đủ các nghiệp vụ:

- ✅ **Bán hàng (POS)** - Xử lý đơn hàng nhanh, hỗ trợ nhiều phương thức thanh toán
- ✅ **Quản lý kho** - Theo dõi nguyên liệu real-time, cảnh báo tồn kho
- ✅ **Kế toán & Tài chính** - Hạch toán tự động, báo cáo thuế
- ✅ **Nhân sự (HRM)** - Chấm công, tính lương, KPI
- ✅ **CRM** - Quản lý khách hàng thân thiết, tích điểm
- ✅ **Báo cáo & BI** - Dashboard trực quan, phân tích dữ liệu

---

## KIẾN TRÚC HỆ THỐNG

```
┌─────────────────────────────────────────────────────────┐
│                   CAFE MANAGER SYSTEM                    │
├──────────┬──────────┬──────────┬──────────┬─────────────┤
│  BÁN     │   KHO    │  KẾ      │  NHÂN    │   BÁO CÁO  │
│  HÀNG    │          │  TOÁN    │  SỰ      │   & BI      │
│  (POS)   │          │          │          │             │
└──────────┴──────────┴──────────┴──────────┴─────────────┘
                         │
              ┌──────────┴──────────┐
              │   DATABASE TRUNG    │
              │   TÂM (PostgreSQL)  │
              └─────────────────────┘
```

### Stack công nghệ

| Tầng | Công nghệ |
|------|-----------|
| Frontend Web | React.js + TypeScript + Vite |
| Frontend Mobile | React Native |
| Backend API | Node.js + Express/NestJS + TypeScript |
| Database | PostgreSQL |
| Cache | Redis |
| Queue | Bull (Redis-based) |
| Storage | AWS S3 / MinIO |
| Auth | JWT + Refresh Token |

---

## CẤU TRÚC THƯ MỤC

```
cafe-manager/
├── backend/                 # Backend API (Node.js)
│   ├── src/
│   │   ├── modules/        # Các module nghiệp vụ
│   │   │   ├── pos/        # Bán hàng
│   │   │   ├── inventory/  # Kho
│   │   │   ├── accounting/ # Kế toán
│   │   │   ├── hrm/        # Nhân sự
│   │   │   ├── crm/        # Khách hàng
│   │   │   ├── reporting/  # Báo cáo
│   │   │   └── admin/      # Quản trị
│   │   ├── config/         # Cấu hình
│   │   ├── middleware/     # Middleware
│   │   └── utils/          # Tiện ích
│   ├── database/
│   │   └── migrations/     # Database migrations
│   └── tests/              # Unit tests
│
├── frontend/               # Web Admin (React.js)
│   ├── src/
│   │   ├── components/    # Components chung
│   │   ├── pages/         # Pages theo module
│   │   ├── services/      # API calls
│   │   ├── hooks/         # Custom hooks
│   │   ├── store/         # State management
│   │   └── utils/         # Utilities
│   └── public/
│
├── mobile/                 # Mobile App (React Native)
│   ├── src/
│   │   ├── components/
│   │   ├── screens/
│   │   ├── services/
│   │   └── navigation/
│   └── public/
│
├── docs/                   # Tài liệu
│   └── SRS_BRD.md         # Phân tích & Thiết kế
│
└── scripts/                # Scripts tiện ích
```

---

## CÔNG NGHỆ SỬ DỤNG

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js / NestJS
- **Language:** TypeScript
- **Database:** PostgreSQL 15+
- **ORM:** Prisma / TypeORM
- **Cache:** Redis
- **Validation:** Joi / class-validator
- **Testing:** Jest

### Frontend Web
- **Framework:** React 18+
- **Build Tool:** Vite
- **Language:** TypeScript
- **State Management:** Redux Toolkit / Zustand
- **UI Library:** Ant Design / Material UI
- **HTTP Client:** Axios
- **Charts:** Recharts / Chart.js

### Mobile
- **Framework:** React Native
- **Navigation:** React Navigation
- **State Management:** Redux Toolkit / Zustand
- **HTTP Client:** Axios

---

## CÀI ĐẶT & CHẠY DỰ ÁN

### Yêu cầu hệ thống
- Node.js 18+
- PostgreSQL 15+
- Redis 7+
- npm/yarn/pnpm

### Cài đặt Backend

```bash
cd backend

# Cài đặt dependencies
npm install

# Cấu hình biến môi trường
cp .env.example .env
# Chỉnh sửa .env với thông tin database, redis...

# Chạy migrations
npm run db:migrate

# Khởi động development server
npm run dev

# Build production
npm run build
```

### Cài đặt Frontend

```bash
cd frontend

# Cài đặt dependencies
npm install

# Khởi động development server
npm run dev

# Build production
npm run build
```

### Cài đặt Mobile

```bash
cd mobile

# Cài đặt dependencies
npm install

# iOS
cd ios && pod install && cd ..
npm run ios

# Android
npm run android
```

---

## CÁC MODULE CHÍNH

### 1. Module Bán hàng (POS)
- Quản lý thực đơn, biến thể sản phẩm
- Xử lý đơn hàng, tách/gộp bàn
- Thanh toán đa dạng (tiền mặt, thẻ, ví điện tử, QR)
- Màn hình bếp (KDS)
- Hóa đơn điện tử

### 2. Module Kho
- Quản lý nguyên vật liệu, nhà cung cấp
- Nhập/xuất kho, kiểm kê
- Công thức sản xuất (Recipe)
- Cảnh báo tồn kho thấp
- Theo dõi hạn sử dụng

### 3. Module Kế toán
- Sổ quỹ thu/chi
- Công nợ phải thu/phải trả
- Tài sản cố định & khấu hao
- Thuế VAT, TNCN, TNDN
- Báo cáo tài chính (B/S, P&L, CF)

### 4. Module Nhân sự
- Hồ sơ nhân viên, hợp đồng
- Chấm công (vân tay, QR, GPS)
- Xếp ca làm việc
- Tính lương tự động
- KPI đánh giá hiệu suất

### 5. Module CRM
- Hồ sơ khách hàng
- Chương trình tích điểm
- Hạng thành viên (Bronze/Silver/Gold/Platinum)
- Marketing tự động (sinh nhật, re-engagement)

### 6. Module Báo cáo & BI
- Dashboard real-time
- Báo cáo bán hàng, kho, nhân sự
- Phân tích Food Cost, Labor Cost
- Export Excel/PDF/CSV

---

## LỘ TRÌNH PHÁT TRIỂN

### Phase 1 — MVP (Tháng 1-3)
- [x] Setup hạ tầng, database schema
- [ ] Module POS cơ bản
- [ ] Quản lý menu
- [ ] Báo cáo doanh thu ngày
- [ ] Chấm công thủ công

### Phase 2 — Core Features (Tháng 4-6)
- [ ] Module kho đầy đủ
- [ ] Recipe management
- [ ] Tích hợp thanh toán
- [ ] Kế toán cơ bản
- [ ] Dashboard real-time

### Phase 3 — Advanced (Tháng 7-9)
- [ ] Hóa đơn điện tử
- [ ] Báo cáo tài chính đầy đủ
- [ ] KPI tự động
- [ ] CRM + tích điểm

### Phase 4 — Scale (Tháng 10-12)
- [ ] Đa chi nhánh
- [ ] Điều chuyển kho
- [ ] Nhượng quyền module
- [ ] API mở

---

## ĐÓNG GÓP

Chúng tôi chào đón mọi đóng góp! Vui lòng đọc [CONTRIBUTING.md](./docs/CONTRIBUTING.md) để biết chi tiết.

### Quy trình Git
```bash
# Tạo branch feature mới
git checkout -b feature/tinh-nang-moi

# Commit theo chuẩn Conventional Commits
git commit -m "feat(pos): thêm chức năng tách bàn"

# Push và tạo Pull Request
git push origin feature/tinh-nang-moi
```

---

## LICENSE

MIT License - Xem [LICENSE](./LICENSE) để biết chi tiết.

---

## LIÊN HỆ

- **Email:** support@cafemanager.vn
- **Website:** https://cafemanager.vn
- **Documentation:** https://docs.cafemanager.vn

---

*© 2026 Cafe Manager. All rights reserved.*
