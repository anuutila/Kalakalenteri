import React from "react"
import CountUp from 'react-countup';

import BarChartHours from "./charts/BarChartHours"
import BarChartHoursMobile from "./charts/BarChartHoursMobile"
import BarChartRankings from "./charts/BarChartRankings"
import BarChartRankingsMobile from "./charts/BarChartRankingsMobile"
import DoughnutChartSpecies from "./charts/DoughnutChartSpecies"
import DoughnutChartSpeciesMobile from "./charts/DoughnutChartSpeciesMobile"

const Statistics = ({ entries }) => {
  return (
    <>
      <div className="statisticsContainer1">
        <div className="countUpContainer">
          <div id='countUpTitle'>
            Saaliiden kokonaismäärä
          </div>
          <div id='countUp'>
            <CountUp 
              end={entries.length}
              duration={2.5}
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