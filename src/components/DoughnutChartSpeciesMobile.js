import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS} from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import DoughnutLabel from "chartjs-plugin-doughnutlabel-rebourne";

import { chartColors2 } from '../utils/ChartAssets';
import { uniqueFishSpecies } from "../utils/EntriesFunctions";
import { sortByCustomAlphabet } from "../utils/SortingUtils";

const DoughnutChartSpeciesMobile = ({ entries }) => {

  const [totalAmount, setTotalAmount] = useState(entries.length);

  const sortedFishSpecies = sortByCustomAlphabet(uniqueFishSpecies(entries));

  const customDataset = {
    label: '',
    data: sortedFishSpecies
      .map(fish => entries.filter(e => e.fish === fish).length),
    backgroundColor: chartColors2,
    borderColor: '#000000',
    borderWidth: 2,
    offset: 25,
    datalabels: {
      color: '#ffffff',
      textStrokeColor: '#000000',
      textStrokeWidth: 12,
      font: {
        size: 90,
        weight: 'bold'
      }
    }
  }

  const data = {
    labels: sortedFishSpecies,
    datasets: [customDataset]
  };

  const options = {
    maintainAspectRatio: false,
    // hoverOffset: 52,
    layout: {
      padding: 26
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
      title: {
        display: true,
        text: 'Saaliiden lajijakauma',
        padding: 0,
        color: 'white',
        font: {
          size: 60,
          weight: 'bold',
        }
      },
      legend:{
        position:'top',
        labels: {
          padding: 60,
          color: 'white',
          font: {
            size: 40,
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
              size: 50,
              weight: 'bold',
              family: "'Noto Sans'"
            }
          },
          {
            text: totalAmount,
            color: '#dddddd',
            font: {
              size: 160,
              weight: 'bold',
              family: "'Noto Sans'"
            }
          },
          {
            text: '',
            font: {
              size: 25,
            }
          }
        ]
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