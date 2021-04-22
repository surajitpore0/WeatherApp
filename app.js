const { response } = require("express");
const express = require("express");
const bodyParser = require("body-parser");

const https = require("https");

const app = express();
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

// app.post("/", function (req, res) {
//     console.log("post request if recieved");
// });

app.post("/", function (req, res) {
    // console.log(req.body.cityName);
    const query = req.body.cityName;
    const apiKey = "341e4f96398ae36a782b9f392935f2a7";
    const url =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        query +
        "&appid=" +
        apiKey +
        "&units=metric";
    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            // console.log(data);
            const weatherData = JSON.parse(data);
            // console.log(weatherData);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgUrl =
                "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            // console.log(weatherDescription);
            res.write(
                "<p>The weather is currently " + weatherDescription + "<p>"
            );
            res.write(
                "<h1>The temperature in " +
                    query +
                    " is " +
                    temp +
                    " degrees Calcius.</h1>"
            );
            res.write("<img src=" + imgUrl + ">");
            res.send();
        });
    });
});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
