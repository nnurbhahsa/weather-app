"use strict"


const apiKey = "&appid=205875b36b302ba6550cd7fb6668491b";
const currentData = "https://api.openweathermap.org/data/2.5/weather?zip=";
const forecastData = "https://api.openweathermap.org/data/2.5/forecast?zip=";


function getCurrentData(zipCode) {
   fetch(currentData + zipCode + apiKey + "&units=imperial")
    .then(res => {
      if (res.status === 404) {
        alert(zipCode + " is not valid. Please enter a valid zip code.");
      } else {
        return res.json();
      }
    })
    .then(currentTemp => {
      $("#display").html(`

          <h2 class="current-header">CURRENT WEATHER</h2>

          <div id='current'>
            <img src="https://openweathermap.org/img/wn/${currentTemp.weather[0].icon}@2x.png">
            <p id=''>${currentTemp.main.temp}°F</p>
            <p class='weather-text'>${currentTemp.weather[0].main}</p>
          </div>
        
          <h2 class="forecast-header">FORECAST</h2>
          <div id='forecast'>
          </div>
      `);
    })
    .catch(err => console.log(err));
}


function getForecastData(zipCode) {
  fetch(forecastData + zipCode + apiKey + "&units=imperial")
    .then(res => res.json())
    .then(forecastTemp => {
      // if (forecastTemp.val() != )
      console.log(forecastTemp);
      forecastTemp.list.map(item => {
        let hour = moment(item.dt_txt).hour();
        let day = moment(item.dt_txt).format("dddd");
        if (hour === 12) {
          $("#forecast").append(`

              <div class='forecast-wrap'>
                <p class='forecast-date'>${day}</p>
                <p class='forecast-temp'>${item.main.temp}°F</p>
                <p class='weather-text'>${item.weather[0].main}</p>
              </div>
          `);
        }
      })
    });
}


function watchForm() {
  $("#js-submit").submit(e => {
    e.preventDefault();
    let zipCode = $("#js-zip-code").val();
    getCurrentData(zipCode);
    getForecastData(zipCode);
  });
}

$(watchForm);