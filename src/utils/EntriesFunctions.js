import { allHours } from "./ChartAssets"
import { sortPersonsByAmountOfFish, sortByCustomAlphabet } from "./SortingUtils"

export function uniqueFishSpecies(entries) { 
  return [...new Set(entries?.map(e => e.fish))]
}

export function uniqueLures(entries) {
  return [...new Set(entries.map(e => e.lure))].filter(lure => lure !== '-')
}

export function uniquePlaces(entries) {
  return [...new Set(entries.map(e => e.place))].filter(place => place !== '-')
}

export function uniquePersons(entries) {
  return [...new Set(entries.map(e => e.person))]
}

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
  console.log(fishAmounts)
  return fishAmounts
}