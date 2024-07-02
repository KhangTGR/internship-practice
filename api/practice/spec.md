# API Specification cho Trò Chơi Đoán Số

## Tổng Quan
API này cho phép người dùng tham gia trò chơi đoán số. Máy chủ sẽ tạo ra một số ngẫu nhiên, và người dùng cố gắng đoán số này bằng cách gửi các đoán của họ đến máy chủ. Máy chủ sẽ trả về gợi ý để hướng dẫn người dùng.

## URL Cơ Bản
```
http://localhost:3000
```

## Các Điểm Cuối (Endpoints)

### 1. Lấy Tin Nhắn Ban Đầu

#### Điểm Cuối
```
GET /api/number
```

#### Mô Tả
Trả về một tin nhắn ban đầu để bắt đầu trò chơi. Điều này không trả về số ngẫu nhiên nhưng thông báo cho người dùng biết rằng đã có một số ngẫu nhiên được tạo ra.

#### Phản Hồi
- **200 OK**

  ```json
  {
    "message": "Số ngẫu hứng đã được tạo ra. Đoán xem, đấy là số mấy!"
  }
  ```

### 2. Gửi Đoán Số

#### Điểm Cuối
```
POST /api/guess
```

#### Mô Tả
Gửi đoán của người dùng và nhận lại gợi ý về việc đoán của họ là quá thấp, quá cao hoặc chính xác.

#### Thân Yêu Cầu
- **Content-Type:** application/json

  ```json
  {
    "guess": number
  }
  ```

#### Phản Hồi
- **200 OK** (Đoán quá thấp)

  ```json
  {
    "message": "Bé quá bây!"
  }
  ```

- **200 OK** (Đoán quá cao)

  ```json
  {
    "message": "Cao quá bây!"
  }
  ```

- **200 OK** (Đoán chính xác)

  ```json
  {
    "message": "JUAN KO CẦN CHỈNH!"
  }
  ```

  *Lưu ý:* Khi người dùng đoán đúng, máy chủ sẽ tạo một số ngẫu nhiên mới cho vòng chơi tiếp theo.

- **400 Bad Request** (Thiếu thông tin đoán)

  ```json
  {
    "error": "Nhập số vô đi bạn eyyy :U"
  }
  ```

## Ví Dụ Sử Dụng

### 1. Lấy Tin Nhắn Ban Đầu
#### Yêu Cầu
```sh
GET /api/number HTTP/1.1
Host: localhost:3000
```

#### Phản Hồi
```json
{
  "message": "Số ngẫu hứng đã được tạo ra. Đoán xem, đấy là số mấy!"
}
```

### 2. Gửi Đoán Số
#### Yêu Cầu
```sh
POST /api/guess HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "guess": 50
}
```

#### Phản Hồi (Ví dụ về đoán quá thấp)
```json
{
  "message": "Bé quá bây!"
}
```
