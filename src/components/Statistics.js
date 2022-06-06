import React from "react"

const Statistics = ({ entries }) => {
    console.log(entries)
    const uniquePersons = [...new Set(entries.map(e => e.person))] 
    console.log(uniquePersons)
    const uniqueFish = [...new Set(entries.map(e => e.fish))] 
    console.log(uniqueFish)
    
    return (
      <div className="statisticsContainer">
        <p id="totalAmount">Kalojen kokonaismäärä: {entries.length} </p>
        <ul className="stats">
          {uniquePersons.map(person =>
            <li key={person}>
              {person}: {entries.filter(e => e.person === person).length}
            </li>
          )}
        </ul>
        <ul className="stats">
          {uniqueFish.map(fish =>
            <li key={fish}>
              {fish}: {entries.filter(e => e.fish === fish).length}
            </li>
          )}
        </ul>
      </div>
    )
  }

  export default Statistics