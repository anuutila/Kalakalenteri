import React from "react"

const StatsAndSortButtons = (props) => {

  function scrollToStats() {
    const element = document.getElementById("statisticsContainer");
    element.scrollIntoView({behavior: "smooth", block: "start"});
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
    <div className='statAndSortButtonContainer'>
      <div>
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
    </div> 
  )  
}

export default StatsAndSortButtons