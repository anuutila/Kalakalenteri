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

/**
 * Validates the inputs of an entry.
 * @param {Object} entryObject - An entry object
 * @returns {boolean} - True if the inputs are valid, false if not
 */
export function validateEntryInput(entryObject) {
  // Ensure that certain inputs consist of words, separated by one space 
  // and the allowed length of each input is 0-100 characters.
  const MAX_INPUT_LENGTH_BIG = 100;
  const MAX_INPUT_LENGTH_SMALL = 10;

  if (!entryObject.fish || !entryObject.date || !entryObject.time || !entryObject.person) {
    return ('kalalaji, päivämäärä, kellonaika tai saajan nimi puuttuu')
  }

  if (entryObject.lure.length > MAX_INPUT_LENGTH_BIG) {
    return (`vieheen nimi saa olla enintään ${MAX_INPUT_LENGTH_BIG} merkkiä pitkä.`)
  } else if (!/^([^\s]+)+((\s)[^\s]+)*$|^$/.test(entryObject.lure)) {
    return ("erota vieheen nimen osat toisistaan vain yhdellä välilyönnillä.")
  } else if (/[^aeiouyäöAEIOUYÄÖ\s]{10,}|(.)\1{4,}/g.test(entryObject.lure)) {
    return ("vieheen nimessä ei voi olla 10 konsonanttia tai 5 samaa merkkia peräkkäin.")
  }

  if (entryObject.place.length > MAX_INPUT_LENGTH_BIG) {
     return (`paikan nimi saa olla enintään ${MAX_INPUT_LENGTH_BIG} merkkiä pitkä.`)

  } else if (!/^([^\s]+)+((\s)[^\s]+)*$|^$/.test(entryObject.place)) {
     return ("erota paikan nimen osat toisistaan vain yhdellä välilyönnillä.")

  } else if (/[^aeiouyäöAEIOUYÄÖ\s]{10,}|(.)\1{4,}/g.test(entryObject.place)) {
    return ("paikan nimessä ei voi olla 10 konsonanttia tai 5 samaa merkkia peräkkäin.")
  }

  if (entryObject.person.length > MAX_INPUT_LENGTH_SMALL) {
     return (`saajan nimi saa olla enintään ${MAX_INPUT_LENGTH_SMALL} merkkiä pitkä.`)

  } else if (!/^([^\s]+)+((\s)[^\s]+)*$/.test(entryObject.person)) {
     return ("erota saajan nimen osat toisistaan vain yhdellä välilyönnillä.")

  }

  if (entryObject.fish.length > MAX_INPUT_LENGTH_SMALL) {
     return (`kalalajin nimi saa olla enintään ${MAX_INPUT_LENGTH_SMALL} merkkiä pitkä.`)

  } else if (!/^([^\s]+)+((\s)[^\s]+)*$/.test(entryObject.fish)) {
     return ("erota kalalajin nimen osat toisistaan vain yhdellä välilyönnillä.")

  }  

  if (!/^\-?[0-9]{1,2}\.[0-9]{2,10},\s\-?[0-9]{1,3}\.[0-9]{2,10}$|^$/.test(entryObject.coordinates)) {
    return ('koordinaattien formaatti virheellinen\nOikea muoto: "xx.xxxxxxx, yy.yyyyyyy" tai tyhjä\n(huomaa välilyönti)')
  }

  return false
}

export function validateSignupInput(inputObject) {
  const MAX_INPUT_LENGTH = 30;

  if (!inputObject.username || !inputObject.email ||  !inputObject.password || !inputObject.passwordAgain) {
    return ("Kaikkia kenttiä ei ole täytetty")
  }

  if (inputObject.username.length > MAX_INPUT_LENGTH) {
    return (`käyttäjänimi saa olla enintään ${MAX_INPUT_LENGTH} merkkiä pitkä.`)
  }

  if (inputObject.password.length > MAX_INPUT_LENGTH) {
    return (`salasana saa olla enintään ${MAX_INPUT_LENGTH} merkkiä pitkä.`)
  }

  if (inputObject.password !== inputObject.passwordAgain) {
    return ("salasanat eivät täsmää")
  }

  return false
}