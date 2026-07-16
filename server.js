
const express = require('express');
const { generateShortCode, isValidUrl } = require('./src/shortcode');
const { create, get, has, recordClick } = require('./src/storage');

require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/api/shorten', async (req, res) => {
  const { url } = req.body;

  if (!isValidUrl(url)) {
    return res.status(400).json({ error: 'A valid http(s) url is required.' });
  }

  let code;
  do {
    code = generateShortCode(7);
  } while (await has(code));

  const entry = await create(code, url);
  res.status(201).json({
    code,
    shortUrl: `${req.protocol}://${req.get('host')}/${code}`,
    url: entry.original_url,
  });
});

app.get('/:code', async (req, res) => {
  const entry = await get(req.params.code);
  if (!entry) {
    return res.status(404).json({ error: 'Short URL not found.' });
  }
  await recordClick(req.params.code);
  res.redirect(entry.original_url);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
