### index.html

**Bước 1: Thêm chức năng để bắt đầu trò chơi**

Thêm mã vào hàm `startGame` để gửi yêu cầu GET tới API để bắt đầu trò chơi:

```javascript
async function startGame() {
  const response = await fetch('http://localhost:3000/api/number');
  const data = await response.json();
  document.getElementById('message').innerText = data.message;
}
```

**Giải thích:**
- `fetch` gửi một yêu cầu GET tới API.
- Kết quả nhận được từ máy chủ được chuyển đổi thành JSON và cập nhật vào phần tử HTML có id `message`.

**Bước 2: Thêm chức năng để gửi dự đoán**

Thêm mã vào hàm `makeGuess` để gửi yêu cầu POST với dự đoán của người dùng:

```javascript
async function makeGuess() {
  const guess = document.getElementById('guessInput').value;
  const response = await fetch('http://localhost:3000/api/guess', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ guess: parseInt(guess) })
  });
  const data = await response.json();
  document.getElementById('message').innerText = data.message;
}
```

**Giải thích:**
- `fetch` gửi một yêu cầu POST tới API với dự đoán của người dùng.
- Kết quả nhận được từ máy chủ được chuyển đổi thành JSON và cập nhật vào phần tử HTML có id `message`.

**Toàn bộ tệp `index.html` sau khi hoàn thiện:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Number Guessing Game</title>
</head>
<body>
  <h1>Number Guessing Game</h1>
  <p id="message">Press "Start Game" to begin!</p>
  <input type="number" id="guessInput" placeholder="Enter your guess" />
  <button onclick="makeGuess()">Submit Guess</button>
  <button onclick="startGame()">Start Game</button>

  <script>
    async function startGame() {
      const response = await fetch('http://localhost:3000/api/number');
      const data = await response.json();
      document.getElementById('message').innerText = data.message;
    }

    async function makeGuess() {
      const guess = document.getElementById('guessInput').value;
      const response = await fetch('http://localhost:3000/api/guess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ guess: parseInt(guess) })
      });
      const data = await response.json();
      document.getElementById('message').innerText = data.message;
    }
  </script>
</body>
</html>
```

---

### server.js

**Bước 1: Thêm logic để bắt đầu trò chơi**

Thêm logic vào route `GET /api/number` để gửi thông điệp bắt đầu trò chơi:
```javascript
app.get('/api/number', (req, res) => {
  res.json({ message: 'Số ngẫu hứng đã được tạo ra. Đoán xem, đấy là số mấy!' });
});
```

**Giải thích:**
- Khi có yêu cầu GET tới `/api/number`, máy chủ sẽ gửi lại một thông điệp JSON thông báo bắt đầu trò chơi.

**Bước 2: Thêm logic để xử lý dự đoán**

Thêm logic vào route `POST /api/guess` để xử lý dự đoán từ người dùng:

```javascript
let randomNumber = Math.floor(Math.random() * 100) + 1;

app.post('/api/guess', (req, res) => {
  const { guess } = req.body;
  if (!guess) {
    return res.status(400).json({ error: 'Nhập số vô đi bạn eyyy :U' });
  }

  if (guess < randomNumber) {
    res.json({ message: 'Bé quá bây!' });
  } else if (guess > randomNumber) {
    res.json({ message: 'Cao quá bây!' });
  } else {
    res.json({ message: 'JUAN KO CẦN CHỈNH!' });
    randomNumber = Math.floor(Math.random() * 100) + 1;
  }
});
```

**Giải thích:**
- `randomNumber` được tạo ra một lần ngẫu nhiên từ 1 đến 100 khi máy chủ khởi động.
- Khi có yêu cầu POST tới `/api/guess`, máy chủ sẽ kiểm tra dự đoán và phản hồi lại thông điệp tương ứng.
- Nếu dự đoán đúng, số ngẫu nhiên mới sẽ được tạo ra.

**Toàn bộ tệp `server.js` sau khi hoàn thiện:**
```javascript
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

let randomNumber = Math.floor(Math.random() * 100) + 1;

app.use(cors());
app.use(express.json());

app.get('/api/number', (req, res) => {
  res.json({ message: 'Số ngẫu hứng đã được tạo ra. Đoán xem, đấy là số mấy!' });
});

app.post('/api/guess', (req, res) => {
  const { guess } = req.body;
  if (!guess) {
    return res.status(400).json({ error: 'Nhập số vô đi bạn eyyy :U' });
  }

  if (guess < randomNumber) {
    res.json({ message: 'Bé quá bây!' });
  } else if (guess > randomNumber) {
    res.json({ message: 'Cao quá bây!' });
  } else {
    res.json({ message: 'JUAN KO CẦN CHỈNH!' });
    randomNumber = Math.floor(Math.random() * 100) + 1;
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```
