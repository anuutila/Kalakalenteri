import react from "react"

const StatsAndSortButtons = (props) => {
  return (
    <div className='statAndSortButtonContainer'>
      <div>
        <button className='button' id='showSortingButton' 
          onClick={props.handleSortButtonClick}>
          {props.sortingIsHidden ? 'järjestä taulu' : 'palauta oletusjärjestys'}
        </button>
        <button className='button' id='showStatsButton' 
          onClick={props.toggleStatsHidden}>
          {props.statsAreHidden ? 'näytä tilastot' : 'piilota tilastot'}
        </button>
      </div>
    </div> 
  )  
}

export default StatsAndSortButtons