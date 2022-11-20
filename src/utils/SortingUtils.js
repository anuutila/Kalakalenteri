/**
 * An entry in the EntryTable, containing all the information about a single entry.
 * @typedef {Object} Entry
 * @property {string} id - The id of the entry.
 * @property {string} fish - The species of the fish.
 * @property {number} length - The length of the fish.
 * @property {number} weight - The weight of the fish.
 * @property {string} lure - The lure used to catch the fish.
 * @property {string} place - The place where the fish was caught.
 * @property {string} coordinates - The coordinates of the place where the fish was caught.
 * @property {string} date - The date of the entry.
 * @property {string} time - The time of the day when the fish was caught.
 * @property {string} person - The person who caught the fish.
 */

/**
 * Sorts entries by fish species in alphabetical order
 * @param {Entry[]} entries - Array of entries
 * @returns {Entry[]} - Array of entries sorted by fish species
 */
export function sortByFish(entries) {
  return entries.sort((a, b) => a.fish.localeCompare(b.fish))
}

/**
 * Sorts entries by date in chronological order
 * @param {Entry[]} entries - Array of entries
 * @returns {Entry[]} - Array of entries sorted by date
 */
export function sortByDate(entries) {
  entries.sort(function(a,b) {
    a = a.date.split('-').join('')
    b = b.date.split('-').join('')
    return a.localeCompare(b)
  })
  return entries
}

/**
 * Sorts entries by length in descending order so that entries without a length are last
 * @param {Entry[]} entries - Array of entries
 * @returns {Entry[]} - Array of entries sorted by length
 */
export function sortByLength(entries) {
  entries.sort((a, b) => {
    if (a.length === "-") {
      return 1
    }
    if (b.length === "-") {
      return -1
    }
    return b.length - a.length
  }) 
  return entries
}

/**
 * Sorts entries by weight in descending order so that entries without a weight are last
 * @param {Entry[]} entries - Array of entries
 * @returns {Entry[]} - Array of entries sorted by weight
 */
export function sortByWeight(entries) {
  entries.sort((a, b) => {
    if (a.weight === "-") {
      return 1
    }
    if (b.weight === "-") {
      return -1
    }
    return b.weight - a.weight
  }) 
  return entries
}

/**
 * Sorts entries by lure in alphabetical order so that entries without a lure are last
 * @param {Entry[]} entries - Array of entries
 * @returns {Entry[]} - Array of entries sorted by lure
 */
export function sortByLure(entries) {
  entries.sort((a, b) => {
    if (a.lure === "-") {
      return 1
    }
    if (b.lure === "-") {
      return -1
    }
    return a.lure.localeCompare(b.lure)
  }) 
  return entries
}

/**
 * Sorts entries by place in alphabetical order so that entries without a place are last
 * @param {Entry[]} entries - Array of entries
 * @returns {Entry[]} - Array of entries sorted by place
 */
export function sortByPlace(entries) {
  entries.sort((a, b) => {
    if (a.place === "-") {
      return 1
    }
    if (b.place === "-") {
      return -1
    }
    return a.place.localeCompare(b.place)
  }) 
  return entries  
}

/**
 * Sorts entries by time in chronological order
 * @param {Entry[]} entries - Array of entries
 * @returns {Entry[]} - Array of entries sorted by time
 */
export function sortByTime(entries) {
  entries.sort(function(a,b) {
    a = a.time.split(':').join('')
    b = b.time.split(':').join('')
    return a.localeCompare(b)
  })
  return entries
}

/**
 * Sorts entities by person in alphabetical order
 * @param {Entry[]} entries - Array of entries
 * @returns {Entry[]} - Array of entries sorted by person
 */
export function sortByPerson(entries) {
  return entries.sort((a, b) => a.person.localeCompare(b.person))
}

/**
 * Sorts entities by date so that the most recent entries are first in the table
 * @param {Entry[]} entries - Array of entries
 * @returns {Entry[]} - Array of entries sorted by date in reverse chronological order
 */
export function defaultSort(entries) {
  return sortByDate(sortByTime(entries)).reverse()
}

/** 
 * Sorts persons by amount of fish caught by them in descending order
 * @param {Entry[]} entries - Array of entries
 * @param {string[]} persons - Array of unique persons in entries
 * @returns {string[]} - Array of persons sorted by amount of fish caught by them
 */
export function sortPersonsByAmountOfFish(persons, entries) {
  persons.sort(function(a,b){
    return (entries.filter(e => e.person === b).length) - (entries.filter(e => e.person === a).length)
  })
  return persons
}

// hard coded custom alphabet for sorting fish species in specific order
export const customAlphabet = 'kahbcdefgijlmnopqrstuvwxyzåäö'

/**
 * Sorts an array of strings in a custom order
 * @param {string[]} arr - Array of strings to be sorted
 */
export function sortByCustomAlphabet(arr) {
  arr.sort((a, b) => {
    return customAlphabet.indexOf(a.substring(0,1)) - customAlphabet.indexOf(b.substring(0,1))
  })
  return arr
}