//API function
async function chartData() {
  let result = await fetch(
    "https://data.princegeorgescountymd.gov/resource/9tsa-iner.json"
  );
  let data = await result.json();
  return data;
}


async function cleantypeCount(data) {
  try {
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

    const ctx = document.getElementById('Chart1');
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


    const myChart = new Chart(ctx, config); // 创建图表
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


document.addEventListener("DOMContentLoaded", async () => {
  await mainEvent();
});
