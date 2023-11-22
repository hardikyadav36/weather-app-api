const express = require("express");
const https = require("https");
const bodyParser=require("body-parser");

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    console.log();
    const query = req.body.cityName;
    const appid = "4dd141e78645c2c6292d536c3a4a2210";
    const unit = "metric";
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=e7e8528648c39274e84209bd0b30bd17"+"&units="+unit;
    https.get(url, function(response){
        console.log(response.status) 
    
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDes = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.render("weather",{weatherDes:weatherDes, query: query ,temp:temp,imgURL:imgURL});
        })
    });
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running at port 3000.")
});