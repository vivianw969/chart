async function loadData(url) {
  const results = await fetch(url);
  const storedList = await results.json();
  return storedList;
}

async function mainEvent() {
  const apidata = await loadData("https://data.princegeorgescountymd.gov/resource/9tsa-iner.json");
  const { dataSet, labels } = await process4(apidata);
  const ctx = document.getElementById('Chart4').getContext('2d');

  const data = {
    datasets: [dataSet],
    labels: labels,
  };

  const config = {
    type: 'doughnut',
    data: data,
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

  new Chart(ctx, config);
}

async function process4(apidata) {
  const dataForChart4 = apidata.reduce((col, item) => {
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

  return {
    dataSet,
    labels,
  };
}

document.addEventListener("DOMContentLoaded", async () => {
  await mainEvent();
});
