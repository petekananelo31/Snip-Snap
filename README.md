# URL Shortener API

A full-stack REST API that turns long URLs into short, shareable links — built with Node.js and Express, with a custom HTML/CSS/JavaScript interface, deployed live on Render.

**Live demo:** https://url-w2qu.onrender.com
**Repository:** https://github.com/petekananelo31/url

## Features

- Web interface — paste a link, get a short one instantly
- `POST /api/shorten` — shorten a URL
- `GET /:code` — redirects to the original URL
- Input validation (rejects malformed URLs)
- Works correctly on any domain (local or deployed) — the short link is built from the actual request host, not hardcoded

## Tech stack

- Node.js, Express
- Vanilla HTML, CSS, JavaScript (no frontend framework)
- Deployed on Render

## Architecture


## Running it locally

Requires Node.js 18+.

```bash
git clone https://github.com/petekananelo31/url.git
cd url
npm install
node server.js


curl -X POST http://localhost:3000/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.google.com"}’


{
  "code": "sGDxgTg",
  "shortUrl": "http://localhost:3000/sGDxgTg",
  "url": "https://www.google.com"
}
