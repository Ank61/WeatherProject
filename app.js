const express=require("express");
const https = require("https"); //native node to access api request
const bodyParser=require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , function(req,res){
res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req,res){
    const query = req.body.cityname;
    const apiKey = "c7d4f68850e9bae082c5b83661834f46"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query+"&appid="+apiKey;
    https.get(url , function (response){
      console.log(response.statusCode);
      response.on ("data", function(data){
        const weatherdata = JSON.parse(data);
        const open = weatherdata.main.temp;
        const des = weatherdata.weather[0].description;
        const icon = weatherdata.weather[0].icon;
        const image = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";

        res.write("<h1>The temp in"+query +"is " + open  +" is </h1>");
        res.write("<img src=" + image+ ">")
      })
    })

  })









app.listen(3000, function(){
  console.log("Server is running");
})
