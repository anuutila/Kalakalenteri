import React from "react"
import CountUp from 'react-countup';

import BarChartHours from "./BarChartHours"
import BarChartHoursMobile from "./BarChartHoursMobile"
import BarChartRankings from "./BarChartRankings"
import BarChartRankingsMobile from "./BarChartRankingsMobile"
import DoughnutChartSpecies from "./DoughnutChartSpecies"
import DoughnutChartSpeciesMobile from "./DoughnutChartSpeciesMobile"

const Statistics = ({ entries, statsWindowAnimation }) => {
  return (
    <>
      <div className="statisticsContainer1">
        <div className="countUpContainer">
          <div id='countUpTitle'>
            Saaliiden kokonaismäärä
          </div>
          <div id='countUp' data-text={entries.length}>
            <CountUp 
              end={entries.length}
              duration={2}
              useEasing={true}
            />
          </div>
        </div>
      </div>
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