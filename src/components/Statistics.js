import React from "react"
import CountUp from 'react-countup';

import { formatDate } from "../utils/helpers";
import BarChartHours from "./Charts/BarChartHours"
import BarChartHoursMobile from "./Charts/BarChartHoursMobile"
import BarChartRankings from "./Charts/BarChartRankings"
import BarChartRankingsMobile from "./Charts/BarChartRankingsMobile"
import DoughnutChartSpecies from "./Charts/DoughnutChartSpecies"
import DoughnutChartSpeciesMobile from "./Charts/DoughnutChartSpeciesMobile"

/**
 * A component for displaying all the different charts and statistics.
 */
const Statistics = ({ entries, startDate, endDate }) => {

  /**
   * Returns a message about the date range of the currently visible statistics.
   */
  const message = () => {
    // If the date range is the whole year, display only the year in the message.
    if (startDate.substring(0, 4) === endDate.substring(0, 4) &&
      startDate.substring(5, 10) === '01-01' &&
      endDate.substring(5, 10) === '12-31') {
      return 'Vuoden ' + startDate.substring(0, 4) + ' tilastot:'
    } else {
      return <text>Tilastot aikaväliltä<br/>
      {formatDate(startDate)}–{formatDate(endDate)}:</text>
    }
  }

  return (
    <>
      <div className="dateRangeMessageContainer">
        <p>{message()}</p>
      </div>
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