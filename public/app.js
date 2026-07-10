const form = document.getElementById('shorten-form');
const urlInput = document.getElementById('url-input');
const submitBtn = document.getElementById('submit-btn');
const errorMsg = document.getElementById('error-msg');
const resultSection = document.getElementById('result');
const shortLink = document.getElementById('short-link');
const copyBtn = document.getElementById('copy-btn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorMsg.hidden = true;

  const url = urlInput.value.trim();
  if (!url) return;

  try {
    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();

    if (!res.ok) {
      errorMsg.textContent = data.error || 'Something went wrong.';
      errorMsg.hidden = false;
      return;
    }

    shortLink.textContent = data.shortUrl;
    shortLink.href = data.shortUrl;
    resultSection.hidden = false;
  } catch {
    errorMsg.textContent = 'Could not reach the server.';
    errorMsg.hidden = false;
  }
});

copyBtn.addEventListener('click', async () => {
  await navigator.clipboard.writeText(shortLink.href);
  copyBtn.textContent = 'copied';
  setTimeout(() => (copyBtn.textContent = 'copy'), 1500);
});
