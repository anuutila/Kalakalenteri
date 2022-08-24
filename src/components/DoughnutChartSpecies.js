import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS} from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import DoughnutLabel from "chartjs-plugin-doughnutlabel-rebourne";

import { chartColors2 } from '../utils/ChartAssets';
import { uniqueFishSpecies } from "../utils/EntriesFunctions";
import { sortByCustomAlphabet } from "../utils/SortingUtils";

const DoughnutChartSpecies = ({ entries }) => {

  const [totalAmount, setTotalAmount] = useState(entries.length);

  useEffect(() => {
    setTotalAmount(entries.length);
  } , [entries]);

  const sortedFishSpecies = sortByCustomAlphabet(uniqueFishSpecies(entries));

  const customDataset = {
    label: '',
    data: sortedFishSpecies
      .map(fish => entries.filter(e => e.fish === fish).length),
    backgroundColor: chartColors2,
    borderColor: '#000000',
    borderWidth: 1,
    offset: 10,
    datalabels: {
      color: '#ffffff',
      textStrokeColor: '#000000',
      textStrokeWidth: 5,
      font: {
        size: 36,
        weight: 'bold',
        family: "'Noto Sans'"
      }
    }
  }

  const data = {
    labels: sortedFishSpecies,
    datasets: [customDataset]
  };

  const options = {
    maintainAspectRatio: false,
    hoverOffset: 20,
    layout: {
      padding: 10
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
      title: {
        display: true,
        text: 'Saaliiden lajijakauma',
        padding: 10,
        color: 'white',
        font: {
          size: 24,
          family: "'Noto Sans'"
        }
      },
      legend:{
        position:'top',
        labels: {
          padding: 15,
          color: 'white',
          font: {
            size: 20,
            family: "'Noto Sans'"
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
        onHover: (event, chartElement) => {
          event.native.target.style.cursor = 'pointer';
        },
        onLeave: (event, chartElement) => {
          event.native.target.style.cursor = 'default';
        }
      },
      doughnutlabel: {
        display: true,
        labels: [
          {
            text: 'yht.',
            color: '#bbbbbb',
            font: {
              size: 20,
              weight: 'bold',
              family: "'Noto Sans'"
            }
          },
          {
            text: totalAmount,
            color: '#dddddd',
            font: {
              size: 64,
              weight: 'bold',
              family: "'Noto Sans'"
            }
          },
          {
            text: '',
            font: {
              size: 10,
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
        return this.height += 15;
      }
    }
  }; 

  return (
    <div className="doughnutChartSpeciesContainer">
      <Doughnut
        data={data}
        options={options}
        plugins={[ChartDataLabels, DoughnutLabel, legendMargin]}
      />
    </div>
  )
}

export default DoughnutChartSpecies;