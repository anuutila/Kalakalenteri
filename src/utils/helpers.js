/**
 * Returns the current date
 * @returns {string} - Date in format YYYY-MM-DD
 */
export function getCurrentDate() {
  return new Date().toLocaleDateString('en-CA');
}

/**
 * Returns the year when the last entry was made.
 * @param {Entry[]} entries - Array of entries
 * @returns {string} - year in format YYYY
 */
export function getInitialYear(entries) {
  return entries[0].date.substring(0, 4)
}

/**
 * Formats a date from format YYYY-MM-DD to DD.MM.YYYY
 * @param {string} date - Date in format YYYY-MM-DD
 * @returns {string} - Date in format DD.MM.YYYY
 */
export function formatDate(date) {
  const year = date.substring(0, 4)
  const month = date.substring(5, 7)
  const day = date.substring(8)
  return (`${day}.${month}.${year}`)
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