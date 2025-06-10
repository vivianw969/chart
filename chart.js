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

//Add event listeners to each checkbox to control which chart displays
$(`#cChart1`).click(() => {
  if ($('.chart1').is(':visible') && $('.chart2, .chart3, .chart4').is(':hidden')) {
    // If only chart1 is visible, show all charts
    $('.chart1, .chart2, .chart3, .chart4').show().css({
      'width': '45%',
      'min-width': '400px',
      'height': '400px'
    });
    $('#cChart1, #cChart2, #cChart3, #cChart4').prop('checked', false);
  } else {
    // Show only chart1
    $('.chart1').show().css({
      'width': '80%',
      'min-width': '600px',
      'height': '600px'
    });
    $('.chart2, .chart3, .chart4').hide().css({
      'width': '45%',
      'min-width': '400px',
      'height': '400px'
    });
    $('#cChart1').prop('checked', true);
    $('#cChart2, #cChart3, #cChart4').prop('checked', false);
  }
});

$(`#cChart2`).click(() => {
  if ($('.chart2').is(':visible') && $('.chart1, .chart3, .chart4').is(':hidden')) {
    // If only chart2 is visible, show all charts
    $('.chart1, .chart2, .chart3, .chart4').show().css({
      'width': '45%',
      'min-width': '400px',
      'height': '400px'
    });
    $('#cChart1, #cChart2, #cChart3, #cChart4').prop('checked', false);
  } else {
    // Show only chart2
    $('.chart2').show().css({
      'width': '80%',
      'min-width': '600px',
      'height': '600px'
    });
    $('.chart1, .chart3, .chart4').hide().css({
      'width': '45%',
      'min-width': '400px',
      'height': '400px'
    });
    $('#cChart2').prop('checked', true);
    $('#cChart1, #cChart3, #cChart4').prop('checked', false);
  }
});

$(`#cChart3`).click(() => {
  if ($('.chart3').is(':visible') && $('.chart1, .chart2, .chart4').is(':hidden')) {
    // If only chart3 is visible, show all charts
    $('.chart1, .chart2, .chart3, .chart4').show().css({
      'width': '45%',
      'min-width': '400px',
      'height': '400px'
    });
    $('#cChart1, #cChart2, #cChart3, #cChart4').prop('checked', false);
  } else {
    // Show only chart3
    $('.chart3').show().css({
      'width': '80%',
      'min-width': '600px',
      'height': '600px'
    });
    $('.chart1, .chart2, .chart4').hide().css({
      'width': '45%',
      'min-width': '400px',
      'height': '400px'
    });
    $('#cChart3').prop('checked', true);
    $('#cChart1, #cChart2, #cChart4').prop('checked', false);
  }
});

