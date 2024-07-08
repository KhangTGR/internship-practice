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

const users = {
  "836472473": {
    username: "hehe",
    email: "hapiboday@gmail.com"
  },
  "9133338767": {
    username: "hihi",
    email: "kinbarbekiu@gmail.com"
  },
  "4967856248": {
    username: "hoho",
    email: "aiwannapatee@gmail.com"
  },
};

const verifyToken = (req, res, next) => {
  const isToken = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (isToken) {
    jwt.verify(isToken, JWT_SKEY, (err, payload) => {
      if (err) {
        res.json(err)
      } else {
        req.payload = payload;
        next();
      }
    })
  } else {
    res.sendStatus(401);
  }
}

app.post("/login", (req, res) => {
  const phone = req.body.phoneNumber;
  const genotp = randomstring.generate({
    length: 6,
    charset: "numeric",
  });
  if (users[phone]) {
    otpCache[phone] = genotp;
    res.json({
      otp: genotp,
      message: "Enter your OTP",
    });
  } else {
    res.json({
      error: "Phone number not registered",
      message: "Phone number not registered, please try again.",
    });
  }
});

app.post("/verify", (req, res) => {
  const phone = req.body.phoneNumber;
  const otp = req.body.otp;
  if (otpCache[phone] && otp == otpCache[phone]) {
    const token = jwt.sign({ phone }, JWT_SKEY, { expiresIn : "30m"});
    res.setHeader("Authorization", `Bearer ${token}`);
    res.json({
      message: "Login successful!",
    });
  } else {
    res.json({
      error: "Invalid OTP or phone number",
      message: "Invalid OTP",
    });
  }
  delete otpCache[phone];
});

app.get("/profile", verifyToken, (req, res) => {
  const phoneNumber = req.payload.phone;

  if (users[phoneNumber]) {
    const userInfo = users[phoneNumber];
    res.json(userInfo);
  } else {
    res.sendStatus(404).json("User not found~");
  }
})


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
