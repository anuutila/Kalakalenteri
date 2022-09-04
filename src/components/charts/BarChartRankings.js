import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { chartColors2 } from '../../utils/ChartAssets';
import { fishCaughtByDiffPersons, 
         uniqueFishSpecies, 
         uniquePersons } from '../../utils/EntriesFunctions';
import { sortByCustomAlphabet, sortPersonsByAmountOfFish } from '../../utils/SortingUtils';


const BarChartRankings = ({ entries }) => {

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
        borderWidth: 1
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
        right: 60,
        left: 40,
      }
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'kalojen määrä',
          color: 'white',
          font: {
            size: 20,
          }
        },
        ticks: {
          color: '#ffffff',
          font: {
            size: 20,
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
        }
      },
      y: {
        stacked: true,
        title: {
          display: false,
          text: 'kalastajat',
          color: 'white',
          font: {
            size: 20,
            family: "'Noto Sans'"
          }
        },
        ticks: {
          z: 1,
          mirror: false,
          color: '#ffffff',
          font: {
            size: 22,
            family: "'Noto Sans'"
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
        text:'   Saalismäärät henkilöittäin',
        padding: 10,
        color: 'white',
        font: {
          size: 24,
          family: "'Noto Sans'"
        }
      },
      legend:{
        position: 'top',
        display: true,
        labels: {
          padding: 15,
          color: 'white',
          font: {
            size: 20,
            family: "'Noto Sans'"
          }
        },
        onHover: (event, chartElement) => {
          event.native.target.style.cursor = 'pointer';
        },
        onLeave: (event, chartElement) => {
          event.native.target.style.cursor = 'default';
        }
      },
      tooltip:{
        caretSize: 10,
        boxPadding: 10,
        padding: 10,
        multiKeyBackground: 'transparent',
        titleFont: {
          size: 20,
          family: "'Noto Sans'"
        },
        bodyFont: {
          size: 20,
          family: "'Noto Sans'"
        },
      },
      datalabels: {
        display: true,
        anchor: 'end',
        align: 'right',
        color: 'white',
        textStrokeColor: 'black',
        textStrokeWidth: 3,
        font: {
          size: 25,
          family: "'Noto Sans'",
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

  const legendMargin = {
    id: 'legendMargin',
    beforeInit(chart) {
      const originalFit = chart.legend.fit;
      chart.legend.fit = function fit() {
        originalFit.bind(chart.legend)();
        return this.height += 15;
      }
    }
  }; 

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
    <div className='barChartRankingsContainer'>
      <Bar className='barChartRankingsCanvas'
        data={data}
        options={options}
        plugins={[legendMargin, ChartDataLabels, totalizer]}
      />
    </div>
  )
}

export default BarChartRankings;