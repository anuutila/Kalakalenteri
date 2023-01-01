import { React, useState } from "react"
import { useMediaQuery } from 'react-responsive'
import Modal from "react-modal"

/**
 * A component containing the buttons for sorting the entries and displaying the statistics.
 */
const TableUtilitiesMobile = (props) => {

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const isSmallScreen = useMediaQuery({ query: '(max-width: 1023px)' })

  const openModal = () => {
    setModalIsOpen(true)
    // Disables Background Scrolling while the Modal is open on small screens
    if (isSmallScreen) {
      document.body.style.overflow = 'hidden';
    }
  }

  const closeModal = () => {
    setModalIsOpen(false)
    // Enables Background Scrolling after the Modal is closed on small screens
    if (isSmallScreen) {
      document.body.style.overflow = 'unset';
    }
  }

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
    <div className='tableUtilityContainer'>
      <div className='showStatsButtonContainer'>
        <button className='button' id='showStatsButton'
          onClick={() => {
            props.toggleStatsHidden();
            scrollToStats();
          }}>
          {props.statsAreHidden ? 'Näytä tilastot' : 'Piilota tilastot'}
        </button>
      </div>
      <div className='sortAndDatePickerButtonContainer'>
        <button className='button' id='showSortingButton'
          onClick={props.handleSortButtonClick}>
          {props.sortingIsHidden ? 'Järjestä taulu' : 'Palauta järjestys'}
        </button>
        <button className='button' id='showDatePickerButton' onClick={openModal}>Valitse aikaväli</button>
        <Modal isOpen={modalIsOpen} shouldCloseOnOverlayClick={false} closeTimeoutMS={200} onRequestClose={() => setModalIsOpen(false)}
          style={{
            overlay: {
              position: "fixed",
              display: "flex",
              justifyContent: "center",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0, .8)",
              zIndex: "1000",
              overflowY: "auto"
            },
            content: {
              position: 'absolute',
              zIndex: '1000',
              height: 'fit-content',
              margin: 'auto',
              width: 'fit-content',
              border: '0.2rem solid #888',
              background: '#2a2a2a',
              overflow: 'auto',
              borderRadius: '2rem',
              outline: 'none',
              padding: '0'
            }
          }}
        >
          <div className='datePickerContainer'>
            <div className='datePicker'>
              <p className='datePickerTitle'>Tarkasteltava aikaväli</p>
              <div className='datePickerContent1'>
                <div className='datePickerInput'>
                  <label htmlFor='datePickerInput1' className='datePickerLabel'>alku:</label>
                  <input type='date' id='datePickerInput1' value={props.startDate} onChange={e => props.handleStartDateChange(e.target.value)} />
                </div>
                <p className='datePickerDash'>–</p>
                <div className='datePickerInput'>
                  <label htmlFor='datePickerInput2' className='datePickerLabel'>loppu:</label>
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
              <button className='button' id='maxDateRangeButton' 
                onClick={() => {
                  props.handleStartDateChange(props.entries.at(-1).date)
                  props.handleEndDateChange(props.entries.at(0).date)
                }}>Näytä kaikki</button>
              <button className='button' id='okButton' onClick={closeModal}>OK</button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default TableUtilitiesMobile