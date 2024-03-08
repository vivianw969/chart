async function loadData() {
  let result = await fetch(
    "https://data.princegeorgescountymd.gov/resource/9tsa-iner.json"
  );
  let data = await result.json();
  return data;
}


async function main() {``
  const chartTarget = document.querySelector('Chart2'); 
  const data = await loadData('https://data.princegeorgescountymd.gov/resource/9tsa-iner.json');
  processData(data);
}

function processData(data) {
  const bagCounts = data.map(item => item.total_bags_litter)
  const creationDates = data.map(item => item.creationdate);
  const xlabels = creationDates; 

  // 定义图表配置
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

  // 创建图表
  const ctx = document.getElementById('Chart2').getContext('2d');
  new Chart(ctx, chartConfig);
}

// 初始化
document.addEventListener("DOMContentLoaded", async () => {
  await main();
});
