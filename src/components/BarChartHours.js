import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

import { chartColors2, halfOfHours } from '../utils/ChartAssets';
import { fishAmountAtDiffHours, uniqueFishSpecies } from '../utils/EntriesFunctions';
import { sortByCustomAlphabet } from '../utils/SortingUtils';


const BarChartHours = ({ entries, statsWindowAnimation }) => {

  const sortedFishSpecies = sortByCustomAlphabet(uniqueFishSpecies(entries));

  const datasets = fishAmountAtDiffHours(entries)
    .map(data => {
      return {
        label: data[0].species,
        data: data.map(d => d.amount),
        backgroundColor: chartColors2[ 
          sortedFishSpecies.indexOf(data[0].species)],
        borderColor: '#000000',
        borderWidth: 1
      }
  });

  const data = {
    labels: halfOfHours,
    datasets: datasets
  };

  const options = {
    maintainAspectRatio: false,
    // barThickness: 25,
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'kellonaika',
          color: 'white',
          font: {
            size: 20,
            family: "'Noto Sans'"
          }
        },
        ticks: {
          color: '#ffffff',
          font: {
            size: 20,
          }
        },
        grid: {
          drawBorder: false,
          color: 'transparent',
        }
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: 'määrä',
          color: 'white',
          font: {
            size: 20,
            family: "'Noto Sans'"
          }
        },
        ticks: {
          color: '#ffffff',
          font: {
            size: 20,
            family: "'Noto Sans'"
          },
          callback: function(value, index, ticks) {
            if (Math.floor(value) === value) {
              return value;
            }  
          }
        },
        grid: {
          drawBorder: false,
          color: 'rgba(255, 255, 255, 0.5)'
        }
      }
    },
    plugins: {
      title:{
        display:true,
        text:'Saaliiden määrä eri kellonaikoina',
        padding: 5,
        color: 'white',
        font: {
          size: 24,
          family: "'Noto Sans'"
        }
      },
      legend:{
        position:'top',
        display:true,
        labels: {
          padding: 30,
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
        callbacks: {
          title: (items) => {
            const item = items[0];
            return `klo ${item.dataIndex}:00-${item.dataIndex + 1}:00`;
          }
        },
        caretSize: 10,
        boxPadding: 10,
        padding: 10,
        titleFont: {
          size: 20,
          family: "'Noto Sans'"
        },
        bodyFont: {
          size: 20,
          family: "'Noto Sans'"
        },
      }
    }
  };

  const legendMargin = {
    id: 'legendMargin',
    beforeInit(chart) {
      const originalFit = chart.legend.fit;
      chart.legend.fit = function fit() {
        originalFit.bind(chart.legend)();
        return this.height += 20;
      }
    }
  }; 

  return (
    <div className={`barChartHoursContainer${statsWindowAnimation ? ' appear' : ' disappear'}`}>
      <Bar
        data={data}
        options={options}
        plugins={[legendMargin]}
      />
    </div>
  )
}    

export default BarChartHours