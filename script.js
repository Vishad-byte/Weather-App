const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');

const weatherInfoSection = document.querySelector('.weather-info');
const notFoundSection = document.querySelector('.not-found');
const searchCitySection = document.querySelector('.search-city');

const apiKey = '59845ee249e6d66d54e37461778c1823';


searchBtn.addEventListener('click', () => {
    if(cityInput.value.trim() != '') {
        updateWeatherInfo(cityInput.value);
        cityInput.value = '';
        cityInput.blur();
    }
    
})
cityInput.addEventListener('keydown', (event) => {
    if(cityInput.value.trim() != '' && event.key == 'Enter'){
        updateWeatherInfo(cityInput.value);
        cityInput.value = '';
        cityInput.blur();  
    }
})

async function getFetchData(endPoint, city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiUrl);
    return response.json();
}

async function updateWeatherInfo(city) {
    try {
        const weatherData = await getFetchData('weather', city);
    if(weatherData.cod != 200){
        showDisplaySection(notFoundSection);
        return;
    }
    showDisplaySection(weatherInfoSection);
    } catch (error) {
        console.error("Error fetching the data from the API: ", error);
        showDisplaySection(notFoundSection);
    }
}

function showDisplaySection(section) {
    [weatherInfoSection, searchCitySection, notFoundSection]
        .forEach(section => section.style.display = 'none')
    section.style.display ='flex'
}
