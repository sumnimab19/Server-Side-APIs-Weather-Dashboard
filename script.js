var cityName = $("#citySearch");
var searchBtn = $(".searchBtn");
var storedValues = [];
var APIKey = "644e2fd49d4e3e04ae6b482ca8428be6";

searchBtn.on("click", getData);
var lat;
var lon;

getValueFromLocalStorage()

function getData(){  

  // var APIKey = "644e2fd49d4e3e04ae6b482ca8428be6";
  var searchedCity = $("#citySearch").val().trim();
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=" + APIKey;
  var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchedCity + "&appid=" + APIKey;


  $.ajax({
    url: queryURL,
    method: "GET" 
  }).then(function(response) {
    
  // console.log(response);

      latValue = response.coord.lat;
     
      lonValue = response.coord.lon;
      

      var date = response.dt;
      $(".city").html(response.name + "  (" + date + ")");
      $(".city").css("font-weight","Bold");
      var iconNum = response.weather[0].icon;
     
      var iconURL = "http://openweathermap.org/img/wn/" + iconNum + "@2x.png";
      $(".weatherIcon").attr("src",iconURL);
      $('.weatherIcon').width(50); 
      $('.weatherIcon').height(50);
  
      
      $(".wind").text("Wind: " + response.wind.speed + " MPH");
      $(".humidity").text("Humidity: " + response.main.humidity + "%");
      $(".uvindex").text("UV Index: ")
      
      // Convert the temp to fahrenheit
      var tempF = (response.main.temp - 273.15) * 1.80 + 32;
  
      // add temp content to html
      $(".temp").text("Temparature: " + tempF.toFixed(2) + " °F");
  
   
  })
  
  $.ajax({
      url: queryURLForecast,
      method: "GET" 
    }).then(function(response) {
       //console.log(response)
        var iconNum = response.list[0].weather[0].icon;
     
      var forecastURL = "http://openweathermap.org/img/wn/" + iconNum + "@2x.png";
      $(".weatherIconForecast").attr("src",forecastURL);
      $('.weatherIconForecast').width(50); 
      $('.weatherIconForecast').height(50);
      var date = (response.list[0].dt_txt).slice(0,11);
      var formattedDate = moment(date).format("L");
      $(".dateForecast").html(formattedDate)
  
      $(".humidityForecast").text("Humidity: " + response.list[0].main.humidity + "%");
      
      // Convert the temp to fahrenheit
      var tempF = (response.list[0].main.temp - 273.15) * 1.80 + 32;
  
      // add temp content to html
      $(".tempForecast").text("Temp: " + tempF.toFixed(2) + " °F");
  

    })
    getUVIndex();

    
    saveDataToLocalStorage();
    getValueFromLocalStorage();
    cityName.val("");

    
  }

  function getUVIndex(){

    var searchedCity = $("#citySearch").val().trim();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=" + APIKey;


    $.ajax({
      url: queryURL,
      method: "GET" 
    }).then(function(response) {
      
   // console.log(response);

        var latValue = response.coord.lat;
        //console.log(latValue)
      
        var lonValue = response.coord.lon;

   

    // UV Index ajax call
    
    var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + latValue + "&lon=" + lonValue;
      
    $.ajax({
      url: queryURLUV,
      method: "GET" 
    }).then(function(response) {
      
     //console.log(response);

     var uvIndexValue = parseFloat(response.value);
     $(".uvlabel").text("UV Index: ")
      $(".uvindex").text(uvIndexValue)

      
      console.log(uvIndexValue);
      
      if ((uvIndexValue >= 0) && (uvIndexValue <= 2)) {
        $(".uvindex").addClass("lowUV");
      } else if ((uvIndexValue > 2) && (uvIndexValue <= 5)) {
        $(".uvindex").addClass("moderateUV");
      } else if ((uvIndexValue > 5) && (uvIndexValue <= 7)) {
        $(".uvindex").addClass("highUV");
      } else if ((uvIndexValue > 7) && (uvIndexValue <= 10)) {
        $(".uvindex").addClass("veryHighUV");
      } else if (uvIndexValue > 10) {
        $(".uvindex").addClass("extremeUV");
      }
    })
  })
}



