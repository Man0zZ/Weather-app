let weather = {
  apiKey: "e68b3a723d665c62376a10756b2024a4",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    ) // "&units=metric" changes temperature
      .then((response) => {
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  // Display the weather
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0]; //to get the 1st element of "data.weather" object
    const { temp } = data.main;
    const { speed } = data.wind;

    // change all information
    document.querySelector(".city").innerText = `Weather in ${name}`;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".wind").innerText = `Wind speed: ${speed} km/h`;
    document.querySelector(".weather").classList.remove("loading");
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search__bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", () => {
  weather.search();
});

document.querySelector(".search__bar").addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    weather.search();
  }
});
weather.fetchWeather("kathmandu");
