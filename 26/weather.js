
const key = "eb87e192c249b65952a01785b2f91998"
const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-box");
const searchBtn = document.querySelector(".search-button");

// Add an event listener for the button
searchBtn.addEventListener("click", () => {
    const cityName = searchBox.value;
    if (cityName) {
        fetchWeatherData(cityName);
    }
});

// Function to fetch weather data
async function fetchWeatherData(city) {
    try {
        const response = await fetch(url + city + `&appid=${key}`);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        alert(error.message);
    }
}


// Function to update the UI with fetched data
function updateWeatherUI(data) {
    const cityElement = document.querySelector(".city");
    const tempElement = document.querySelector(".temp");
    const humidityElement = document.querySelector(".humidity");
    const windElement = document.querySelector(".wind");

    cityElement.textContent = data.name;
    tempElement.textContent = `${Math.round(data.main.temp)}°C`;
    humidityElement.textContent = `${data.main.humidity}%`;
    windElement.textContent = `${data.wind.speed} km/h`;

// Update weather icon if needed
    const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    document.querySelector(".weather-icon").src = weatherIcon;
}
