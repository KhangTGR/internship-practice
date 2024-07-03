const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

let randomNumber = Math.floor(Math.random() * 100) + 1;

app.use(cors());
app.use(express.json());

app.get('/api/number', (req, res) => {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  res.json(
    {
      "message": "Số ngẫu hứng đã được tạo ra. Đoán xem, đấy là số mấy!"
    }
  )
});

app.post('/api/guess', (req, res) => {
  const guess = req.body.guess;
  if (guess > randomNumber) {
      res.json(
        {
          "message": "Cao quá bây!"
        }
      )
  } else if (guess < randomNumber) {
    res.json(
      {
        "message": "Bé quá bây!"
      }
    )
  } else {
    res.json(
      {
        "message": "JUAN KO CẦN CHỈNH!"
      }
    )
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
