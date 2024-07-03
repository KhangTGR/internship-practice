const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Hardcoded list of phone numbers
const phoneNumbers = [];

// API endpoint for `/login`
// ...

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
