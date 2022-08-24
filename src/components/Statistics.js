import React from "react"

import BarChartHours from "./BarChartHours"
import BarChartHoursMobile from "./BarChartHoursMobile"
import BarChartRankings from "./BarChartRankings"
import BarChartRankingsMobile from "./BarChartRankingsMobile"
import DoughnutChartSpecies from "./DoughnutChartSpecies"
import DoughnutChartSpeciesMobile from "./DoughnutChartSpeciesMobile"

const Statistics = ({ entries, statsWindowAnimation }) => {

  // const uniquePersons1 = uniquePersons(entries)
  // const uniqueFishSpecies1 = uniqueFishSpecies(entries)
  
  // uniquePersons1.sort(function(a,b){
  //   return (entries.filter(e => e.person === b).length) - (entries.filter(e => e.person === a).length)
  // });
  // uniqueFishSpecies1.sort(function(a,b){
  //   return (entries.filter(e => e.fish === b).length) - (entries.filter(e => e.fish === a).length)
  // });
  
  return (
    <>
      <div className='statisticsContainer2'>
        <BarChartRankings
          entries={entries}
        />
        <BarChartRankingsMobile
          entries={entries}
        />
        <DoughnutChartSpecies
          entries={entries}
        />
        <DoughnutChartSpeciesMobile
          entries={entries}
        />
      </div>
      <div className="statisticsContainer3">
      <BarChartHours
        entries={entries}
      />
      <BarChartHoursMobile
        entries={entries}
      />
      </div>
    </>
  )
}

export default Statistics


// <div className={`statisticsContainer${statsWindowAnimation ? ' appear' : ' disappear'}`}>
//   <p id="totalAmount">Kalojen kokonaismäärä: {entries.length} </p>
//   <ul className={`stats${statsWindowAnimation ? ' appear' : ' disappear'}`}>
//     {uniquePersons.map(person =>
//       <li key={person}>
//         {person}: {entries.filter(e => e.person === person).length}
//       </li>
//     )}
//   </ul>
//   <ul className={`stats${statsWindowAnimation ? ' appear' : ' disappear'}`}>
//     {uniqueFish.map(fish =>
//       <li key={fish}>
//         {fish}: {entries.filter(e => e.fish === fish).length}
//       </li>
//     )}
//     </ul>
// </div>