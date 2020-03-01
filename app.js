const express = require("express");
const https = require("https");
const app = express();

app.get("/", function(req, res){
  const url = "https://api.openweathermap.org/data/2.5/weather?q=Tokyo&units=metric&appid=5de7292ed1cf4d0682e2354f9d9042fd"

  https.get(url, function(response){
    console.log(response.statusCode);

      response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temperature = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const iconURL = "http://openweathermap.org/img/wn/"+ weatherData.weather[0].icon + "@2x.png";

        res.write("<h1>The weather is " + weatherDescription +"</h1>");
        res.write("<h2>The temperature in Tokyo is "+ temperature + " degree Celsius</h2>");
        res.write("<img src="+ iconURL + ">");
        
        res.send();
    });

  });
});

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
