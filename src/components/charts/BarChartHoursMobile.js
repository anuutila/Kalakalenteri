import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

import { chartColors2, halfOfHours } from '../../utils/ChartAssets';
import { fishAmountAtDiffHours, uniqueFishSpecies } from '../../utils/EntriesFunctions';
import { sortByCustomAlphabet } from '../../utils/SortingUtils';

/**
 * Chart component built with Chart.js and react-chartjs-2 library.
 * The chart shows the amount of fish caught at different hours of the day. 
 * The chart is responsive and the user can hover tap the bars to see the 
 * exact amount of different fish species caught at that hour. 
 * The user can also tap on the legend to hide/show the data of a specific fish species. 
 * This version of the chart is designed for smaller mobile screens.
 * @prop {Entry[]} entries - An array containing all the entries
 */
const BarChartHoursMobile = ({ entries }) => {

  // Put the fish species in specific order
  const sortedFishSpecies = sortByCustomAlphabet(uniqueFishSpecies(entries));
  // new fontsize based on screen width
  const fontSizeUnit = window.innerWidth/1000*(5/6)

  const customDatasets = fishAmountAtDiffHours(entries)
    .map(data => {
      return {
        label: data[0].species,
        data: data.map(d => d.amount),
        backgroundColor: chartColors2[
          sortedFishSpecies.indexOf(data[0].species)],
        borderColor: '#000000',
        borderWidth: fontSizeUnit*2.5
      }
  });

  const data = {
    labels: halfOfHours,
    datasets: customDatasets
  };

  const options = {
    maintainAspectRatio: false,
    interaction: {
      mode: 'index'
    },
    indexAxis: 'y',
    scales: {
      y: {
        stacked: true,
        title: {
          display: true,
          text: 'kellonaika',
          color: 'white',
          padding: fontSizeUnit*16,
          font: {
            size: fontSizeUnit*40,
            weight: 'bold'
          }
        },
        ticks: {
          color: '#ffffff',
          padding: fontSizeUnit*10,
          font: {
            size: fontSizeUnit*40,
            weight: 'bold'
          }
        },
        grid: {
          drawBorder: false,
          color: 'transparent',
        }
      },
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'määrä',
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
          lineWidth: fontSizeUnit*2
        }
      }
    },
    plugins: {
      title:{
        display:true,
        text:' Saalismäärät eri kellonaikoina',
        padding: fontSizeUnit*15,
        color: '#ffffff',
          font: {
            size: fontSizeUnit*60,
            weight: 'bold'
          }
      },
      legend:{
        position:'top',
        display:true,
        labels: {
          padding: fontSizeUnit*40,
          boxWidth: fontSizeUnit*70,
          color: 'white',
          font: {
            size: fontSizeUnit*40,
            weight: 'bold'
          }
        },
      },
      tooltip:{
        callbacks: {
          title: (items) => {
            const item = items[0];
            return `klo ${item.dataIndex}:00-${item.dataIndex + 1}:00`;
          },
          footer: (items) => {
            let sum = 0;
            items.forEach((item, index) => {
              sum += item.dataset.data[item.dataIndex]
            })
            return `Yhteensä: ${sum}`;
          }
        },
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
        footerFont: {
          size: fontSizeUnit*40,
          weight: 'bold'
        },
        titleMarginBottom: fontSizeUnit*20,
        footerMarginTop: fontSizeUnit*20,
      }
    }
  };

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

  return (
    <div className='barChartHoursMobileContainer'>
      <Bar 
        data={data}
        options={options}
        plugins={[legendMargin]}
      />
    </div>
  )
}    

export default BarChartHoursMobile