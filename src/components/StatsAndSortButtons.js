import React from "react"

const StatsAndSortButtons = (props) => {

  function scrollToStats() {
    // const element = document.getElementById("submitButton");
    // element.scrollIntoView({behavior: "smooth", block: "start"});
    if (window.innerWidth < 1000) {
      window.scrollTo({
        top: window.innerHeight*0.8,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({
        top: window.innerHeight*0.55,
        behavior: 'smooth'
      });
    }
  }

  return (
    <div className='statAndSortButtonContainer'>
      <div>
        <button className='button' id='showSortingButton' 
          onClick={props.handleSortButtonClick}>
          {props.sortingIsHidden ? 'järjestä taulu' : 'palauta oletusjärjestys'}
        </button>
        <button className='button' id='showStatsButton' 
          onClick={() => {
            props.toggleStatsHidden();
            scrollToStats();
            }}>
          {props.statsAreHidden ? 'näytä tilastot' : 'piilota tilastot'}
        </button>
      </div>
    </div> 
  )  
}

export default StatsAndSortButtons