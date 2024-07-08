const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const randomstring = require("randomstring");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
const port = 3000;

app.use(bodyParser.json());

// Hardcoded list of phone numbers
const otpCache = {};

// Secret key for jwt
const JWT_SKEY = "12345";

let randomNumber = Math.floor(Math.random() * 100) + 1;

const users = [
  {
    username: "1",
    password: "abc",
    profile: {
      age: "20",
      gender: "female",
    },
    stats: {
      totalGuesses: 0,
      correctGuesses: 0,
      successRate: 0.0,
    },
  },
  {
    username: "2",
    password: "abc",
    profile: {
      age: "25",
      gender: "male",
    },
    stats: {
      totalGuesses: 0,
      correctGuesses: 0,
      successRate: 0.0,
    },
  },
  {
    username: "3",
    password: "abc",
    profile: {
      age: "30",
      gender: "female",
    },
    stats: {
      totalGuesses: 0,
      correctGuesses: 0,
      successRate: 0.0,
    },
  },
];

const verifyToken = (req, res, next) => {
  const isToken =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (isToken) {
    jwt.verify(isToken, JWT_SKEY, (err, payload) => {
      if (err) {
        res.json(err);
      } else {
        req.payload = payload;
        next();
      }
    });
  } else {
    res.sendStatus(401);
  }
};

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const genotp = randomstring.generate({
    length: 6,
    charset: "numeric",
  });
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    otpCache[username] = genotp;
    res.json({
      otp: genotp,
      message: "Nhập OTP dô",
    });
  } else {
    res.json({
      error: "Gõ sai username, password kìa :U",
      message: "Gõ sai username, password kìa :U",
    });
  }
});

app.post("/verify", (req, res) => {
  const username = req.body.username;
  const otp = req.body.otp;
  if (otpCache[username] && otp == otpCache[username]) {
    const token = jwt.sign({ username }, JWT_SKEY, { expiresIn: "30m" });
    res.setHeader("Authorization", `Bearer ${token}`);
    res.json({
      message: "Đăng nhập thành công yey",
    });
  } else {
    res.json({
      error: "Có đúng mã OTP không đó 😒",
      message: "Có đúng mã OTP không đó 😒",
    });
  }
  delete otpCache[username];
});

app.get("/start", verifyToken, (req, res) => {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  res.json({
    message: "Oke, đoán đi :3",
  });
});

app.get("/guess", verifyToken, (req, res) => {
  const guess = req.query.number;
  if (guess > randomNumber) {
    res.json({
      result: "Caohondaitao",
      message: "Caohondaitao",
    });
  } else if (guess < randomNumber) {
    res.json({
      result: "Behondaitao",
      message: "Behondaitao",
    });
  } else if (!guess) {
    res.json({
      error: "Chưa bắt đầu đã đòi đoán à 😏",
      message: "Chưa bắt đầu đã đòi đoán à 😏",
    });
  } else {
    res.json({
      result: "JUAN JUAN JUAN 💯",
      message: "JUAN JUAN JUAN 💯",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
