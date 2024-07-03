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
