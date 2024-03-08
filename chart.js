function myFunction() {
  var x = document.querySelector(".nav");
  if (x.className === "nav") {
    x.className += " responsive";
  } else {
    x.className = "nav";
  }
}

$("body>div").on("click", () => {
  $(".responsive").removeClass("responsive");
});

$("body>footer").on("click", () => {
  $(".responsive").removeClass("responsive");
});
//Add event listeners to each checkbox to control whether
//chart displays or not.
$(`#cChart1`).click(() => {
  $(`.chart1`).toggle();
});
$(`#cChart2`).click(() => {
  $(`.chart2`).toggle();
});
$(`#cChart3`).click(() => {
  $(`.chart3`).toggle();
});
$(`#cChart4`).click(() => {
  $(`.chart4`).toggle();
});


// API function
async function loadData() {
  try {
    let result = await fetch("https://data.princegeorgescountymd.gov/resource/9tsa-iner.json");
    let data = await result.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function mainEvent() {
  const apidata = await loadData();
  await process1(apidata);
  await process2(apidata);
  await process3(apidata);
  await process4(apidata);
}

// Chart contexts
const ctx1 = document.getElementById("Chart1").getContext("2d");
const ctx2 = document.getElementById("Chart2").getContext("2d");
const ctx3 = document.getElementById("Chart3").getContext("2d");
const ctx4 = document.getElementById("Chart4").getContext("2d");

// Data processing functions
async function process1(data) {
  const cleantype = data.map(item => item.type_cleanup);
  const typeCount = {};

  for (let i = 0; i < cleantype.length; i++) {
    let elem = cleantype[i];
    if (!typeCount[elem]) {
      typeCount[elem] = 1;
    } else {
      typeCount[elem]++;
    }
  }

  const labels = Object.keys(typeCount);
  const chartdata = {
    labels: labels,
    datasets: [{
      label: 'Clean_Up Types',
      data: Object.values(typeCount),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  };

  const config = {
    type: 'bar',
    data: chartdata,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  new Chart(ctx1, config);
}

async function process2(data) {
  const bagCounts = data.map(item => item.total_bags_litter);
  const creationDates = data.map(item => item.creationdate);
  const xlabels = creationDates;

  const chartConfig = {
    type: 'line',
    data: {
      labels: xlabels,
      datasets: [{
        label: 'Bags Collected',
        data: bagCounts,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      }]
    }
  };

  new Chart(ctx2, chartConfig);
}

async function process3(data) {
  const tiresCount = data.map(item => item.total_tires);
  let mySet = new Set(data.map(item => item.council_district));
  let labelsArray = Array.from(mySet);
  const xlabels = labelsArray;

  const chartData = {
    labels: xlabels,
    datasets: [{
      label: 'Tires Collected',
      data: tiresCount,
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
    }]
  };

  const chartConfig = {
    type: 'radar',
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Tire Counts'
        }
      }
    }
  };

  new Chart(ctx3, chartConfig);
}

async function process4(data) {
  const dataForChart4 = data.reduce((col, item) => {
    if (!col[item.organization]) {
      col[item.organization] = 1;
    } else {
      col[item.organization] += 1;
    }
    return col;
  }, {});

  const labels = Object.keys(dataForChart4);

  const dataSet = {
    label: 'Organization',
    data: Object.values(dataForChart4),
    backgroundColor: [
      'rgba(75,192,192,0.2)',
      'rgba(255,99,132,0.2)',
      'rgba(255,206,86,0.2)',
    ],
    borderColor: [
      'rgba(75,192,192,1)',
      'rgba(255,99,132,1)',
      'rgba(255,206,86,1)',
    ],
    borderWidth: 1,
  };

  const chartData = {
    datasets: [dataSet],
    labels: labels,
  };

  const chartConfig = {
    type: 'doughnut',
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Involved Organizations',
        },
        tooltips: {
          callbacks: {
            label: function(context) {
              return context.label + ': ' + context.parsed + '%';
            },
          },
        },
      },
    },
  };

  new Chart(ctx4, chartConfig);
}

document.addEventListener("DOMContentLoaded", async () => {
  await mainEvent();
});
