import { allHours } from "./ChartAssets"
import { sortPersonsByAmountOfFish, sortByCustomAlphabet } from "./SortingUtils"

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
 * Finds all the unique fish species from the entries
 * @param {Entry[]} entries - Array of entries
 * @returns {string[]} - Array of unique fish species in entries
 */
export function uniqueFishSpecies(entries) { 
  return [...new Set(entries.map(e => e.fish))]
}

/**
 * Finds all the unique lures from the entries
 * @param {Entry[]} entries - Array of entries
 * @returns {string[]} - Array of unique lures in entries
 */
export function uniqueLures(entries) {
  return [...new Set(entries.map(e => e.lure))].filter(lure => lure !== '-')
}

/**
 * Finds all the unique places from the entries
 * @param {Entry[]} entries - Array of entries
 * @returns {string[]} - Array of unique places in entries
 */
export function uniquePlaces(entries) {
  return [...new Set(entries.map(e => e.place))].filter(place => place !== '-')
}

/**
 * Finds all the unique persons from the entries
 * @param {Entry[]} entries - Array of entries
 * @returns {string[]} - Array of unique persons in entries
 */
export function uniquePersons(entries) {
  return [...new Set(entries.map(e => e.person))]
}

/**
 * Returns the amount of different fish species caught during different hours of the day
 * @param {Entry[]} entries - Array of entries
 * @returns {Object[]} - Array of objects containing fish species, 
 * time and amount of that certain fish species caught at that time
 */
export function fishAmountAtDiffHours(entries) { 
  const species = sortByCustomAlphabet(uniqueFishSpecies(entries))
  const hours = allHours
  const fishAmounts = []
  for (let i = 0; i < species.length; i++) {
    fishAmounts.push(
      hours.map(hour => {
        return {
          time: hour,
          species: species[i],
          amount: entries
            .filter(e => e.time.substring(0, 2) === hour)
            .filter(e => e.fish === species[i])
            .length
        }    
      })
    )  
  }  
  return fishAmounts
}

/**
 * Returns the amount of different fish species caught by different persons
 * @param {Entry[]} entries - Array of entries
 * @returns {Object[]} - Array of objects containing person, fish species,
 * and amount of that certain fish species caught by that person
 */
export function fishCaughtByDiffPersons(entries) { 
  const species = sortByCustomAlphabet(uniqueFishSpecies(entries))
  const persons = uniquePersons(entries) 
  const sortedPersons = sortPersonsByAmountOfFish(persons, entries)
  const fishAmounts = []
  for (let i = 0; i < species.length; i++) {
    fishAmounts.push(
      sortedPersons.map(person => {
        return {
          person: person, 
          species: species[i],
          amount: entries
            .filter(e => e.person === person)
            .filter(e => e.fish === species[i])
            .length
        }    
      })
    )
  }
  return fishAmounts
}