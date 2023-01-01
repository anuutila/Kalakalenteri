import React from "react"
import { useMediaQuery } from 'react-responsive'
import TableUtilitiesMobile from "./TableUtilitiesMobile"

/**
 * A component containing the buttons for sorting the entries and displaying the statistics.
 */
const TableUtilities = (props) => {

  const isSmallScreen = useMediaQuery({ query: '(max-width: 1023px)' })

  // Scroll to the first statistic when the statistics button is clicked.
  function scrollToStats() {
    if (props.statsAreHidden) {
      const element = document.getElementsByClassName("statisticsContainer")[0];
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      const element = document.getElementsByClassName("title2")[0];
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // if (window.innerWidth < 1000) {
    //   window.scrollTo({
    //     top: window.innerHeight*0.8,
    //     behavior: 'smooth'
    //   });
    // } else {
    //   window.scrollTo({
    //     top: window.innerHeight*1.1,
    //     behavior: 'smooth'
    //   });
    // }
  }

  return (
    isSmallScreen 
    ?
    <TableUtilitiesMobile {...props} />
    : 
    <div className='tableUtilityContainer'>
      <div className='statAndSortButtonContainer'>
        <button className='button' id='showSortingButton'
          onClick={props.handleSortButtonClick}>
          {props.sortingIsHidden ? 'Järjestä taulu' : 'Palauta oletusjärjestys'}
        </button>
        <button className='button' id='showStatsButton'
          onClick={() => {
            props.toggleStatsHidden();
            scrollToStats();
          }}>
          {props.statsAreHidden ? 'Näytä tilastot' : 'Piilota tilastot'}
        </button>
      </div>
      <div className='datePickerContainer'>
        <div className='datePicker'>
          <p className='datePickerTitle'>Tarkasteltava aikaväli</p>
          <div className='datePickerContent1'>
            <div className='datePickerInput'>
              <input type='date' id='datePickerInput1' value={props.startDate} onChange={e => props.handleStartDateChange(e.target.value)} />
            </div>
            <p className='datePickerDash'>–</p>
            <div className='datePickerInput'>
              <input type='date' id='datePickerInput2' value={props.endDate} onChange={e => props.handleEndDateChange(e.target.value)} />
            </div>
          </div>
          <div className='datePickerContent2'>
            <button className='button' id='yearButton' onClick={() => {
              props.handleStartDateChange('2020-01-01')
              props.handleEndDateChange('2020-12-31')
            }}>2020</button>
            <button className='button' id='yearButton' onClick={() => {
              props.handleStartDateChange('2021-01-01')
              props.handleEndDateChange('2021-12-31')
            }}>2021</button>
            <button className='button' id='yearButton' onClick={() => {
              props.handleStartDateChange('2022-01-01')
              props.handleEndDateChange('2022-12-31')
            }}>2022</button>
            <button className='button' id='yearButton' onClick={() => {
              props.handleStartDateChange('2023-01-01')
              props.handleEndDateChange('2023-12-31')
            }}>2023</button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default TableUtilities