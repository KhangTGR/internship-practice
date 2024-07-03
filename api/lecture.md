# API (Application Programming Interface)

## 1. Định Nghĩa
- Một **<span style="color:#ff9999;">tập hợp các quy tắc</span>** và **<span style="color:#ff9999;">giao thức</span>** cho phép các **<span style="color:#ffcc99;">ứng dụng phần mềm</span>** giao tiếp với nhau.
- Định nghĩa các **<span style="color:#ff9999;">phương thức</span>** mà một chương trình có thể **<span style="color:#ffcc99;">tương tác</span>** với một chương trình khác, thường là thông qua mạng.

### Mục Tiêu và Mục Đích của API:
- **<span style="color:#99cc99;">Kết nối và Tương tác</span>**: Cho phép các **<span style="color:#ffcc99;">ứng dụng</span>** và **<span style="color:#ffcc99;">dịch vụ</span>** khác nhau có thể kết nối và tương tác với nhau một cách **<span style="color:#99cc99;">hiệu quả</span>** và **<span style="color:#99cc99;">bảo mật</span>**.
- **<span style="color:#99cc99;">Tái Sử Dụng</span>**: API giúp tái sử dụng các **<span style="color:#ffcc99;">chức năng</span>** hiện có của một **<span style="color:#ffcc99;">ứng dụng</span>** hoặc **<span style="color:#ffcc99;">dịch vụ</span>** mà không cần phải xây dựng lại từ đầu.
- **<span style="color:#99cc99;">Tăng Tốc Độ Phát Triển</span>**: Nhờ có API, các **<span style="color:#ffcc99;">nhà phát triển</span>** có thể tận dụng các **<span style="color:#ffcc99;">dịch vụ</span>** hiện có để nhanh chóng phát triển các **<span style="color:#ffcc99;">tính năng mới</span>**.
- **<span style="color:#99cc99;">Mở Rộng Khả Năng</span>**: API cho phép mở rộng khả năng của **<span style="color:#ffcc99;">ứng dụng</span>** bằng cách **<span style="color:#ffcc99;">tích hợp</span>** với các **<span style="color:#ffcc99;">dịch vụ</span>** và **<span style="color:#ffcc99;">nền tảng</span>** khác.

### Lý Do Tồn Tại của API:
- Giải quyết nhu cầu **<span style="color:#ffcc99;">kết nối</span>** các hệ thống khác nhau trong môi trường công nghệ phức tạp.
- Chuẩn hóa **<span style="color:#ffcc99;">giao tiếp</span>** giữa các hệ thống, đảm bảo **<span style="color:#ffcc99;">dữ liệu</span>** và **<span style="color:#ffcc99;">dịch vụ</span>** có thể được truy cập một cách đồng nhất và bảo mật.

## 2. RESTful API Và Các Methods
- Là một phong cách **<span style="color:#ffcc99;">kiến trúc</span>** sử dụng các **<span style="color:#ffcc99;">nguyên tắc</span>** của **<span style="color:#ffcc99;">REST (Representational State Transfer)</span>** để thiết kế các **<span style="color:#ffcc99;">dịch vụ web</span>**. 
- Một trong những phương pháp phổ biến nhất để xây dựng API nhờ vào **<span style="color:#ff9999;">tính đơn giản</span>**, **<span style="color:#ff9999;">hiệu quả</span>** và **<span style="color:#ff9999;">khả năng mở rộng</span>**.

### Các Phương Thức (Methods) trong RESTful API:
- **<span style="color:#ffcc99;">GET</span>**: Sử dụng để **<span style="color:#ffcc99;">truy xuất thông tin</span>** từ **<span style="color:#ffcc99;">máy chủ</span>**. Đây là phương thức chỉ đọc và không thay đổi trạng thái của **<span style="color:#ffcc99;">tài nguyên</span>**.
  - **Ví dụ**: Lấy danh sách các người dùng từ một **<span style="color:#ffcc99;">dịch vụ</span>**.
- **<span style="color:#ffcc99;">POST</span>**: Sử dụng để gửi **<span style="color:#ffcc99;">dữ liệu</span>** tới **<span style="color:#ffcc99;">máy chủ</span>** nhằm tạo mới một **<span style="color:#ffcc99;">tài nguyên</span>**.
  - **Ví dụ**: Tạo một người dùng mới trong hệ thống.
- **<span style="color:#ffcc99;">PUT</span>**: Sử dụng để cập nhật toàn bộ thông tin của một **<span style="color:#ffcc99;">tài nguyên</span>** hiện có trên **<span style="color:#ffcc99;">máy chủ</span>**.
  - **Ví dụ**: Cập nhật thông tin chi tiết của một người dùng.
- **<span style="color:#ffcc99;">PATCH</span>**: Sử dụng để cập nhật một phần thông tin của một **<span style="color:#ffcc99;">tài nguyên</span>** hiện có.
  - **Ví dụ**: Thay đổi địa chỉ email của một người dùng.
- **<span style="color:#ffcc99;">DELETE</span>**: Sử dụng để xóa một **<span style="color:#ffcc99;">tài nguyên</span>** hiện có trên **<span style="color:#ffcc99;">máy chủ</span>**.
  - **Ví dụ**: Xóa một người dùng khỏi hệ thống.

### Ưu Điểm của RESTful API:
- **<span style="color:#99cc99;">Dễ Sử Dụng</span>**: RESTful API thường sử dụng các **<span style="color:#ffcc99;">chuẩn giao thức web</span>** như **<span style="color:#ffcc99;">HTTP</span>**, khiến nó dễ dàng tiếp cận và sử dụng.
- **<span style="color:#99cc99;">Tính Linh Hoạt</span>**: RESTful API có thể trả về **<span style="color:#ffcc99;">dữ liệu</span>** dưới nhiều định dạng khác nhau như **<span style="color:#ffcc99;">JSON</span>**, **<span style="color:#ffcc99;">XML</span>**, v.v.
- **<span style="color:#99cc99;">Khả Năng Mở Rộng</span>**: RESTful API dễ dàng mở rộng và bảo trì nhờ vào cách tổ chức rõ ràng và sử dụng các **<span style="color:#ffcc99;">phương thức HTTP chuẩn</span>**.

## 3. API Specification (API Spec)

### API Spec là gì?
- **API Specification** (**API Spec**) là một **<span style="color:#ff9999;">tài liệu</span>** chi tiết mô tả các **<span style="color:#ffcc99;">endpoint</span>**, **<span style="color:#ffcc99;">phương thức HTTP</span>**, **<span style="color:#ffcc99;">tham số</span>**, và **<span style="color:#ffcc99;">định dạng dữ liệu</span>** mà API hỗ trợ.
- API Spec cung cấp một **<span style="color:#ff9999;">bản mô tả chính xác</span>** và **<span style="color:#ff9999;">đồng nhất</span>** về cách mà API nên được sử dụng và tích hợp.

### Các Tools hỗ trợ viết API Spec:
- **<span style="color:#ffcc99;">Swagger/OpenAPI</span>**: Một trong những công cụ phổ biến nhất cho phép tạo và tài liệu hóa API theo chuẩn **<span style="color:#ffcc99;">OpenAPI Specification</span>**.
- **<span style="color:#ffcc99;">Postman</span>**: Ngoài việc là một công cụ kiểm thử API mạnh mẽ, Postman còn hỗ trợ tạo và duy trì tài liệu API.
