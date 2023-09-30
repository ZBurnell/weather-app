var APIKey = "5f12b4a68b9d0570bd24a3ed28d567eb";
var city = "";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
var now = dayjs()


fetch(queryURL)

var selectedcity = UserActivation
