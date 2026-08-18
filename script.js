const searchBox = document.querySelector("#search-box");
const searchBtn = document.querySelector("#search-btn");

async function getWeather() {
    // .trim() removes accidental leading/trailing spaces
    const searchTerm = searchBox.value.trim() || "london";

    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchTerm}?key=FUH9F7JAEJCJCMVVJZ7WBMN92&unitGroup=metric`);
        
        if (!response.ok) {
            throw new Error(`Location not found (${response.status})`);
        }

        const weatherData = await response.json();
        console.log(weatherData);
        console.log("Target Address", weatherData.address);
        console.log("Current Temparature", weatherData.currentConditions.temp);

    } catch (err) {
        console.error("Error fetching weather:", err.message);
        alert("Could not retrieve weather data. Please check the city name.");
    }
}

// Initial load
getWeather();

// Re-run fetch whenever the button is clicked
searchBtn.addEventListener("click", getWeather);