$(`#cChart4`).click(() => {
  if ($('.chart4').is(':visible') && $('.chart1, .chart2, .chart3').is(':hidden')) {
    // If only chart4 is visible, show all charts
    $('.chart1, .chart2, .chart3, .chart4').show().css({
      'width': '45%',
      'min-width': '400px',
      'height': '400px'
    });
    $('#cChart1, #cChart2, #cChart3, #cChart4').prop('checked', false);
  } else {
    // Show only chart4
    $('.chart4').show().css({
      'width': '80%',
      'min-width': '600px',
      'height': '600px'
    });
    $('.chart1, .chart2, .chart3').hide().css({
      'width': '45%',
      'min-width': '400px',
      'height': '400px'
    });
    $('#cChart4').prop('checked', true);
    $('#cChart1, #cChart2, #cChart3').prop('checked', false);
  }
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
  // Calculate total bags of litter collected for each cleanup type
  const typeStats = {};
  data.forEach(item => {
    const type = item.type_cleanup;
    const bags = Number(item.total_bags_litter) || 0;
    
    if (!typeStats[type]) {
      typeStats[type] = 0;
    }
    typeStats[type] += bags;
  });

  // Convert to array and sort
  const sortedTypes = Object.entries(typeStats)
    .map(([type, totalBags]) => ({
      type,
      totalBags
    }))
    .sort((a, b) => b.totalBags - a.totalBags);

  const labels = sortedTypes.map(item => item.type);
  const totalBags = sortedTypes.map(item => item.totalBags);

  const chartdata = {
    labels: labels,
    datasets: [{
      label: 'Total Bags of Litter Collected',
      data: totalBags,
      backgroundColor: [
        'rgba(54, 162, 235, 0.8)',  // Blue
        'rgba(255, 99, 132, 0.8)',  // Red
        'rgba(75, 192, 192, 0.8)',  // Teal
        'rgba(255, 206, 86, 0.8)',  // Yellow
        'rgba(153, 102, 255, 0.8)', // Purple
        'rgba(255, 159, 64, 0.8)'   // Orange
      ],
      borderColor: [
        'rgb(54, 162, 235)',
        'rgb(255, 99, 132)',
        'rgb(75, 192, 192)',
        'rgb(255, 206, 86)',
        'rgb(153, 102, 255)',
        'rgb(255, 159, 64)'
      ],
      borderWidth: 2,
      borderRadius: 5,
      barThickness: 40
    }]
  };

  const config = {
    type: 'bar',
    data: chartdata,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Total Litter Collection by Clean-up Type',
          font: {
            size: 18,
            weight: 'bold'
          },
          padding: {
            top: 10,
            bottom: 10
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `Total Bags: ${context.parsed.y.toLocaleString()}`;
            }
          }
        },
        legend: {
          display: false
        },
        subtitle: {
          display: true,
          text: 'Note: Logarithmic scale used to better visualize the wide range of values',
          font: {
            size: 12,
            style: 'italic'
          },
          padding: {
            bottom: 5
          },
          position: 'bottom'
        }
      },
      scales: {
        y: {
          type: 'logarithmic',
          beginAtZero: false,
          min: 1,
          max: Math.max(...totalBags) * 1.2,
          title: {
            display: true,
            text: 'Total Bags of Litter',
            font: {
              size: 14,
              weight: 'bold'
            }
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          },
          ticks: {
            callback: function(value) {
              const ranges = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000];
              if (ranges.includes(value)) {
                return value.toLocaleString();
              }
              return '';
            },
            major: {
              enabled: true
            },
            minor: {
              enabled: false
            },
            count: 5,
            stepSize: 1,
            source: 'auto',
            autoSkip: true,
            maxTicksLimit: 5
          }
        },
        x: {
          title: {
            display: true,
            text: 'Clean-up Types',
            font: {
              size: 14,
              weight: 'bold'
            }
          },
          grid: {
            display: false
          },
          ticks: {
            align: 'center'
          }
        }
      }
    }
  };
  new Chart(ctx1, config);
}

async function process2(data) {
  const totalPoints = data.length;
  const interval = Math.ceil(totalPoints / 50);
  const filteredData = data.filter((_, index) => index % interval === 0);
  
  const bagCounts = filteredData.map(item => item.total_bags_litter);
  const creationDates = filteredData.map(item => item.creationdate);
  const xlabels = creationDates;

  const chartConfig = {
    type: 'line',
    data: {
      labels: xlabels,
      datasets: [{
        label: 'Bags of Litter Collected',
        data: bagCounts,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Litter Collection Over Time',
          font: {
            size: 18,
            weight: 'bold'
          },
          padding: 20
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Bags',
            font: {
              size: 14,
              weight: 'bold'
            }
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Date',
            font: {
              size: 14,
              weight: 'bold'
            }
          },
          grid: {
            display: false
          },
          ticks: {
            maxRotation: 45,
            minRotation: 45,
            callback: function(value, index, values) {
              const date = new Date(this.getLabelForValue(value));
              return date.toLocaleDateString('en-US', { 
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              });
            }
          }
        }
      }
    }
  };

  new Chart(ctx2, chartConfig);
}

