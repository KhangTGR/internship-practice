// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const randomstring = require('randomstring');
const jwt = require('jsonwebtoken');

// Initialize Express app
const app = express();
const port = 3000; // Set your desired port number

// Middleware to parse JSON body
app.use(bodyParser.json());

// Hardcoded list of users (for demonstration purposes)
const users = {
  '1234567890': { name: 'John Doe', email: 'john@example.com' },
  '9876543210': { name: 'Jane Smith', email: 'jane@example.com' },
  '5551234567': { name: 'Bob Brown', email: 'bob@example.com' }
};

// Object to store OTPs temporarily
const otpCache = {};

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret_key';

// Function to generate JWT token
const generateToken = (phoneNumber) => {
  return jwt.sign({ phoneNumber }, JWT_SECRET, { expiresIn: '1h' });
};

// Middleware to verify JWT token
const authenticateJWT = (req, res, next) => {
  const isTokenExisted = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (isTokenExisted) {
    jwt.verify(isTokenExisted, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// API endpoint for login
app.post('/login', (req, res) => {
  const phoneNumber = req.body.phoneNumber;

  // Check if phoneNumber exists in our users list
  if (users[phoneNumber]) {
    // Generate random OTP
    const otp = randomstring.generate({ length: 6, charset: 'numeric' });

    // Store OTP temporarily (for verification)
    otpCache[phoneNumber] = otp;

    // Return OTP to the client
    res.json({ otp: otp });
  } else {
    res.status(401).json({ error: 'Phone number not registered' });
  }
});

// API endpoint for verifying OTP
app.post('/verify', (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const otpEntered = req.body.otp;

  // Check if OTP matches the stored OTP for the phoneNumber
  if (otpCache[phoneNumber] && otpEntered === otpCache[phoneNumber]) {
    // OTP matched, login successful
    const token = generateToken(phoneNumber);

    // Return token in headers
    res.setHeader('Authorization', `Bearer ${token}`);
    res.json({ message: 'Login successful' });

    // Optionally, clear the OTP from cache after successful login
    delete otpCache[phoneNumber];
  } else {
    // OTP did not match or phoneNumber not found in cache
    res.status(401).json({ error: 'Invalid OTP or phone number' });
  }
});

// API endpoint for user profile
app.get('/profile', authenticateJWT, (req, res) => {
  // Retrieve the phone number from the JWT token
  const phoneNumber = req.user.phoneNumber;

  // Check if user exists
  if (users[phoneNumber]) {
    const userProfile = users[phoneNumber];
    res.json(userProfile);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
