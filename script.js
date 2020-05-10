
var cityName = $("#citySearch");
var searchBtn = $(".searchBtn");
var storedValues = [];
var APIKey = "644e2fd49d4e3e04ae6b482ca8428be6";

searchBtn.on("click", getData);


getValueFromLocalStorage()

function getData(){  
  if(cityName !== null){

    var latitude = 32.22
    var longitude = -110.93

  var searchedCity = $("#citySearch").val().trim();
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=" + APIKey;
  var queryURLForecast = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=hourly&appid=" + APIKey;

  $.ajax({
    url: queryURL,
    method: "GET" 
  }).then(function(response) {
    
  console.log(response);

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
      $(".uvindex").text("UV Index: ")
      
      // Convert the temp to fahrenheit
      var tempF = (response.main.temp - 273.15) * 1.80 + 32;
  
      // add temp content to html
      $(".temp").text("Temparature: " + tempF.toFixed(2) + "°F");
  })
  

  
  $.ajax({
      url: queryURLForecast,
      method: "GET" 
    }).then(function(response) {
      console.log(response)
      var divRow = $(".forecastRow");

      var dayArray = ["dayOne","dayTwo","dayThree","dayFour","dayFive"];
      var dateForecastArray = ["dateForecastOne","dateForecastTwo","dateForecastThree","dateForecastFour","dateForecastFive"];
      var weatherIconForecastArray = ["weatherIconForecastOne","weatherIconForecastTwo","weatherIconForecastThree","weatherIconForecastFour","weatherIconForecastFive"];
      var tempForecastArray = ["tempForecastOne","tempForecastTwo","tempForecastThree", "tempForecastFour","tempForecastFive"];
      var humidityForecastArray = ["humidityForecastOne","humidityForecastTwo","humidityForecastThree","humidityForecastFour","humidityForecastFive"];
    

     
      if ($('.dateForecastOne').length > 0){
        return; 
      } else {
        for (var i = 0; i < 5; i++) {

          var forecastArticle = $("<article>");
          forecastArticle.addClass("col-2 forecastDays");
          divRow.append(forecastArticle);
  
          var eachDayDiv = $("<div>");
          eachDayDiv.addClass(dayArray[i]);
          forecastArticle.append(eachDayDiv);
  
          var dateForecast = $("<h5>");
          dateForecast.addClass(dateForecastArray[i]);
          eachDayDiv.append(dateForecast);
  
          var timeStamp = (response.daily[i].dt);
          var date = new Date(timeStamp*1000);
          var months_arr = ['1','2','3','4','5','6','7','8','9','10','11','12'];
          var year = date.getFullYear();
          var month = months_arr[date.getMonth()];
          var day = date.getDate();
          var convertedDate = month+'/'+day+'/'+year;
          $("." + dateForecastArray[i]).text(convertedDate);
  
          var weatherIconForecast = $("<img>");
          weatherIconForecast.addClass(weatherIconForecastArray[i]);
          eachDayDiv.append(weatherIconForecast);
  
          var iconNum = response.daily[i].weather[0].icon;
          var forecastURL = "http://openweathermap.org/img/wn/" + iconNum + "@2x.png";
          $("." + weatherIconForecastArray[i]).attr("src",forecastURL);
          $("." + weatherIconForecastArray[i]).width(50); 
          $("." + weatherIconForecastArray[i]).height(50);
  
          var tempForecast = $("<p>");
          tempForecast.addClass(tempForecastArray[i]);
          eachDayDiv.append(tempForecast);
  
          var tempF = (response.daily[i].temp.day - 273.15) * 1.80 + 32;
          $("." + tempForecastArray[i]).text("Temp: " + tempF.toFixed(2) + " °F");
  
          var humidityForecast = $("<p>");
          humidityForecast.addClass(humidityForecastArray[i]);
          eachDayDiv.append(humidityForecast);
   
          $("." + humidityForecastArray[i]).text("Humidity: " + response.daily[i].humidity + "%");  
        }
      }
      
    })
    
    getUVIndex();

    
   // storeValuesToLocalStorage();
   // addStoredValue();
   // getValueFromLocalStorage();
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

      
      //console.log(uvIndexValue);
      
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
}

// ----------------------------------------------------------------------//


// This function pulls data from local storage
function getValueFromLocalStorage(){
  var getData = JSON.parse(localStorage.getItem("cities"));

  if (getData !== null) {
    storedValues = getData;
    var liEl = $("<li>");
    liEl.addClass("list-group-item eachCity");
    liEl.text(getData);
    liEl.appendTo(".cityList");        
  }
}

// This function saves initial and score values to the local storage
function storeValuesToLocalStorage(){
    localStorage.setItem("cities", JSON.stringify(storedValues));
}


// This function gets the data from local storage
// function getValueFromLocalStorage(){
//   var getData = JSON.parse(localStorage.getItem("cities"));
//   if (getData !== null) {
//       storedValues = getData;
//       console.log(storedValues)
//   }
// }


// This function stores user input initial value and score to the local storage
function addStoredValue (){
    var storedCities = {
    city: cityName.val().toUpperCase(),
    };
    storedValues.push(storedCities); 
    storeValuesToLocalStorage();
} 






// // This function saves input data to localstorage
// function saveDataToLocalStorage(){
      
//           var inputCity = cityName.val().toUpperCase();
//          // console.log(inputCity)
//           localStorage.setItem("cities", JSON.stringify(inputCity));
//       }
  




//  citySelect() 
// function citySelect(){
//   var cityClicked = $(".eachCity");
//   cityClicked.on("click", getData);
// }

//------------------****************************--------------------------*****************--------------------

/* Working and commited Code as of 5/8/20 
var cityName = $("#citySearch");
var searchBtn = $(".searchBtn");
var storedValues = [];
var APIKey = "644e2fd49d4e3e04ae6b482ca8428be6";

searchBtn.on("click", getData);
// var lat;
// var lon;

getValueFromLocalStorage()

function getData(){  
  if(cityName !== null){

    var latitude = 32.22
    var longitude = -110.93

  // var APIKey = "644e2fd49d4e3e04ae6b482ca8428be6";
  var searchedCity = $("#citySearch").val().trim();
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=" + APIKey;
  //var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchedCity + "&appid=" + APIKey;
  var queryURLForecast = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=hourly&appid=" + APIKey;


  $.ajax({
    url: queryURL,
    method: "GET" 
  }).then(function(response) {
    
  console.log(response);

      latValue = response.coord.lat;
     
      lonValue = response.coord.lon;
      

      var timeStamp = response.dt;

     // JSON timestamp
   console.log(timeStamp)
    
   
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
       console.log(response)
        //var iconNum = response.list[0].weather[0].icon;
        var iconNum = response.daily[0].weather[0].icon;
     
      var forecastURL = "http://openweathermap.org/img/wn/" + iconNum + "@2x.png";
      $(".weatherIconForecast").attr("src",forecastURL);
      $('.weatherIconForecast').width(50); 
      $('.weatherIconForecast').height(50);

      //var date = (response.list[0].dt_txt).slice(0,11);
      var timeStamp = (response.daily[0].dt);

      // Convert timestamp to milliseconds
   var date = new Date(timeStamp*1000);
  
    //Months array
var months_arr = ['1','2','3','4','5','6','7','8','9','10','11','12'];
//Year
  var year = date.getFullYear();
 
 // Month
  var month = months_arr[date.getMonth()];
 
 // Day
 var day = date.getDate();

 
 // Display date time in MM-dd-yyyy h:m:s format
 var convertedDate = month+'/'+day+'/'+year;


 console.log(convertedDate);

      //var formattedDate = moment(date).format("L");
      $(".dateForecast").text(convertedDate)
      
  
      $(".humidityForecast").text("Humidity: " + response.daily[0].humidity + "%");
      
      // Convert the temp to fahrenheit
      var tempF = (response.daily[0].temp.day - 273.15) * 1.80 + 32;
  
      // add temp content to html
      $(".tempForecast").text("Temp: " + tempF.toFixed(2) + " °F");
  

    })
    
    getUVIndex();

    
   // storeValuesToLocalStorage();
   // addStoredValue();
   // getValueFromLocalStorage();
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

      
      //console.log(uvIndexValue);
      
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
}

// ----------------------------------------------------------------------//


// This function pulls data from local storage
function getValueFromLocalStorage(){
  var getData = JSON.parse(localStorage.getItem("cities"));

  if (getData !== null) {
    storedValues = getData;
    var liEl = $("<li>");
    liEl.addClass("list-group-item eachCity");
    liEl.text(getData);
    liEl.appendTo(".cityList");        
  }
}

// This function saves initial and score values to the local storage
function storeValuesToLocalStorage(){
    localStorage.setItem("cities", JSON.stringify(storedValues));
}


// This function gets the data from local storage
// function getValueFromLocalStorage(){
//   var getData = JSON.parse(localStorage.getItem("cities"));
//   if (getData !== null) {
//       storedValues = getData;
//       console.log(storedValues)
//   }
// }


// This function stores user input initial value and score to the local storage
function addStoredValue (){
    var storedCities = {
    city: cityName.val().toUpperCase(),
    };
    storedValues.push(storedCities); 
    storeValuesToLocalStorage();
} 






// // This function saves input data to localstorage
// function saveDataToLocalStorage(){
      
//           var inputCity = cityName.val().toUpperCase();
//          // console.log(inputCity)
//           localStorage.setItem("cities", JSON.stringify(inputCity));
//       }
  




//  citySelect() 
// function citySelect(){
//   var cityClicked = $(".eachCity");
//   cityClicked.on("click", getData);
// }



*/