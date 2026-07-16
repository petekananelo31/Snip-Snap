const store = new Map();

function create(code, url) {
  const entry = { url, createdAt: new Date().toISOString(), clicks: 0 };
  store.set(code, entry);
  return entry;
}

function get(code) {
  return store.get(code) || null;
}

function has(code) {
  return store.has(code);
}

function recordClick(code) {
  const entry = store.get(code);
  if (entry) entry.clicks += 1;
  return entry;
}

module.exports = { create, get, has, recordClick };
