const searchForm = document.querySelector("#search-form");
const searchBox = document.querySelector("#search-box");
// const searchBtn = document.querySelector("#search-btn");

const locationDisplay = document.querySelector("#location-display");
const tempDisplay = document.querySelector("#temp-display");
const unitToggleBtn = document.querySelector("#unit-toggle");

let currentTempCelsius = null;
let isCelsius = true;

function processWeatherData(rawData) {
    return {
        address: rawData.address,
        temperature: rawData.currentConditions?.temp,
    }
}

function displayWeather(data) {
    console.log("***start displayWeather***");
    currentTempCelsius = data.temperature;
    locationDisplay.textContent = data.address;
    updateTemperatureDisplay();
    console.log("***finish displayWeather***");
}

function updateTemperatureDisplay() {
    console.log("***start updateTemperatureDisplay***");
    if (currentTempCelsius === null) return;

    if (isCelsius) {
        tempDisplay.textContent = `${currentTempCelsius}°C`;
        unitToggleBtn.textContent = "Switch to °F";
    } else {
        const tempFahrenheit = (currentTempCelsius * 9/5) + 32;
        tempDisplay.textContent = `${tempFahrenheit.toFixed(1)}°F`;
        unitToggleBtn.textContent = "Switch to °C";
    }
    console.log("***finish updateTemperatureDisplay***");
}

unitToggleBtn.addEventListener("click", () => {
    isCelsius = !isCelsius;
    updateTemperatureDisplay();
});

async function getWeather(event) {
    if(event) {
        event.preventDefault();
    }

    // .trim() removes accidental leading/trailing spaces
    const searchTerm = searchBox.value.trim() || "london";

    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchTerm}?key=FUH9F7JAEJCJCMVVJZ7WBMN92&unitGroup=metric`);
        
        if (!response.ok) {
            throw new Error(`Location not found (${response.status})`);
        }

        const rawData = await response.json();
        const cleanData = processWeatherData(rawData);
        console.log("After processing: ", cleanData);
        // console.log("Target Address", weatherData.address);
        // console.log("Current Temparature", weatherData.currentConditions?.temp);

        displayWeather(cleanData);
        return cleanData;

    } catch (err) {
        console.error("Error fetching weather:", err.message);
        alert("Could not retrieve weather data. Please check the city name.");
    }
}

// Initial load
getWeather();

// Re-run fetch whenever the button is clicked
// searchBtn.addEventListener("click", getWeather);
searchForm.addEventListener("submit", getWeather);

