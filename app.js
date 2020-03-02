const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");

  });

app.post("/", function(req, res){
  const placeName = req.body.cityName;
  const appid = "5de7292ed1cf4d0682e2354f9d9042fd";
  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+placeName+"&units="+unit+"&appid="+appid;

  https.get(url, function(response){
    console.log(response.statusCode);

      response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temperature = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const iconURL = "http://openweathermap.org/img/wn/"+ weatherData.weather[0].icon + "@2x.png";

        res.write("<h1>The weather is " + weatherDescription +"</h1>");
        res.write("<h2>The temperature in "+ placeName +" is "+ temperature + " degree Celsius</h2>");
        res.write("<img src="+ iconURL + ">");

        res.send();
    });
  });
});

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
