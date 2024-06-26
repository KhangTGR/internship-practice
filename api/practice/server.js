const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

let randomNumber = Math.floor(Math.random() * 100) + 1;

app.use(cors());
app.use(express.json());

app.get('/api/number', (req, res) => {});

app.post('/api/guess', (req, res) => {});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
