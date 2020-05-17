
$( document ).ready(function() {

  var cityName = $("#citySearch");
  var searchBtn = $(".searchBtn");
  var storedValues = [];
  var APIKey = "644e2fd49d4e3e04ae6b482ca8428be6";

  // Pulling the list of cities from local storage if any
  getValueFromLocalStorage();
  displayDefaultCity();

  // Event listener added to Search Button
  searchBtn.on("click", getData);

  // This function has several ajax calls to pull data from openweathermap api
  function getData(){  
  if(cityName !== null){
    var searchedCity = $("#citySearch").val().trim();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=" + APIKey;

    $.ajax({
      url: queryURL,
      method: "GET" 
    }).then(function(response) {
    
      latValue = response.coord.lat;
      lonValue = response.coord.lon;
      
      // JSON date conversion to readable date format
      var timeStamp = response.dt;
      // Convert timestamp to milliseconds
      var date = new Date(timeStamp*1000);
      // Months array
      var months_arr = ['1','2','3','4','5','6','7','8','9','10','11','12'];
      // Year
      var year = date.getFullYear();
      // Month
      var month = months_arr[date.getMonth()];
      // Day
      var day = date.getDate();
      // Display date time in MM-dd-yyyy h:m:s format
      var convertedDate = month+'/'+day+'/'+year;

      // Display City Name and date in parenthesis
      $(".city").html(response.name + "  (" + convertedDate + ")");
      $(".city").css("font-weight","Bold");
      var iconNum = response.weather[0].icon;
      
      // Dispaly weather icon
      var iconURL = "http://openweathermap.org/img/wn/" + iconNum + "@2x.png";
      $(".weatherIcon").attr("src",iconURL);
      $('.weatherIcon').width(50); 
      $('.weatherIcon').height(50);
      
      // Display wind, humidity
      $(".wind").text("Wind: " + response.wind.speed + " MPH");
      $(".humidity").text("Humidity: " + response.main.humidity + "%");
      //$(".uvindex").text("UV Index: ")
        
      // Convert the temp to fahrenheit
      var tempF = (response.main.temp - 273.15) * 1.80 + 32;
    
      // Display of temparature
      $(".temp").text("Temparature: " + tempF.toFixed(2) + "°F");
    });
  

    // ajax call to get latitute and longitude data
    $.ajax({
      url: queryURL,
      method: "GET" 
    }).then(function(response) {
        latitude = response.coord.lat;
        longitude = response.coord.lon;

        var queryURLForecast = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=hourly&appid=" + APIKey;

        // ajax call to get forecast data based on latitude and longitude
        $.ajax({
            url: queryURLForecast,
            method: "GET" 
          }).then(function(response) {
            // Arrays to hold classes 
            var dateForecastArray = ["dateForecastOne","dateForecastTwo","dateForecastThree","dateForecastFour","dateForecastFive"];
            var weatherIconForecastArray = ["weatherIconForecastOne","weatherIconForecastTwo","weatherIconForecastThree","weatherIconForecastFour","weatherIconForecastFive"];
            var tempForecastArray = ["tempForecastOne","tempForecastTwo","tempForecastThree", "tempForecastFour","tempForecastFive"];
            var humidityForecastArray = ["humidityForecastOne","humidityForecastTwo","humidityForecastThree","humidityForecastFour","humidityForecastFive"];
            
            // For Look gives 5 days data for forecast from the list of 16 days array
            for (var i = 0; i < 5; i++) {   
                var timeStamp = (response.daily[i].dt);
                var date = new Date(timeStamp*1000);
                var months_arr = ['1','2','3','4','5','6','7','8','9','10','11','12'];
                var year = date.getFullYear();
                var month = months_arr[date.getMonth()];
                var day = date.getDate();
                var convertedDate = month+'/'+day+'/'+year;
                $("." + dateForecastArray[i]).text(convertedDate);
        
                var iconNum = response.daily[i].weather[0].icon;
                var forecastURL = "http://openweathermap.org/img/wn/" + iconNum + "@2x.png";
                $("." + weatherIconForecastArray[i]).attr("src",forecastURL);
                $("." + weatherIconForecastArray[i]).width(50); 
                $("." + weatherIconForecastArray[i]).height(50);
        
                var tempF = (response.daily[i].temp.day - 273.15) * 1.80 + 32;
                $("." + tempForecastArray[i]).text("Temp: " + tempF.toFixed(2) + " °F");
        
                $("." + humidityForecastArray[i]).text("Humidity: " + response.daily[i].humidity + "%");  
            }
          })
    })
    
      getUVIndex();  
      addStoredValue();
      getValueFromLocalStorage();
  } 

  // This function gives UV Index and add classes which is then used to format the color of that field based on it's value.
  function getUVIndex(){
    var searchedCity = $("#citySearch").val().trim();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=" + APIKey;

    $.ajax({
      url: queryURL,
      method: "GET" 
    }).then(function(response) {
      
        var latValue = response.coord.lat;      
        var lonValue = response.coord.lon;

      // UV Index ajax call
      var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + latValue + "&lon=" + lonValue;
        
      $.ajax({
        url: queryURLUV,
        method: "GET" 
      }).then(function(response) {
        var uvIndexValue = parseFloat(response.value);
        $(".uvlabel").text("UV Index: ");
        $(".uvindex").text(uvIndexValue);

        // Added classes to change color of UV Index value 
        if ((uvIndexValue >= 1) && (uvIndexValue <= 2)) {
          $(".uvindex").removeClass("moderateUV highUV veryHighUV extremeUV");
          $(".uvindex").addClass("lowUV");
        } else if ((uvIndexValue > 2) && (uvIndexValue <= 5)) {
          $(".uvindex").removeClass("lowUV highUV veryHighUV extremeUV");
          $(".uvindex").addClass("moderateUV");
        } else if ((uvIndexValue > 5) && (uvIndexValue <= 7)) {
          $(".uvindex").removeClass("lowUV moderateUV veryHighUV extremeUV");
          $(".uvindex").addClass("highUV");
        } else if ((uvIndexValue > 7) && (uvIndexValue <= 10)) {
          $(".uvindex").removeClass("lowUV highUV moderateUV extremeUV");
          $(".uvindex").addClass("veryHighUV");
        } else if (uvIndexValue > 10) {
          $(".uvindex").removeClass("lowUV highUV veryHighUV moderateUV");
          $(".uvindex").addClass("extremeUV");
        }
      })
    })
  }
  }

// This function pulls data from local storage
  function getValueFromLocalStorage(){
    var getData = JSON.parse(localStorage.getItem("cities"));
    if (getData !== null) {
      storedValues = getData;
    }
      renderCity();
  }

  function addStoredValue (){
    var storedCities = cityName.val().toUpperCase().trim();
    if (storedCities === ""){
      return;
    }
    storedValues.push(storedCities); 
    cityName.val("");
    storeValuesToLocalStorage();
  } 

// This function saves cities to the local storage
  function storeValuesToLocalStorage(){
    localStorage.setItem("cities", JSON.stringify(storedValues));
  }

  // This function renders city data to the page
  function renderCity(){
    $(".cityList").html('');
    for (var i = 0; i < storedValues.length; i++) {
      var newList = storedValues[i];
      var liEl = $("<li>");
      liEl.addClass("list-group-item eachCity");
      liEl.text(newList); 
      liEl.appendTo(".cityList");  
    } 
    clickList();
  }

// -------------------***********************---------------------***********************-----------------

function clickList(){
// Added event listener to li elements (City List that are saved in Local Storage from above)
  var cityClicked = $(".eachCity");
  cityClicked.css('cursor', 'pointer'); 
  
  cityClicked.on("click", function(event){
    event.preventDefault()
    // Grabbing and storing the clicked city value from the list of cities
    var clickedCity = $(this).text();
        
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + clickedCity + "&appid=" + APIKey;

    $.ajax({
      url: queryURL,
      method: "GET" 
    }).then(function(response) {
      latValue = response.coord.lat;
      lonValue = response.coord.lon;
          
      var timeStamp = response.dt;
      // Convert timestamp to milliseconds
      var date = new Date(timeStamp*1000);
      
      // Months array
      var months_arr = ['1','2','3','4','5','6','7','8','9','10','11','12'];
      // Year
      var year = date.getFullYear();
      // Month
      var month = months_arr[date.getMonth()];
      // Day
      var day = date.getDate();
      // Display date time in MM-dd-yyyy h:m:s format
      var convertedDate = month+'/'+day+'/'+year;

      $(".city").html(response.name + "  (" + convertedDate + ")");
      $(".city").css("font-weight","Bold");
      var iconNum = response.weather[0].icon;
        
      var iconURL = "http://openweathermap.org/img/wn/" + iconNum + "@2x.png";
      $(".weatherIcon").attr("src",iconURL);
      $('.weatherIcon').width(50); 
      $('.weatherIcon').height(50);
      
      $(".wind").text("Wind: " + response.wind.speed + " MPH");
      $(".humidity").text("Humidity: " + response.main.humidity + "%");
      $(".uvindex").text("UV Index: ");
          
      // Convert the temp to fahrenheit
      var tempF = (response.main.temp - 273.15) * 1.80 + 32;
      $(".temp").text("Temparature: " + tempF.toFixed(2) + "°F");
    });
  

    $.ajax({
      url: queryURL,
      method: "GET" 
    }).then(function(response) {
      latitude = response.coord.lat;
      longitude = response.coord.lon;

      var queryURLForecast = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=hourly&appid=" + APIKey;

      $.ajax({
        url: queryURLForecast,
        method: "GET" 
      }).then(function(response) {
        var dateForecastArray = ["dateForecastOne","dateForecastTwo","dateForecastThree","dateForecastFour","dateForecastFive"];
        var weatherIconForecastArray = ["weatherIconForecastOne","weatherIconForecastTwo","weatherIconForecastThree","weatherIconForecastFour","weatherIconForecastFive"];
        var tempForecastArray = ["tempForecastOne","tempForecastTwo","tempForecastThree", "tempForecastFour","tempForecastFive"];
        var humidityForecastArray = ["humidityForecastOne","humidityForecastTwo","humidityForecastThree","humidityForecastFour","humidityForecastFive"];
            
        for (var i = 0; i < 5; i++) {  
          var timeStamp = (response.daily[i].dt);
          var date = new Date(timeStamp*1000);
          var months_arr = ['1','2','3','4','5','6','7','8','9','10','11','12'];
          var year = date.getFullYear();
          var month = months_arr[date.getMonth()];
          var day = date.getDate();
          var convertedDate = month+'/'+day+'/'+year;
          $("." + dateForecastArray[i]).text(convertedDate);
          
          var iconNum = response.daily[i].weather[0].icon;
          var forecastURL = "http://openweathermap.org/img/wn/" + iconNum + "@2x.png";
          $("." + weatherIconForecastArray[i]).attr("src",forecastURL);
          $("." + weatherIconForecastArray[i]).width(50); 
          $("." + weatherIconForecastArray[i]).height(50);
          
          var tempF = (response.daily[i].temp.day - 273.15) * 1.80 + 32;
          $("." + tempForecastArray[i]).text("Temp: " + tempF.toFixed(2) + " °F");
          
          $("." + humidityForecastArray[i]).text("Humidity: " + response.daily[i].humidity + "%");  
        }
      })
    })
    
    getUVIndex();  

    function getUVIndex(){
      var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + clickedCity + "&appid=" + APIKey;

      $.ajax({
        url: queryURL,
        method: "GET" 
      }).then(function(response) {
          var latValue = response.coord.lat;      
          var lonValue = response.coord.lon;

          // UV Index ajax call
          var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + latValue + "&lon=" + lonValue;
            
          $.ajax({
            url: queryURLUV,
            method: "GET" 
          }).then(function(response) {
            var uvIndexValue = parseFloat(response.value);
            $(".uvlabel").text("UV Index: ")
            $(".uvindex").text(uvIndexValue)
            if ((uvIndexValue >= 1) && (uvIndexValue <= 2)) {
              $(".uvindex").removeClass("moderateUV highUV veryHighUV extremeUV");
              $(".uvindex").addClass("lowUV");
            } else if ((uvIndexValue > 2) && (uvIndexValue <= 5)) {
              $(".uvindex").removeClass("lowUV highUV veryHighUV extremeUV");
              $(".uvindex").addClass("moderateUV");
            } else if ((uvIndexValue > 5) && (uvIndexValue <= 7)) {
              $(".uvindex").removeClass("lowUV moderateUV veryHighUV extremeUV");
              $(".uvindex").addClass("highUV");
            } else if ((uvIndexValue > 7) && (uvIndexValue <= 10)) {
              $(".uvindex").removeClass("lowUV highUV moderateUV extremeUV");
              $(".uvindex").addClass("veryHighUV");
            } else if (uvIndexValue > 10) {
              $(".uvindex").removeClass("lowUV highUV veryHighUV moderateUV");
              $(".uvindex").addClass("extremeUV");
            }
          });
      });
    }  
  });
}
// ***********************************************************************
// Default City Display
function displayDefaultCity(){ 
  var queryURL; 
  var defaultCity = ["tucson"];
  var latitude;
  var longitude;
  console.log(storedValues)
  if(storedValues.length === 0){
    queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + defaultCity + "&appid=" + APIKey;
  } else {
    var lastCitySearched = storedValues[storedValues.length - 1];
    queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + lastCitySearched + "&appid=" + APIKey;
  }
  $.ajax({
    url: queryURL,
    method: "GET" 
  }).then(function(response) {  
    console.log(response)
    latitude = response.coord.lat;
    longitude = response.coord.lon;


    var timeStamp = response.dt;
    // Convert timestamp to milliseconds
    var date = new Date(timeStamp*1000);
    
    // Months array
    var months_arr = ['1','2','3','4','5','6','7','8','9','10','11','12'];
    // Year
    var year = date.getFullYear();
    // Month
    var month = months_arr[date.getMonth()];
    // Day
    var day = date.getDate();
    // Display date time in MM-dd-yyyy h:m:s format
    var convertedDate = month+'/'+day+'/'+year;

    $(".city").html(response.name + "  (" + convertedDate + ")");
    $(".city").css("font-weight","Bold");
    var iconNum = response.weather[0].icon;
      
    var iconURL = "http://openweathermap.org/img/wn/" + iconNum + "@2x.png";
    $(".weatherIcon").attr("src",iconURL);
    $('.weatherIcon').width(50); 
    $('.weatherIcon').height(50);
    
    $(".wind").text("Wind: " + response.wind.speed + " MPH");
    $(".humidity").text("Humidity: " + response.main.humidity + "%");
    $(".uvindex").text("UV Index: ");
        
    // Convert the temp to fahrenheit
    var tempF = (response.main.temp - 273.15) * 1.80 + 32;
    $(".temp").text("Temparature: " + tempF.toFixed(2) + "°F");

    if(storedValues.length === 0){
      defaultLatitude = 32.253;
      defaultLongitude = -110.911;
      var queryURLForecast = "https://api.openweathermap.org/data/2.5/onecall?lat=" + defaultLatitude + "&lon=" + defaultLongitude + "&exclude=hourly&appid=" + APIKey;
    } else {
      var queryURLForecast = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=hourly&appid=" + APIKey;
    }

    $.ajax({
      url: queryURLForecast,
      method: "GET" 
    }).then(function(response) {
      var dateForecastArray = ["dateForecastOne","dateForecastTwo","dateForecastThree","dateForecastFour","dateForecastFive"];
      var weatherIconForecastArray = ["weatherIconForecastOne","weatherIconForecastTwo","weatherIconForecastThree","weatherIconForecastFour","weatherIconForecastFive"];
      var tempForecastArray = ["tempForecastOne","tempForecastTwo","tempForecastThree", "tempForecastFour","tempForecastFive"];
      var humidityForecastArray = ["humidityForecastOne","humidityForecastTwo","humidityForecastThree","humidityForecastFour","humidityForecastFive"];
          
      for (var i = 0; i < 5; i++) {  
        var timeStamp = (response.daily[i].dt);
        var date = new Date(timeStamp*1000);
        var months_arr = ['1','2','3','4','5','6','7','8','9','10','11','12'];
        var year = date.getFullYear();
        var month = months_arr[date.getMonth()];
        var day = date.getDate();
        var convertedDate = month+'/'+day+'/'+year;
        $("." + dateForecastArray[i]).text(convertedDate);
        
        var iconNum = response.daily[i].weather[0].icon;
        var forecastURL = "http://openweathermap.org/img/wn/" + iconNum + "@2x.png";
        $("." + weatherIconForecastArray[i]).attr("src",forecastURL);
        $("." + weatherIconForecastArray[i]).width(50); 
        $("." + weatherIconForecastArray[i]).height(50);
        
        var tempF = (response.daily[i].temp.day - 273.15) * 1.80 + 32;
        $("." + tempForecastArray[i]).text("Temp: " + tempF.toFixed(2) + " °F");
        
        $("." + humidityForecastArray[i]).text("Humidity: " + response.daily[i].humidity + "%");  
      }
    })
  })
  
  getUVIndex();  

  function getUVIndex(){
    var queryURL; 
    var defaultCity = ["tucson"];
    var latitude;
    var longitude;
    if(storedValues.length === 0){
      latitude = 32.253;
      longitude = -110.911;
      queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + defaultCity + "&appid=" + APIKey;
    } else {
      var lastCitySearched = storedValues[storedValues.length - 1];
      queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + lastCitySearched + "&appid=" + APIKey;
    }

      $.ajax({
        url: queryURL,
        method: "GET" 
      }).then(function(response) {
          var latValue = response.coord.lat;      
          var lonValue = response.coord.lon;

        // UV Index ajax call
        if (storedValues === null){
          latValue = 32.253;
          lonValue = -110.911;
          var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + latValue + "&lon=" + lonValue;
        } else{
          var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + latValue + "&lon=" + lonValue;
        }
          
        $.ajax({
          url: queryURLUV,
          method: "GET" 
        }).then(function(response) {
          var uvIndexValue = parseFloat(response.value);
          $(".uvlabel").text("UV Index: ")
          $(".uvindex").text(uvIndexValue)
          if ((uvIndexValue >= 1) && (uvIndexValue <= 2)) {
            $(".uvindex").removeClass("moderateUV highUV veryHighUV extremeUV");
            $(".uvindex").addClass("lowUV");
          } else if ((uvIndexValue > 2) && (uvIndexValue <= 5)) {
            $(".uvindex").removeClass("lowUV highUV veryHighUV extremeUV");
            $(".uvindex").addClass("moderateUV");
          } else if ((uvIndexValue > 5) && (uvIndexValue <= 7)) {
            $(".uvindex").removeClass("lowUV moderateUV veryHighUV extremeUV");
            $(".uvindex").addClass("highUV");
          } else if ((uvIndexValue > 7) && (uvIndexValue <= 10)) {
            $(".uvindex").removeClass("lowUV highUV moderateUV extremeUV");
            $(".uvindex").addClass("veryHighUV");
          } else if (uvIndexValue > 10) {
            $(".uvindex").removeClass("lowUV highUV veryHighUV moderateUV");
            $(".uvindex").addClass("extremeUV");
          }
        });
      });
  }
  }
});


function reloadPage() {
  location.reload(true);
}