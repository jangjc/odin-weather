const searchBox = document.querySelector("#search-box");
const searchBtn = document.querySelector("#search-btn");

async function getWeather() {
    const searchTerm = searchBox.value || "london";

    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchTerm}?key=FUH9F7JAEJCJCMVVJZ7WBMN92`);
        const weatherData = await response.json();
        console.log(weatherData);

    } catch (err) {
        console.error(err);
    }
}

// Initial load
getWeather();

// Re-run fetch whenever the button is clicked
searchBtn.addEventListener("click", getWeather);

