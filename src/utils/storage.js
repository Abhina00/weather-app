// Small wrapper around localStorage so the rest of the app
// doesn't need to worry about JSON parsing / missing keys.

export function getItem(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    console.error(`Failed to read "${key}" from storage`, err);
    return fallback;
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Failed to write "${key}" to storage`, err);
  }
}

export function removeItem(key) {
  localStorage.removeItem(key);
}
