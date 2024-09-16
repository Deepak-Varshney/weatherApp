const API_KEY = '779904df07839b31f4f72518e4737e7f';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';
const searchBox = document.querySelector('#cityName');
const searchBtn = document.querySelector('#searchBtn');
const currentLocationBtn = document.querySelector('#currentLocationBtn');
const spinner = document.querySelector('#spinner');
const weatherInfo = document.querySelector('#weatherInfo');
const weatherIcon = document.querySelector('.weather-icon');
const detailsSection = document.querySelector('#detailsSection');
const noCityFound = document.querySelector('#noCityFound');
const extendedForecast = document.querySelector('#extendedForecast');
const forecastContainer = document.querySelector('#forecastContainer');
const dropdownBtn = document.querySelector('#dropdownBtn');
const dropdownMenu = document.querySelector('#dropdownMenu');
const recentCities = JSON.parse(localStorage.getItem('recentCities')) || [];

function updateDropdownMenu() {
    dropdownMenu.innerHTML = '';
    recentCities.forEach(city => {
        const item = document.createElement('button');
        item.textContent = city;
        item.className = 'w-full text-left px-4 py-2 hover:bg-gray-100';
        item.addEventListener('click', () => {
            fetchWeather(city);
            dropdownMenu.classList.add('hidden');
        });
        dropdownMenu.appendChild(item);
    });
}

dropdownBtn.addEventListener('click', () => {
    dropdownMenu.classList.toggle('hidden');
});

searchBtn.addEventListener('click', () => {
    fetchWeather(searchBox.value);
});

currentLocationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoords(latitude, longitude);
        }, () => {
            alert('Unable to retrieve your location.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

async function fetchWeather(city) {
    if (!city.trim()) {
        alert('Please enter a city name.');
        return;
    }
    // Show the spinner
    spinner.classList.remove('hidden');
    weatherInfo.classList.add('hidden');
    detailsSection.classList.add('hidden');
    extendedForecast.classList.add('hidden');

    try {
        const res = await fetch(`${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await res.json();
        if (data.cod === '404') {
            noCityFound.classList.remove('hidden');
            alert('No city found. Please check the city name and try again.');
        } else {
            noCityFound.classList.add('hidden');
            document.querySelector('.city').innerHTML = data.name;
            document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + ' °C';
            document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';
            document.querySelector('.humidity').innerHTML = data.main.humidity + ' %';
            const weatherCondition = data.weather[0].main;
            weatherIcon.src = `images/${weatherCondition.toLowerCase()}.png` || 'images/default.png';
            // Hide the spinner and show the weather info
            spinner.classList.add('hidden');
            weatherInfo.classList.remove('hidden');
            detailsSection.classList.remove('hidden');
            fetchExtendedForecast(city);
            updateRecentCities(city);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        spinner.classList.add('hidden');
        alert('An error occurred while fetching the weather data.');
    }
}

async function fetchWeatherByCoords(lat, lon) {
    spinner.classList.remove('hidden');
    weatherInfo.classList.add('hidden');
    detailsSection.classList.add('hidden');
    extendedForecast.classList.add('hidden');
    try {
        const res = await fetch(`${BASE_URL}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await res.json();
        if (data.cod === '404') {
            noCityFound.classList.remove('hidden');
            alert('Unable to retrieve weather data for your location.');
        } else {
            noCityFound.classList.add('hidden');
            document.querySelector('.city').innerHTML = data.name;
            document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + ' °C';
            document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';
            document.querySelector('.humidity').innerHTML = data.main.humidity + ' %';
            const weatherCondition = data.weather[0].main;
            weatherIcon.src = `images/${weatherCondition.toLowerCase()}.png` || 'images/default.png';
            spinner.classList.add('hidden');
            weatherInfo.classList.remove('hidden');
            detailsSection.classList.remove('hidden');
            fetchExtendedForecast(data.name);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        spinner.classList.add('hidden');
        alert('An error occurred while fetching the weather data.');
    }
}

async function fetchExtendedForecast(city) {
    try {
        const res = await fetch(`${BASE_URL}forecast?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await res.json();
        forecastContainer.innerHTML = '';
        if (data.cod === '404') {
            extendedForecast.classList.add('hidden');
        } else {
            data.list.forEach((forecast, index) => {
                if (index % 8 === 0) { // Show data for each day (every 8th item in 3-hour intervals)
                    const dayForecast = document.createElement('div');
                    dayForecast.className = 'bg-white shadow-lg rounded-lg p-4 mb-4 w-full md:w-1/5 text-center';
                    dayForecast.innerHTML = `
                        <p class="text-sm text-center font-semibold text-gray-800">${new Date(forecast.dt * 1000).toLocaleDateString()}</p>
                        <img src="images/${forecast.weather[0].main.toLowerCase()}.png" class="w-16 mx-auto">
                        <p class="text-lg text-gray-800">${Math.round(forecast.main.temp)} °C</p>
                        <p class="text-gray-600">Wind: ${forecast.wind.speed} km/h</p>
                        <p class="text-gray-600">Humidity: ${forecast.main.humidity}%</p>
                    `;
                    forecastContainer.appendChild(dayForecast);
                }
            });
            extendedForecast.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error fetching extended forecast:', error);
        alert('An error occurred while fetching the extended forecast.');
    }
}

function updateRecentCities(city) {
    if (!recentCities.includes(city)) {
        recentCities.push(city);
        localStorage.setItem('recentCities', JSON.stringify(recentCities));
        updateDropdownMenu();
    }
}

// Initial Dropdown Menu Update
updateDropdownMenu();