async function process3(data) {
  // Calculate total tires collected for each district
  const districtStats = {};
  data.forEach(item => {
    const district = item.council_district;
    const tires = Number(item.total_tires) || 0;
    
    if (!districtStats[district]) {
      districtStats[district] = 0;
    }
    districtStats[district] += tires;
  });

  const districtNames = {
    1: "Beltsville/Laurel",
    2: "Bowie/Upper Marlboro",
    3: "College Park/Greenbelt",
    4: "Fort Washington/Accokeek",
    5: "Hyattsville/New Carrollton",
    6: "Largo/Mitchellville",
    7: "Oxon Hill/Glassmanor",
    8: "Suitland/Camp Springs",
    9: "Temple Hills/Clinton"
  };

  // Convert to array and sort
  const sortedDistricts = Object.entries(districtStats)
    .map(([district, totalTires]) => ({
      district: Number(district),
      totalTires
    }))
    .sort((a, b) => a.district - b.district);

  const xlabels = sortedDistricts.map(item => districtNames[item.district] || '');
  const tiresCount = sortedDistricts.map(item => item.totalTires);

  const chartData = {
    labels: xlabels,
    datasets: [{
      label: 'Total Tires Collected',
      data: tiresCount,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 2,
      pointBackgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(199, 199, 199, 1)',
        'rgba(83, 102, 255, 1)',
        'rgba(40, 159, 64, 1)'
      ],
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6
    }]
  };

  const chartConfig = {
    type: 'radar',
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Tire Collection Distribution Across Council Districts',
          font: {
            size: 16,
            weight: 'bold'
          },
          padding: 5
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `Total Tires: ${context.parsed.r.toLocaleString()}`;
            }
          }
        },
        legend: {
          position: 'bottom',
          align: 'end',
          labels: {
            boxWidth: 12,
            padding: 15,
            font: {
              size: 12
            }
          }
        }
      },
      scales: {
        r: {
          beginAtZero: true,
          min: 0,
          max: Math.max(...tiresCount) * 1.5,
          title: {
            display: true,
            text: 'Number of Tires',
            font: {
              size: 12,
              weight: 'bold'
            }
          },
          ticks: {
            stepSize: Math.ceil(Math.max(...tiresCount) / 4),
            backdropColor: 'rgba(255, 255, 255, 0.8)',
            font: {
              size: 10,
              weight: 'bold'
            }
          },
          pointLabels: {
            font: {
              size: 10,
              weight: 'bold'
            },
            padding: 8,
            centerPointLabels: true,
            callback: function(label) {
              // Show only the first word of the district name
              return label.split(' ')[0];
            }
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
            circular: true
          },
          angleLines: {
            color: 'rgba(0, 0, 0, 0.2)',
            lineWidth: 1
          }
        }
      },
      elements: {
        line: {
          borderWidth: 3,
          tension: 0.4
        },
        point: {
          radius: 3,
          hoverRadius: 5,
          borderWidth: 2
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
    label: 'Number of Events',
    data: Object.values(dataForChart4),
    backgroundColor: [
      'rgba(54, 162, 235, 0.9)',
      'rgba(255, 99, 132, 0.9)',
      'rgba(255, 206, 86, 0.9)',
      'rgba(75, 192, 192, 0.9)',
      'rgba(153, 102, 255, 0.9)',
      'rgba(255, 159, 64, 0.9)'
    ],
    borderColor: [
      'rgb(54, 162, 235)',
      'rgb(255, 99, 132)',
      'rgb(255, 206, 86)',
      'rgb(75, 192, 192)',
      'rgb(153, 102, 255)',
      'rgb(255, 159, 64)'
    ],
    borderWidth: 2,
    hoverOffset: 20
  };

  const chartData = {
    datasets: [dataSet],
    labels: labels,
  };

  const config4 = {
    type: 'doughnut',
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 12,
            padding: 15,
            font: {
              size: 11
            }
          }
        },
        title: {
          display: true,
          text: 'Organizations Involved in Clean-up Events',
          font: {
            size: 16,
            weight: 'bold'
          },
          padding: {
            bottom: 20
          }
        }
      },
      layout: {
        padding: {
          top: 20,
          bottom: 20
        }
      }
    }
  };

  new Chart(ctx4, config4);
}

document.addEventListener("DOMContentLoaded", async () => {
  await mainEvent();
});
