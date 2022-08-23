
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