const Chart = window.Chart;
  
// edit this function to accept options and change your chart
function initChart(target, data, labels) {
    const chart = new Chart(target, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [data]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    return chart;
  }


// new {
//   'pizza' : 2,
//   'fast food': 67,
//   'fine dinign': 120
// }

// old [{
//   category:'pizza',
//   'handwashing_violation': true
// },
//     {
//   category:'pizza',
//   'handwashing_violation': false
// }]

// const newThing = data.reduce((col, item, idx) => {
//   if {}
//   else {}
//   return col;
// }, {})


// Edit this function to rearrange your data into something a chart can display
function processChartData(data) {
  const dataForChart = data.reduce((col, item, idx) => {
      if (!col[item.category]) {
          col[item.category] = 1
      }
       else {
          col[item.category] += 1
       }
      return col;
  }, {})

  const labels = Object.keys(dataForChart);

  const dataSet = {
          label: 'Categories',
          data: Object.values(dataForChart),
          borderWidth: 1
        }

  return {
    dataSet,
    labels
  }
}

function updateChart(chart, newInfo) {
    const chartData = processChartData(newInfo);
    chart.data.labels = chartData[1];
    console.log(chartData);
    chart.data.datasets[0] = chartData[0];
    chart.update();
  }

// https://javascript.info/async
// Please use async-await keywords for code legibility
async function loadData(url) {
  const results = await fetch(url);
  // This changes the response from the GET into data we can use - an "object"
  const storedList = await results.json();
  console.table(storedList);
  return storedList;
}

async function mainEvent() {
  const chartTarget = document.querySelector('#myChart');
  const apiData = await loadData("https://data.princegeorgescountymd.gov/resource/9tsa-iner.json");
  const chartData = processChartData(apiData);
  console.log(apiData)
  const newChart = initChart(chartTarget, chartData.dataSet, chartData.labels);
}

// This is the first loaded line of your code
// the async keyword means we can make API requests
document.addEventListener("DOMContentLoaded", async () => mainEvent()); 