export function sortByFish(entries) {
  return entries.sort((a, b) => a.fish.localeCompare(b.fish))
}

export function sortByDate(entries) {
  entries.sort(function(a,b) {
    a = a.date.split('-').join('')
    b = b.date.split('-').join('')
    return a.localeCompare(b)
  })
  return entries
}

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

export function sortByTime(entries) {
  entries.sort(function(a,b) {
    a = a.time.split(':').join('')
    b = b.time.split(':').join('')
    return a.localeCompare(b)
  })
  return entries
}

export function sortByPerson(entries) {
  return entries.sort((a, b) => a.person.localeCompare(b.person))
}

export function defaultSort(entries) {
  return sortByDate(sortByTime(entries)).reverse()
}

export function sortPersonsByAmountOfFish(persons, entries) {
  persons.sort(function(a,b){
    return (entries.filter(e => e.person === b).length) - (entries.filter(e => e.person === a).length)
  })
  return persons
}

export const customAlphabet = 'kahbcdefgijlmnopqrstuvwxyzåäö'

export function sortByCustomAlphabet(arr) {
  arr.sort((a, b) => {
    return customAlphabet.indexOf(a.substring(0,1)) - customAlphabet.indexOf(b.substring(0,1))
  })
  return arr
}