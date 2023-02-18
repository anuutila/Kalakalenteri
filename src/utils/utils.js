/**
 * Returns the current date
 * @returns {string} - Date in format YYYY-MM-DD
 */
export function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  console.log(formattedDate);
  return formattedDate;
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

/**
 * Logs a message to the console only if the environment is development
 * @param {string} message - Message to be logged
 */
export function devLog(message) {
  if (process.env.NODE_ENV === 'development') {
    console.log(message)
  }
}