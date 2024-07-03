const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const randomstring = require("randomstring");

const app = express();
app.use(cors());
const port = 3000;

app.use(bodyParser.json());

// Hardcoded list of phone numbers
const phoneNumbers = ["836472473", "9133338767", "4967856248", "6043659811"];
const otpCache = {};

app.post("/login", (req, res) => {
  const phone = req.body.phoneNumber;
  const genotp = randomstring.generate({
    length: 6,
    charset: "numeric",
  });
  if (phoneNumbers.includes(phone)) {
    res.json({
      otp: genotp,
      message: "Enter your OTP",
    });
    otpCache[phone] = genotp;
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
