const API_KEY = "fa0ef5000529148b6b6dd1606ab90131";

// Store frequently used elements in variables
const cityNameElement = document.getElementById('city-name');
const weatherTypeElement = document.getElementById('weather-type');
const tempElement = document.getElementById('temp');
const minTempElement = document.getElementById('min-temp');
const maxTempElement = document.getElementById('max-temp');
const weatherIconElement = document.getElementById('weather-icon');
const additionTextElement = document.getElementById('addition-Text');
const convertButton = document.getElementById('convert');

// Cache for fetched weather data
const weatherDataCache = {};

const unitObj = {
    metric: ' C',
    imperial: ' F'
};



const getWeatherData = async (city) => {
    const URL = "https://api.openweathermap.org/data/2.5/weather";
    const fullURL = `${URL}?q=${city}&appid=${API_KEY}&units=metric`;

    if (weatherDataCache[fullURL]) {
        return weatherDataCache[fullURL];
    }

    try {
        const response = await fetch(fullURL);
        const weatherData = await response.json();
        weatherDataCache[fullURL] = weatherData;
        return weatherData;
    } catch (error) {
        console.log('Error while fetching weather data: ' + error);
        throw error;
    }
};

const convertTemperature = (temp, toFahrenheit) => {
    if (toFahrenheit) {
        let result = (temp * 9 / 5) + 32
        return result.toFixed(2) + unitObj.imperial;
    } else {
        return temp + unitObj.metric;
    }
};

// ...



const showWeatherData = (weatherData) => {
    const { name, weather, main } = weatherData;

    // Update the elements with weather data
    cityNameElement.innerText = name;
    weatherTypeElement.innerText = weather[0].main;
    // additionTextElement.innerText = 'Looking for Temperature in Fahrenheit';
    tempElement.innerText = convertTemperature((main.temp.toFixed(2)), false);
    minTempElement.innerText = convertTemperature((main.temp_min.toFixed(2)), false);
    maxTempElement.innerText = convertTemperature((main.temp_max.toFixed(2)), false);
    weatherIconElement.src = `https://openweathermap.org/img/w/${weather[0].icon}.png`;
    additionTextElement.innerText = 'Looking for Temperature in?';


    // Add event listener for temperature conversion
    convertButton.addEventListener('click', () => {
        const toFahrenheit = (convertButton.innerText === 'Fahrenheit');
        tempElement.innerText = convertTemperature(main.temp, toFahrenheit);
        minTempElement.innerText = convertTemperature(main.temp_min, toFahrenheit);
        maxTempElement.innerText = convertTemperature(main.temp_max, toFahrenheit);
        convertButton.innerText = toFahrenheit ? 'Celsius' : 'Fahrenheit';
    });
};


// getting input and fetching the data
const searchCity = async () => {
    const city = document.getElementById('city-input').value;

    try {
        const weatherData = await getWeatherData(city);
        showWeatherData(weatherData);
    } catch (error) {
        // Display an error message to the user
        console.log('An error occurred: ' + error);
    }
};