var searchHistory = [];
var lastCity = "";
var apiKey = "5f12b4a68b9d0570bd24a3ed28d567eb";


var getCityWeather = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";

    fetch(apiUrl)
         .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    displayWeather(data);
                });
            }
        })  
};

//Search bar
var searchSubmitHandler = function(event) {
    event.preventDefault();

    var cityName = $("#cityname").val().trim();

    if(cityName) {
        getCityWeather(cityName);
        $("#cityname").val("");
        
    } else {
        alert("Please enter a valid city");
    }
};

//Current Weather display
var displayWeather = function(weatherData) {

    $("#current-name").text(weatherData.name + " " + dayjs(weatherData.dt * 1000).format("MM/DD/YYYY") ).append(`<img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png"></img>`);
    $("#current-temp").text("Temperature: " + weatherData.main.temp.toFixed(1) + "°F");
    $("#current-humid").text("Humidity: " + weatherData.main.humidity + "%");
    $("#current-wind").text("Wind Speed: " + weatherData.wind.speed.toFixed(1) + " mph");
    

    lastCity = weatherData.name;

    saveSearchHistory(weatherData.name);
    
};

//Save search history to local storage
var saveSearchHistory = function (city) {
    if(!searchHistory.includes(city)){
        searchHistory.push(city);
        $("#search-history").append("<a href='#' class='list-group-item list-group-item-action' id='" + city + "'>" + city + "</a>")
    } 

    localStorage.setItem("weatherSearchHistory", JSON.stringify(searchHistory));

    localStorage.setItem("lastCity", JSON.stringify(lastCity));

    loadSearchHistory();
};

//Load search history from local storage
var loadSearchHistory = function() {
    searchHistory = JSON.parse(localStorage.getItem("weatherSearchHistory"));
    lastCity = JSON.parse(localStorage.getItem("lastCity"));
  
    if (!searchHistory) {
        searchHistory = []
    }
    if (!lastCity) {
        lastCity = ""
    }

    $("#search-history").empty();

    for(i = 0 ; i < searchHistory.length ;i++) {

       $("#search-history").append("<a href='#' class='list-group-item list-group-item-action' id='" + searchHistory[i] + "'>" + searchHistory[i] + "</a>");
    }
  };

loadSearchHistory();

//Event handlers
$("#search-form").submit(searchSubmitHandler);
$("#search-history").on("click", function(event){
    var prevCity = $(event.target).closest("a").attr("id");
    getCityWeather(prevCity);
});
