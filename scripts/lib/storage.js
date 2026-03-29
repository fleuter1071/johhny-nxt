export function readJSON(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
}

export function writeJSON(key, value, onErrorMessage) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    if (onErrorMessage) {
      console.warn(onErrorMessage, error);
    }
    return false;
  }
}
