/**
 * Returns the current date
 * @returns {string} - Date in format YYYY-MM-DD
 */
export function getDefaultDate() {
  const date = new Date();
  const currentDate = date.getDate();
  date.setDate(currentDate);
  const defaultDate = date.toLocaleDateString('en-CA');
  return defaultDate;
}

/**
 * Checks if geolocation is available in the browser
 * @returns {boolean} - True if geolocation is available, false if not
 */
export function geolocationAvailable() {
  if ("geolocation" in navigator) {
    return true
  } else {
    return false
  }
}