let API_KEY = "fa0ef5000529148b6b6dd1606ab90131";


// object for units
let unitObj = {
    metric: ' C',
    imperial: ' F'
}

// https://api.openweathermap.org/data/2.5/weather?q=detroit&appid=a8e71c9932b20c4ceb0aed183e6a83bb&units=imperial

const getWeatherData = async (city, unit) => {
    const URL = "https://api.openweathermap.org/data/2.5/weather";
    const fullURL = `${URL}?q=${city}&appid=${API_KEY}&units=${unit}`;

    const response = await fetch(fullURL);
    const weatherData = await response.json();
    return weatherData;
}


const searchCity = (unit) => {
    const city = document.getElementById('city-input').value;

    getWeatherData(city, unit)
        .then((res) => {
            showWeatherData(res, unit)
        }).catch((error) => {
            console.log('Error while fetching weather data: ' + error)
        })
}

const showWeatherData = (weatherData, unit) => {

    const { main, name, weather, id } = weatherData
    userid = id
    usercityid = weather[0].cityid
    const iconLink = `https://openweathermap.org/img/w/${weather[0].icon}.png`
    document.getElementById('city-name').innerText = name
    document.getElementById('weather-type').innerText = weather[0].main
    document.getElementById('temp').innerText = main.temp + unitObj.metric
    document.getElementById('min-temp').innerText = main.temp_min + unitObj.metric
    document.getElementById('max-temp').innerText = main.temp_max + unitObj.metric
    document.getElementById('weather-icon').src = iconLink
    document.getElementById('addition-Text').innerText = 'Looking for Temperature in Fahrenheit'


    let convertData = document.getElementById('convert')
    convertData.addEventListener('click', async () => {
        if (convertData.innerText === 'Fahrenheit') {
            document.getElementById('temp').innerText = (main.temp * 9 / 5) + 32 + unitObj.imperial
            document.getElementById('min-temp').innerText = (main.temp_min * 9 / 5) + 32 + unitObj.imperial
            document.getElementById('max-temp').innerText = (main.temp_max * 9 / 5) + 32 + unitObj.imperial
            convertData.innerText = 'Celsius';
        }
        else {
            document.getElementById('temp').innerText = main.temp + unitObj.metric
            document.getElementById('min-temp').innerText = main.temp_min + unitObj.metric
            document.getElementById('max-temp').innerText = main.temp_max + unitObj.metric
            convertData.innerText = 'Fahrenheit';
        }
    })
}
