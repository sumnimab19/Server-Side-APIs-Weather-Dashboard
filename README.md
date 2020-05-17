# Server-Side-APIs-Weather-Dashboard

This is a Weather Dashboard application that uses third-party API and will run in the browser and features dynamically updated HTML and CSS powered by the jQuery. 


## Description

This application uses the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities. This helps users see the weather outlook for multiple cities so that they can plan a trip accordingly. It uses `localStorage` to store weather data for the cities user has searched. It uses several AJAX calls to get the JSON data for the city, from openweathermap API, that was searched and it displays the weather data on the page. By Default, it displays 'Tucson' weather if local storage is empty else, it displays the last searched city's weather. 



## Use Cases

AS A traveler

USERS WANT to see the weather outlook for multiple cities
SO THAT they can plan a trip accordingly

GIVEN a weather dashboard with form inputs
WHEN USERS search for a city
THEN USERS are presented with current and future conditions for that city and that city is added to the search history
WHEN USERS view current weather conditions for that city
THEN USERS are presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN USERS view the UV index
THEN USERS are presented with a color that indicates whether the conditions are favorable, moderate, or severe. UV Index color code:

<img width="425" alt="Screen Shot 2020-05-16 at 10 25 43 PM" src="https://user-images.githubusercontent.com/55207625/82136690-141cba80-97c5-11ea-9536-fd797be84c3d.png">

WHEN USERS view future weather conditions for that city
THEN USERS are presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN USERS click on a city in the search history
THEN USERS are again presented with current and future conditions for that city
WHEN USERS open the weather dashboard
THEN USERS are presented with the last searched city forecast


## Technology Used
1. Semantic HTML5
2. jQuery DOM
3. CSS
4. Bootstrap
5. Font Awesome
7. Openweathermap API


## Screenshot Large Screen

<img width="1251" alt="Screen Shot 2020-05-16 at 10 33 36 PM" src="https://user-images.githubusercontent.com/55207625/82136766-c81e4580-97c5-11ea-844a-b83711ea50cc.png">


## Screenshot Small Screen

<img width="289" alt="Screen Shot 2020-05-16 at 10 36 51 PM" src="https://user-images.githubusercontent.com/55207625/82136782-f13ed600-97c5-11ea-9a0a-a2650887883c.png">



## Link to the page