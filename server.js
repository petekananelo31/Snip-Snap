const express = require('express');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

function generatePassword({ length = 12, useUppercase = true, useNumbers = true, useSymbols = true }) {
  let charset = 'abcdefghijklmnopqrstuvwxyz';
  if (useUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (useNumbers) charset += '0123456789';
  if (useSymbols) charset += '!@#$%^&*()_+-=[]{}';

  const bytes = crypto.randomBytes(length);
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset[bytes[i] % charset.length];
  }
  return password;
}

app.post('/api/generate', (req, res) => {
  const { length, useUppercase, useNumbers, useSymbols } = req.body;

  const len = Number(length) || 12;
  if (len < 4 || len > 64) {
    return res.status(400).json({ error: 'Length must be between 4 and 64.' });
  }

  const password = generatePassword({ length: len, useUppercase, useNumbers, useSymbols });
  res.json({ password });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

