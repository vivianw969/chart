async function loadData(url) {
  const results = await fetch(url);
  const storedList = await results.json();
  return storedList;
}

async function mainEvent() {
  const apidata = await loadData("https://data.princegeorgescountymd.gov/resource/9tsa-iner.json");
  process3(apidata);
}

async function process3(apidata) {
  const tiresCount = apidata.map(item => item.total_tires);
  let mySet = new Set(apidata.map(item => item.council_district));

// 将Set转换为数组
  let labelsArray = Array.from(mySet);
  
  const xlabels = labelsArray;


  const ctx = document.getElementById('Chart3').getContext('2d');

  const data = {
    labels: xlabels,
    datasets: [
      {
        label: 'Tires Collected',
        data: tiresCount,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      }
    ]
  };


  const config = {
  type: 'radar',
  data: data,
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Radar Chart'
      }
    }
  },
};
  
  new Chart(ctx, config);
}


document.addEventListener("DOMContentLoaded", async () => {
  await mainEvent();
});

