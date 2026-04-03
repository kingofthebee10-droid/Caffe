# ☕ HỆ THỐNG QUẢN LÝ QUÁN CAFE TOÀN DIỆN
### Tài liệu Phân tích & Thiết kế Hệ thống (SRS + BRD)

> **Phiên bản:** 1.0.0  
> **Ngày lập:** 02/04/2026  
> **Loại hình:** Phần mềm quản lý doanh nghiệp F&B (Food & Beverage)  
> **Phạm vi triển khai:** Quán cafe đơn lẻ đến chuỗi nhiều chi nhánh

---

## MỤC LỤC

1. [Tổng quan hệ thống](#1-tổng-quan-hệ-thống)
2. [Kiến trúc hệ thống](#2-kiến-trúc-hệ-thống)
3. [Module Bán hàng (POS)](#3-module-bán-hàng-pos)
4. [Module Kho](#4-module-kho)
5. [Module Kế toán & Tài chính](#5-module-kế-toán--tài-chính)
6. [Module Nhân sự](#6-module-nhân-sự)
7. [Module Báo cáo & BI](#7-module-báo-cáo--bi)
8. [Module CRM & Khách hàng](#8-module-crm--khách-hàng)
9. [Yêu cầu kỹ thuật](#9-yêu-cầu-kỹ-thuật)
10. [Phân quyền hệ thống](#10-phân-quyền-hệ-thống)
11. [Lộ trình triển khai](#11-lộ-trình-triển-khai)
12. [Rủi ro & Giải pháp](#12-rủi-ro--giải-pháp)

---

## 1. TỔNG QUAN HỆ THỐNG

### 1.1 Mục tiêu dự án

Xây dựng hệ thống phần mềm quản lý quán cafe tích hợp đầy đủ các nghiệp vụ:
- **Bán hàng nhanh** — giảm thời gian xử lý đơn hàng tại quầy
- **Kiểm soát kho** — theo dõi nguyên liệu real-time, cảnh báo tồn kho thấp
- **Minh bạch tài chính** — hạch toán kế toán tự động, báo cáo thuế
- **Quản lý nhân sự** — chấm công, tính lương, KPI nhân viên
- **Ra quyết định dữ liệu** — dashboard BI cho chủ quán

### 1.2 Đối tượng sử dụng

| Đối tượng | Mô tả |
|-----------|-------|
| Chủ quán / Giám đốc | Theo dõi tổng quan, duyệt chi phí, xem báo cáo |
| Quản lý ca | Mở/đóng ca, quản lý nhân viên theo ngày |
| Thu ngân / Barista | Nhận đơn, xử lý thanh toán |
| Kế toán | Hạch toán, báo cáo tài chính, kê khai thuế |
| Thủ kho | Nhập/xuất kho, kiểm kê nguyên liệu |
| Nhân viên | Chấm công, xem lịch làm việc |

---

## 2. KIẾN TRÚC HỆ THỐNG

### 2.1 Stack công nghệ

| Tầng | Công nghệ | Lý do chọn |
|------|-----------|------------|
| **Frontend Web** | React.js + TypeScript | Component-based, dễ bảo trì |
| **Frontend Mobile** | React Native | Code sharing iOS/Android |
| **Backend API** | Node.js + Express / NestJS | Hiệu năng cao, ecosystem phong phú |
| **Database** | PostgreSQL | ACID, hỗ trợ tốt cho nghiệp vụ tài chính |
| **Cache** | Redis | Session, real-time stock |
| **Queue** | Bull (Redis-based) | Xử lý báo cáo, email bất đồng bộ |
| **Storage** | AWS S3 / MinIO | Hóa đơn, ảnh sản phẩm |
| **Auth** | JWT + Refresh Token | Bảo mật, stateless |

### 2.2 Mô hình triển khai

```
[Tablet POS] ──┐
[Mobile App] ──┼──► [API Gateway] ──► [Backend Services]
[Web Admin]  ──┘         │                    │
                         │              [PostgreSQL]
                    [Redis Cache]        [File Storage]
```

---

## 3. MODULE BÁN HÀNG (POS)

### 3.1 Tính năng cốt lõi

#### 3.1.1 Quản lý thực đơn
- Danh mục sản phẩm: Cà phê, Trà, Nước ép, Bánh ngọt, Đồ ăn nhẹ
- Thuộc tính sản phẩm: Size (S/M/L), Topping, Nhiệt độ (nóng/lạnh), Đường/Đá tùy chỉnh
- Giá theo thời điểm: Happy hour, giá cuối tuần, giá theo ca
- Combo khuyến mãi: Mua 2 tặng 1, set ăn sáng, combo giờ vàng

#### 3.1.2 Xử lý đơn hàng
- Giao diện POS trực quan: Màn hình cảm ứng, tìm kiếm nhanh
- Quản lý bàn: Sơ đồ bàn trực quan, trạng thái (trống/có khách/chờ)
- Tách/gộp đơn: Linh hoạt tách bàn, gộp hóa đơn nhiều bàn
- Ghi chú đơn hàng: Ghi chú đặc biệt theo từng món

#### 3.1.3 Thanh toán
- Phương thức: Tiền mặt, Thẻ ngân hàng, Ví điện tử (MoMo, ZaloPay, VNPay), QR Code
- Xuất hóa đơn: In hóa đơn nhiệt, Email/Zalo/SMS, Hóa đơn điện tử VAT
- Xử lý ngoại lệ: Hoàn tiền/hủy đơn, Đơn hàng tạm giữ, Offline mode

#### 3.1.4 Màn hình bếp (KDS)
- Hiển thị đơn theo thứ tự ưu tiên
- Thông báo khi đơn chuẩn bị xong
- Thời gian chuẩn bị trung bình

---

## 4. MODULE KHO

### 4.1 Tính năng cốt lõi

#### 4.1.1 Quản lý nguyên vật liệu
- Danh mục NVL: Cà phê hạt, Sữa, Trà, Syrup, Bánh, Ly cốc, Giấy lọc...
- Đơn vị tính: kg, lít, hộp, gói, cái... và quy đổi đơn vị
- Mã vạch/QR: Quét mã nhanh khi nhập/xuất kho
- Hạn sử dụng: Cảnh báo NVL sắp hết hạn (trước 3/7/14 ngày)

#### 4.1.2 Nhập kho
- Phiếu nhập kho: Mã phiếu, nhà cung cấp, ngày nhập, người nhận
- Kiểm tra chất lượng: Ghi nhận tình trạng NVL khi nhập
- Tự động cập nhật giá vốn trung bình

#### 4.1.3 Xuất kho
- Xuất theo công thức (Recipe): Tự động trừ kho khi bán hàng
- Xuất hao hụt: Ghi nhận đổ vỡ, hư hỏng có lý do
- Xuất nội bộ: Sử dụng nội bộ, phục vụ nhân viên

#### 4.1.4 Kiểm kê kho
- Kiểm kê định kỳ: Theo ngày/tuần/tháng
- So sánh sổ sách vs thực tế: Highlight chênh lệch
- Điều chỉnh tồn kho: Với lý do và xác nhận quản lý

### 4.2 Công thức sản xuất (Recipe Management)

```yaml
Sản phẩm: Cà phê sữa đá (Size M)
Công thức:
  - Cà phê hạt Arabica: 20g
  - Sữa đặc: 30ml
  - Sữa tươi: 50ml
  - Đá viên: 150g
  - Ly nhựa M: 1 cái
Chi phí nguyên liệu: 8,500 VNĐ
Giá bán: 45,000 VNĐ
Biên lợi nhuận gộp: 81.1%
```

---

## 5. MODULE KẾ TOÁN & TÀI CHÍNH

### 5.1 Sơ đồ tài khoản kế toán

Tuân thủ **Thông tư 200/2014/TT-BTC** của Bộ Tài chính:

- **TÀI SẢN (1xx-2xx)**: Tiền mặt, Tiền gửi NH, Phải thu, Nguyên liệu, TSCĐ
- **NGUỒN VỐN (3xx-4xx)**: Vay ngắn hạn, Phải trả NCC, Thuế, Phải trả NLĐ
- **DOANH THU (5xx)**: Doanh thu bán hàng, Doanh thu HĐTC
- **CHI PHÍ (6xx-8xx)**: Chi phí NVL, Nhân công, QLDN, Bán hàng

### 5.2 Tính năng kế toán

#### 5.2.1 Thu - Chi
- Phiếu thu/chi tiền mặt
- Ủy nhiệm chi qua ngân hàng
- Đối chiếu ngân hàng

#### 5.2.2 Công nợ
- Công nợ phải thu khách hàng
- Công nợ phải trả NCC
- Sổ theo dõi công nợ chi tiết

#### 5.2.3 Tài sản cố định
- Đăng ký TSCĐ: Máy pha cafe, tủ lạnh, bàn ghế...
- Khấu hao tự động
- Thanh lý TSCĐ

#### 5.2.4 Thuế
- VAT đầu vào/đầu ra
- Thuế TNCN tự động
- Thuế TNDN theo kỳ

#### 5.2.5 Báo cáo tài chính
- Bảng cân đối kế toán
- Báo cáo kết quả HĐKD
- Báo cáo lưu chuyển tiền tệ

---

## 6. MODULE NHÂN SỰ

### 6.1 Quản lý hồ sơ nhân viên
- Thông tin cơ bản: Họ tên, CCCD, địa chỉ, SĐT, email
- Vị trí: Quản lý ca, Thu ngân, Barista, Phục vụ...
- Hợp đồng lao động: Tạo từ template, cảnh báo hết hạn

### 6.2 Chấm công
- Phương thức: Vân tay, Nhận diện khuôn mặt, QR Code, GPS
- Quản lý ca: Ca sáng/chiều/tối, xếp ca tự động
- Theo dõi: Đi trễ, về sớm, vắng phép, OT

### 6.3 Tính lương
```
LƯƠNG THÁNG = Lương cơ bản
            + Phụ cấp (ăn ca, xăng xe, điện thoại)
            + Thưởng (doanh số, hiệu quả)
            + Lương OT
            - Khấu trừ (đi trễ, tạm ứng)
            - Bảo hiểm (BHXH 8%, BHYT 1.5%, BHTN 1%)
            - Thuế TNCN
```

### 6.4 KPI đánh giá
- Barista: Số ly/giờ, tỷ lệ phàn nàn, tiết kiệm NVL
- Thu ngân: Thời gian xử lý đơn, tỷ lệ sai lệch tiền
- Quản lý ca: Doanh thu ca, tỷ lệ lãng phí

---

## 7. MODULE BÁO CÁO & BI

### 7.1 Dashboard thời gian thực
- Tổng doanh thu hôm nay, số đơn
- Doanh thu theo giờ
- Top sản phẩm bán chạy
- Tồn kho cảnh báo
- Nhân viên ca hiện tại

### 7.2 Báo cáo bán hàng
- Doanh thu theo giờ/ngày/tuần/tháng
- Top sản phẩm (bán chạy, lợi nhuận cao)
- Phân tích theo bàn, cashier
- Hiệu quả khuyến mãi

### 7.3 Báo cáo kho
- Tồn kho hiện tại
- Nhập-xuất-tồn theo kỳ
- Hao phí, hao hụt
- Food Cost %

### 7.4 Báo cáo nhân sự
- Bảng chấm công tổng hợp
- Chi phí OT
- Tỷ lệ nghỉ việc
- Labor Cost %

---

## 8. MODULE CRM & KHÁCH HÀNG

### 8.1 Quản lý khách hàng thân thiết
- Hồ sơ khách hàng: Tên, SĐT, sinh nhật, sở thích
- Lịch sử mua hàng
- Phân khúc: VIP, Thường xuyên, Thỉnh thoảng, Mới

### 8.2 Chương trình tích điểm
```yaml
Tích điểm:
  - 10,000 VNĐ = 1 điểm
  - Sinh nhật: x2 điểm
  - Cuối tuần: x1.5 điểm

Đổi điểm:
  - 100 điểm = 10,000 VNĐ giảm giá
  - 200 điểm = 1 ly miễn phí
  - 500 điểm = voucher 100,000 VNĐ

Hạng thành viên:
  - Bronze: 0-499 điểm
  - Silver: 500-1,999 điểm → 5% ưu đãi
  - Gold: 2,000-4,999 điểm → 10% ưu đãi
  - Platinum: 5,000+ điểm → 15% ưu đãi
```

### 8.3 Marketing tự động
- Email/SMS sinh nhật
- Re-engagement sau 30 ngày không ghé
- Push notification khuyến mãi

---

## 9. YÊU CẦU KỸ THUẬT

### 9.1 Hiệu năng
| Chỉ số | Yêu cầu |
|--------|---------|
| Thời gian phản hồi API | < 200ms (95th percentile) |
| Thời gian tải trang | < 2 giây |
| Xử lý đồng thời | 50 cashier cùng lúc |
| Uptime | 99.9% |
| Backup dữ liệu | Mỗi 1 giờ, lưu 30 ngày |

### 9.2 Bảo mật
- HTTPS/TLS 1.3
- Mã hóa database AES-256
- 2FA cho admin
- Audit Log
- Session timeout 30 phút

### 9.3 Tích hợp bên thứ ba
- **Thanh toán**: VNPay, MoMo, ZaloPay
- **Kế toán**: MISA, FAST, BRAVO
- **Hóa đơn điện tử**: VNPT Invoice, Viettel CA
- **Delivery**: Shopee Food, GrabFood
- **Zalo OA**: Thông báo khách hàng

---

## 10. PHÂN QUYỀN HỆ THỐNG

```
OWNER (Chủ quán)
├── Xem tất cả báo cáo
├── Duyệt chi phí lớn
├── Cấu hình hệ thống
└── Quản lý tài khoản

MANAGER (Quản lý)
├── Mở/đóng ca
├── Duyệt điều chỉnh tồn kho
├── Xem báo cáo chi nhánh
└── Quản lý lịch làm việc

CASHIER (Thu ngân)
├── Tạo/sửa đơn hàng
├── Xử lý thanh toán
└── Xem menu, giá

BARISTA
├── Xem đơn hàng đang chế
└── Cập nhật trạng thái đơn

ACCOUNTANT (Kế toán)
├── Tất cả module kế toán
├── Nhập phiếu thu/chi
└── Xuất báo cáo tài chính

INVENTORY (Thủ kho)
├── Nhập/xuất kho
├── Kiểm kê
└── Xem tồn kho
```

---

## 11. LỘ TRÌNH TRIỂN KHAI

### Phase 1 — MVP (Tháng 1-3)
- [x] Setup hạ tầng, database schema
- [ ] Module POS cơ bản (nhận đơn, thanh toán tiền mặt)
- [ ] Quản lý menu, giá
- [ ] Báo cáo doanh thu ngày
- [ ] Chấm công thủ công
- [ ] Tính lương cơ bản

### Phase 2 — Core Features (Tháng 4-6)
- [ ] Module kho đầy đủ (nhập/xuất/kiểm kê)
- [ ] Recipe management
- [ ] Tích hợp thanh toán MoMo, ZaloPay, VNPay
- [ ] Kế toán: sổ quỹ, công nợ
- [ ] Dashboard real-time
- [ ] App mobile cho nhân viên

### Phase 3 — Advanced (Tháng 7-9)
- [ ] Hóa đơn điện tử VAT
- [ ] Báo cáo tài chính đầy đủ
- [ ] KPI nhân viên tự động
- [ ] CRM + tích điểm khách hàng
- [ ] Tích hợp Shopee Food / GrabFood

### Phase 4 — Scale (Tháng 10-12)
- [ ] Quản lý đa chi nhánh
- [ ] Điều chuyển kho giữa chi nhánh
- [ ] Tổng hợp báo cáo toàn chuỗi
- [ ] Nhượng quyền module
- [ ] API mở cho tích hợp thứ 3

---

## 12. RỦI RO & GIẢI PHÁP

| # | Rủi ro | Xác suất | Tác động | Giải pháp |
|---|--------|----------|----------|-----------|
| 1 | Mất điện/internet giờ cao điểm | Cao | Nghiêm trọng | Offline mode, sync khi có mạng |
| 2 | Nhân viên từ chối học phần mềm mới | Trung bình | Trung bình | UI đơn giản, training có thưởng |
| 3 | Dữ liệu không khớp sổ sách cũ | Cao | Trung bình | Migration tool + kiểm tra song song |
| 4 | Lỗi tính lương gây khiếu nại | Thấp | Nghiêm trọng | Review 2 bước trước khi duyệt |
| 5 | Vi phạm dữ liệu cá nhân (PDPA) | Thấp | Nghiêm trọng | Mã hóa, phân quyền, audit log |
| 6 | Tích hợp cổng thanh toán thất bại | Trung bình | Cao | Fallback tiền mặt, support 24/7 |

---

*Tài liệu này được lập bởi bộ phận phân tích nghiệp vụ. Mọi thay đổi cần được phê duyệt bởi Product Owner.*

**Phiên bản:** 1.0.0 | **Cập nhật lần cuối:** 02/04/2026
