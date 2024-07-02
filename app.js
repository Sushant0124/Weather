let searchButton = document.querySelector("#search");
searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    let city = document.querySelector("#city").value;
    getWeather(city);
});

async function getWeather(city) {
    const url = `http://api.weatherapi.com/v1/current.json?key=a821c6dc51b24f9a814172649240107&q=${city}&aqi=no`;

    try {
        let response = await axios.get(url);
        let weatherData = response.data;
        console.log(weatherData);

        document.querySelector(".location").innerHTML = weatherData.location.name;
        document.querySelector(".temperature").innerHTML = `${weatherData.current.temp_c}°C`;
        document.querySelector(".condition").innerHTML = weatherData.current.condition.text;
        document.querySelector(".weather-header img").src = weatherData.current.condition.icon;
        document.querySelector(".humidity span").innerHTML = `${weatherData.current.humidity}%`;
        document.querySelector(".wind-speed span").innerHTML = `${weatherData.current.wind_kph} Km/h`;

        // Update extra weather info
        document.getElementById('feels-like').innerText = `${weatherData.current.feelslike_c}°C`;
        document.getElementById('uv-index').innerText = weatherData.current.uv;
        document.getElementById('pressure').innerText = `${weatherData.current.pressure_mb} mb`;
        document.getElementById('visibility').innerText = `${weatherData.current.vis_km} km`;
        document.getElementById('precipitation').innerText = `${weatherData.current.precip_mm} mm`;

        // Update background based on weather condition
        updateBackground(weatherData.current.condition.text.toLowerCase());

    } catch (error) {
        console.log(error);
    }
}

document.getElementById('show-more-link').addEventListener('click', (e) => {
    e.preventDefault();
    const extraInfo = document.getElementById('extra-info');
    if (extraInfo.style.display === 'none' || extraInfo.style.display === '') {
        extraInfo.style.display = 'block';
        document.getElementById('show-more-link').innerText = 'Show Less';
    } else {
        extraInfo.style.display = 'none';
        document.getElementById('show-more-link').innerText = 'Show More';
    }
});

function updateBackground(weatherCondition) {
    if (weatherCondition.includes('sunny') || weatherCondition.includes('clear')) {
        document.body.style.backgroundColor = '#FFD700'; // sunny or clear
    } else if (weatherCondition.includes('rain') || weatherCondition.includes('drizzle')) {
        document.body.style.backgroundColor = '#00BFFF'; // rainy or drizzle
    } else if (weatherCondition.includes('cloud')) {
        document.body.style.backgroundColor = '#D3D3D3'; // cloudy
    } else if (weatherCondition.includes('snow')) {
        document.body.style.backgroundColor = '#ADD8E6'; // snowy
    } else {
        document.body.style.backgroundColor = '#1976d2'; // default
    }
}
