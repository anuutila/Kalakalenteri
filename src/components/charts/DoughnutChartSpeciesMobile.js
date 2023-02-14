import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS} from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import DoughnutLabel from "chartjs-plugin-doughnutlabel-rebourne";

import { chartColors2 } from '../../utils/ChartAssets';
import { uniqueFishSpecies } from "../../utils/EntriesFunctions";
import { sortByCustomAlphabet } from "../../utils/SortingUtils";

/**
 * Chart component built with Chart.js that shows the amount of fish caught per species. 
 * The chart is also interactive and the user can tap on the legend to hide and show different datasets. 
 * The chart also shows the total amount of fish caught in the middle of the chart.
 * This version of the chart is designed for smaller mobile screens.
 * @prop {Entry[]} entries - An array containing all the entries
 */
const DoughnutChartSpeciesMobile = ({ entries }) => {

  const [totalAmount, setTotalAmount] = useState(entries.length);

  useEffect(() => {
    setTotalAmount(entries.length);
  } , [entries]);

  // Put the fish species in specific order
  const sortedFishSpecies = sortByCustomAlphabet(uniqueFishSpecies(entries));

  // Chart fontsize based on screen width
  const fontSizeUnit = window.innerWidth/1000*(5/6)

  const customDatasets = {
    label: '',
    data: sortedFishSpecies
      .map(fish => entries.filter(e => e.fish === fish).length),
    backgroundColor: chartColors2,
    borderColor: '#000000',
    borderWidth: fontSizeUnit*2.5,
    offset: fontSizeUnit*25,
    datalabels: {
      color: '#ffffff',
      textStrokeColor: '#000000',
      textStrokeWidth: fontSizeUnit*10,
      font: {
        size: fontSizeUnit*85,
        weight: 'bold',
        family: "'Noto Sans'"
      }
    }
  }

  const data = {
    labels: sortedFishSpecies,
    datasets: [customDatasets]
  };

  const options = {
    maintainAspectRatio: false,
    hoverOffset: fontSizeUnit*50,
    layout: {
      padding: fontSizeUnit*25
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
      title: {
        display: true,
        text: 'Saaliiden lajijakauma',
        padding: fontSizeUnit*15,
        color: 'white',
        font: {
          size: fontSizeUnit*60,
          weight: 'bold',
        }
      },
      legend:{
        position:'top',
        labels: {
          padding: fontSizeUnit*40,
          boxWidth: fontSizeUnit*70,
          color: 'white',
          font: {
            size: fontSizeUnit*40,
            weight: 'bold',
            
          }
        },
        onClick: (event, legendItem, legend) => {
          if (legendItem.hidden) {
            setTotalAmount(totalAmount + legend.chart.data.datasets[0].data[legendItem.index])
          } 
          if (!legendItem.hidden) {
            setTotalAmount(totalAmount - legend.chart.data.datasets[0].data[legendItem.index])
          }
          legend.chart.toggleDataVisibility(legendItem.index);
          legend.chart.update();
        },
      },
      doughnutlabel: {
        display: true,
        labels: [
          {
            text: 'yht.',
            color: '#bbbbbb',
            font: {
              size: fontSizeUnit*50,
              weight: 'bold',
              family: "'Noto Sans'"
            }
          },
          {
            text: totalAmount,
            color: '#dddddd',
            font: {
              size: fontSizeUnit*160,
              weight: 'bold',
              family: "'Noto Sans'"
            }
          },
          {
            text: '',
            font: {
              size: fontSizeUnit*25,
            }
          }
        ]
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
        return this.height += fontSizeUnit*35;
      }
    }
  }; 

  return (
    <div className="doughnutChartSpeciesMobileContainer">
      <Doughnut
        data={data}
        options={options}
        plugins={[ChartDataLabels, DoughnutLabel, legendMargin]}
      />
    </div>
  )
}

export default DoughnutChartSpeciesMobile;