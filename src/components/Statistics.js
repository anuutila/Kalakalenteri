import React from "react"
import CountUp from 'react-countup';

import BarChartHours from "./Charts/BarChartHours"
import BarChartHoursMobile from "./Charts/BarChartHoursMobile"
import BarChartRankings from "./Charts/BarChartRankings"
import BarChartRankingsMobile from "./Charts/BarChartRankingsMobile"
import DoughnutChartSpecies from "./Charts/DoughnutChartSpecies"
import DoughnutChartSpeciesMobile from "./Charts/DoughnutChartSpeciesMobile"

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