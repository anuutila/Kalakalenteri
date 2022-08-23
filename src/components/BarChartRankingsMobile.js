import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

import { chartColors2 } from '../utils/ChartAssets';
import { fishCaughtByDiffPersons, 
         uniqueFishSpecies, 
         uniquePersons } from '../utils/EntriesFunctions';
import { sortByCustomAlphabet, sortPersonsByAmountOfFish } from '../utils/SortingUtils';


const BarChartRankingsMobile = ({ entries }) => {

  const sortedFishSpecies = sortByCustomAlphabet(uniqueFishSpecies(entries));
  const persons = uniquePersons(entries);
  const sortedPersons = sortPersonsByAmountOfFish(persons, entries)
  //   .map(person => `${person}: ${entries.filter(e => e.person === person).length}`
  // );

  const customDatasets = fishCaughtByDiffPersons(entries)
    .map(data => {
      return {
        label: data[0].species,
        data: data.map(d => d.amount),
        backgroundColor: chartColors2[
          sortedFishSpecies
          .indexOf(data[0].species)],
        borderColor: '#000000',
        borderWidth: 2
      }
    }
  );

  const data = {
    labels: sortedPersons,
    datasets: customDatasets
  };

  const options = {
    maintainAspectRatio: false,
    indexAxis: 'y',
    // layout: {
    //   padding: 10
    // },
    // barThickness: 45,
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'kalojen määrä',
          color: 'white',
          padding: 16,
          font: {
            size: 40,
            weight: 'bold'
          }
        },
        ticks: {
          color: '#ffffff',
          font: {
            size: 40,
            weight: 'bold'
          }
        },
        grid: {
          drawBorder: false,
          color: 'rgba(255, 255, 255, 0.5)',
          lineWidth: 2,
        }
      },
      y: {
        stacked: true,
        // title: {
        //   display: false,
        //   text: 'kalastajat',
        //   color: 'white',
        //   font: {
        //     size: 40,
        //   }
        // },
        ticks: {
          z: 1,
          mirror: false,
          color: '#ffffff',
          padding: 20,
          font: {
            size: 40,
            weight: 'bold',
          },
          
        },
        grid: {
          drawBorder: false,
          color: 'transparent'
        }
      }
    },
    plugins: {
      title:{
        display: true,
        text:'Saalismäärät henkilöittäin',
        padding: 0,
        color: 'white',
        font: {
          size: 60,
          weight: 'bold'
        }
      },
      legend:{
        position: 'top',
        display: true,
        labels: {
          padding: 60,
          color: 'white',
          font: {
            size: 40,
            weight: 'bold'
          }
        }
      },
      tooltip:{
        caretSize: 40,
        boxPadding: 15,
        padding: 40,
        titleFont: {
          size: 40,
        },
        bodyFont: {
          size: 40,
        },
      }
    }
  }

  const legendMargin = {
    id: 'legendMargin',
    beforeInit(chart) {
      const originalFit = chart.legend.fit;
      chart.legend.fit = function fit() {
        originalFit.bind(chart.legend)();
        return this.height += 35;
      }
    }
  }; 

  return (
    <div className='barChartRankingsMobileContainer'>
      <Bar 
        data={data}
        options={options}
        plugins={[legendMargin]}
      />
    </div>
  )
}

export default BarChartRankingsMobile;