import React from "react"

const Statistics = ({ entries }) => {
    const uniquePersons = [...new Set(entries.map(e => e.person))] 
    const uniqueFish = [...new Set(entries.map(e => e.fish))] 
    
    uniquePersons.sort(function(a,b){
      return (entries.filter(e => e.person === b).length) - (entries.filter(e => e.person === a).length)
    });

    uniqueFish.sort(function(a,b){
      return (entries.filter(e => e.fish === b).length) - (entries.filter(e => e.fish === a).length)
    });
    
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