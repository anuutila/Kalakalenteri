import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { chartColors2 } from '../../utils/ChartAssets';
import { fishCaughtByDiffPersons, 
         uniqueFishSpecies, 
         uniquePersons } from '../../utils/EntriesFunctions';
import { sortByCustomAlphabet, sortPersonsByAmountOfFish } from '../../utils/SortingUtils';

/**
 * Chart component built with Chart.js and react-chartjs-2 library.
 * The chart shows the amount and species of fish caught by each person.
 * The chart is responsive and the user can tap the bars to see the
 * exact amount of different fish species caught by that person.
 * The user can also tap on the legend to hide/show the data of a specific fish species.
 * This version of the chart is designed for smaller mobile screens.
 * @prop {Entry[]} entries - An array containing all the entries
 */
const BarChartRankingsMobile = ({ entries }) => {

  const sortedFishSpecies = sortByCustomAlphabet(uniqueFishSpecies(entries));
  const persons = uniquePersons(entries);
  const sortedPersons = sortPersonsByAmountOfFish(persons, entries)
  // new fontsize based on screen width
  const fontSizeUnit = window.innerWidth/1000*(5/6)


  const customDatasets = fishCaughtByDiffPersons(entries)
    .map(data => {
      return {
        label: data[0].species,
        data: data.map(d => d.amount),
        backgroundColor: chartColors2[
          sortedFishSpecies
          .indexOf(data[0].species)],
        borderColor: '#000000',
        borderWidth: fontSizeUnit*2.5
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
    interaction: {
      mode: 'index'
    },
    layout: {
      padding: {
        right: fontSizeUnit*100,
        left: fontSizeUnit*64,
      }
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'kalojen määrä',
          color: 'white',
          padding: fontSizeUnit*16,
          font: {
            size: fontSizeUnit*40,
            weight: 'bold'
          }
        },
        ticks: {
          color: '#ffffff',
          font: {
            size: fontSizeUnit*40,
            weight: 'bold'
          },
          callback: function(value, index, ticks) {
            if (Math.floor(value) === value) {
              return value;
            }  
          }
        },
        grid: {
          drawBorder: false,
          color: 'rgba(255, 255, 255, 0.5)',
          lineWidth: fontSizeUnit*2,
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
          padding: fontSizeUnit*10,
          font: {
            size: fontSizeUnit*40,
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
        text:'  Saalismäärät henkilöittäin',
        padding: fontSizeUnit*15,
        color: 'white',
        font: {
          size: fontSizeUnit*60,
          weight: 'bold'
        }
      },
      legend:{
        position: 'top',
        align: 'center',
        display: true,
        labels: {
          padding: fontSizeUnit*40,
          boxWidth: fontSizeUnit*70,
          color: 'white',
          font: {
            size: fontSizeUnit*40,
            weight: 'bold'
          }
        }
      },
      tooltip:{
        caretSize: fontSizeUnit*40,
        boxPadding: fontSizeUnit*15,
        padding: fontSizeUnit*40,
        multiKeyBackground: 'transparent',
        titleFont: {
          size: fontSizeUnit*40,
        },
        bodyFont: {
          size: fontSizeUnit*40,
        },
      },
      datalabels: {
        anchor: 'end',
        align: 'right',
        offset: -1,
        color: 'white',
        textStrokeColor: 'black',
        textStrokeWidth: fontSizeUnit*4,
        font: {
          size: fontSizeUnit*55,
          weight: 'bold'
        },
        formatter: (value, ctx) => {
          const total = ctx.chart.$totalizer.totals[ctx.dataIndex]
          return total
        },
        display: function(ctx) {
           return ctx.datasetIndex === ctx.chart.$totalizer.utmost
        }
      }
    }
  }

  // Adjust the margin between the legend and the chart
  const legendMargin = {
    id: 'legendMargin',
    beforeInit(chart) {
      const originalFit = chart.legend.fit;
      chart.legend.fit = function fit() {
        originalFit.bind(chart.legend)();
        return this.height += fontSizeUnit*30;
      }
    }
  }; 

  // Show the total amount next to the bar
  const totalizer = {
    id: 'totalizer',
  
    beforeUpdate: chart => {
      let totals = {}
      let utmost = 0
  
      chart.data.datasets.forEach((dataset, datasetIndex) => {
        if (chart.isDatasetVisible(datasetIndex)) {
          utmost = datasetIndex
          dataset.data.forEach((value, index) => {
            totals[index] = (totals[index] || 0) + value
          })
        }
      })
  
      chart.$totalizer = {
        totals: totals,
        utmost: utmost
      }
    }
  };

  return (
    <div className='barChartRankingsMobileContainer'>
      <Bar 
        data={data}
        options={options}
        plugins={[legendMargin, ChartDataLabels, totalizer]}
      />
    </div>
  )
}

export default BarChartRankingsMobile;