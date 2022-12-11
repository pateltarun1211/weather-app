const API_key = "bbfb40a066a3a2adc998f7cf3e1d2eaa";

const form = document.querySelector('#weatherForm')

const DOM_Elements = {
    weather_lists: '.weather-lists'
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    let city_name = document.querySelector('#city_name')
    let zip_code = document.querySelector('#zip_code')
})

const getData = async (city_name, zip_code) => {
    if (city_name) {
        let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}&units=imperial`)
        console.log(response.data)
        return response.data
    } else if (zip_code) {
        let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zip_code}&appid=${API_key}&units=imperial`)
        console.log(response.data)
        return response.data
    }
}
const loadData = async() => {
    clearData()
    const weather = await getData(city_name.value, zip_code.value)
    createList(weather)
    }

const createList = (weather) => {
    const html = `<div class="card" id="${weather.id}">
        <ul class="weather-results">
            <li class="weather-results-item"><h1>${weather.name} || ${weather.main.temp}°F</h1></li>
            <li class="weather-results-item">Forecast: ${weather.weather[0].main}   <img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png"</img></li>
            <li class="weather-results-item">Feels Like: ${weather.main.feels_like}  ||  High: ${weather.main.temp_max}  ||  Low: ${weather.main.temp_min}</li>
            <li class="weather-results-item">Pressure: ${weather.main.pressure}hPa  ||  Humidity: ${weather.main.humidity}%  ||  Wind: ${weather.wind.speed}mph</li>
        </ul>
    </div>`
    document.querySelector(DOM_Elements.weather_lists).insertAdjacentHTML('beforeend', html)
}




const clearData = () => {
    document.querySelector(DOM_Elements.weather_lists).innerHTML='';
}
