function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }
  
async function mainEvent() {
  console.log('Loaded script.js');
}

document.addEventListener("DOMContentLoaded", async () => mainEvent()); // the async keyword means we can make API requests
