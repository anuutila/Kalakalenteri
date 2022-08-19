import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';




const BarChartMobile = ({ entries, statsWindowAnimation }) => {

  const customAlphabet = 'kahbcdefgijlmnopqrstuvwxyzåäö'

  const uniqueFishSpecies = [...new Set(entries.map(e => e.fish))]
    .sort((a, b) => {
      return customAlphabet.indexOf(a.substring(0,1)) - customAlphabet.indexOf(b.substring(0,1))});

  console.log(uniqueFishSpecies);  

  const hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11',
  '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']

  const halfOfHours = ['00', '', '02', '', '04', '', '06', '', '08', '', '10', '', 
  '12', '', '14', '', '16', '', '18', '', '20', '', '22', '', '24']

  //const chartColors = ['rgb(190, 85, 255)','rgb(255, 230, 75)', 'rgb(75, 234, 172)', 'rgb(255, 131, 112)', 'rgb(75, 131, 255)'] 
  const chartColors2 = ['rgb(75, 131, 255)','rgb(255, 131, 112)', 'rgb(255, 230, 75)', 'rgb(190, 85, 255)', 'rgb(75, 234, 172)']
  //const chartColors3 = ['rgb(0, 107, 164)', 'rgb(255, 128, 14)', 'rgb(89, 89, 89)', 'rgb(171, 171, 171)']

  function fishAmountAtDiffHours(species) { 
    const fishAmounts = []
    for (let i = 0; i < species.length; i++) {
      fishAmounts.push(
        hours.map(hour => {
          return {
            time: hour,
            species: species[i],
            amount: entries
              .filter(e => e.time.substring(0, 2) === hour)
              .filter(e => e.fish === species[i])
              .length
          }    
        })
      )  
    }  
    return fishAmounts
  }

  const customDatasets = fishAmountAtDiffHours(uniqueFishSpecies).map(data => {
    return {
      label: data[0].species,
      data: data.map(d => d.amount),
      backgroundColor: chartColors2[uniqueFishSpecies.indexOf(data[0].species)],
      borderColor: '#000000',
      borderWidth: 1
    }
  });

  const data = {
    labels: halfOfHours,
    datasets: customDatasets
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'kellonaika',
          color: 'white',
          font: {
            size: 26,
            weight: 'bold'
          }
        },
        ticks: {
          color: '#ffffff',
          font: {
            size: 26,
            weight: 'bold'
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
            size: 26,
            weight: 'bold'
          }
        },
        ticks: {
          color: '#ffffff',
          font: {
            size: 26,
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
            size: 36,
            weight: 'bold'
          }
      },
      legend:{
        position:'top',
        display:true,
        labels: {
          padding: 30,
          color: 'white',
          font: {
            size: 26,
            weight: 'bold'
          }
        }
      },
      tooltip:{
        callbacks: {
          title: (items) => {
            const item = items[0];
            return `klo ${item.dataIndex}:00-${item.dataIndex + 1}:00`;
          }
        },
        caretSize: 30,
        boxPadding: 10,
        padding: 30,
        titleFont: {
          size: 36,
        },
        bodyFont: {
          size: 36,
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
        return this.height += 25;
      }
    }
  }; 

  return (
    <div className={`barChartMobile${statsWindowAnimation ? ' appear' : ' disappear'}`}>
      <Bar className={`barChartMobileCanvas${statsWindowAnimation ? ' appear' : ' disappear'}`}
        data={data}
        options={options}
        plugins={[legendMargin]}
      />
    </div>
  )
}    

export default BarChartMobile