


    // Assigning API to a variable
const APIKey = "60ef3c4518e0e68a1fa6d3fe3b63b79f";

const searchButton = document.querySelector(".btn");
const searchEl = document.querySelector(".form-control");
const cityInfo = document.querySelector(".city-info");
const fiveDay = document.querySelector(".five-day");
const recentSearch = document.querySelector(".recent-search");

const handleSearch = (event) => {
    event.preventDefault();
    let searchInput = searchEl.value.trim();
    let weatherURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=1&appid=60ef3c4518e0e68a1fa6d3fe3b63b79f`;
    fetch(weatherURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        displayCurrentDate(data);
        displayForecast(event);
    });

    let addButton = document.createElement('button');
    addButton.textContent = searchInput;
    addButton.type="button";
    addButton.classList = "btn btn-secondary col-12 mt-3";
    recentSearch.appendChild(addButton);
};

const displayCurrentDate = (data) => {
    let latitude = data[0].lat;
    let longitude = data[0].lon;
    let currentWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=d086e75f514956ab3667a4cbe1da992e&units=imperial`;
    fetch(currentWeather)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        const date = new Date();
        let todaysDate = date.toLocaleDateString();
        cityInfo.innerHTML = `
        <h2>${data.name} (${todaysDate}) <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png"><h2>
        <h5>Temp: ${data.main.temp}Degrees</h5>
        <h5>Wind: ${data.wind.speed} Winds MPH</h5>
            <h5>Humidity: ${data.main.humidity} Humidity</h5>`;
  });
  };

  const displayForecast = (event) => {
    event.preventDefault();
    let searchInput = searchEl.value.trim();
    let fiveDayForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&appid=d086e75f514956ab3667a4cbe1da992e&units=imperial`;
    console.log(fiveDayForecast)
    fetch(fiveDayForecast)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        let count = 0;
        let template = "";

        data.list.forEach(function (list) {
            if ((list.dt_txt.split(" ")[1] == "12:00:00" && count < 6)) {
                count++;
                template += `
                <div class="card col-4 bg-primary mx-4">
                <div class="card-body">
                <h5>${list.dt_txt}</h5>
                <h5><img src="http://openweathermap.org/img/w/${list.weather[0].icon}.png"><h5>
                <h5>${list.main.temp} Degrees</h5>
                <h5>${list.wind.speed} Winds MPH</h5>
                <h5>${list.main.humidity} Humidity</h5>
                </div>
                </div>`;
                fiveDay.innerHTML = template;
            }
        });
    });
  };
  
  const storeData = (lastSearchData) => {
    localStorage.setItem('recent', JSON.stringify(lastSearchData))
  }

  searchButton.addEventListener("click", handleSearch);
