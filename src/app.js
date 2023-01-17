
const bodyParser = require("body-parser");
const { render } = require("ejs");
const express = require("express")
var requests= require("requests");
var request= require("request");
const app = express()
const PORT =process.env.PORT || 4000
const apikey = "2633fa48f537ad55f4b39af6e402c84e";
app.use(express.urlencoded({extended:false}))
app.set('view engine','ejs')

app.use(express.static('public'))
app.get('/',(req,res)=>{
  res.render('index',{weather:null,error:null,title:"City",count:"Country",tempmin:"min temp",tempmax:"max temp",tempstatus: null})
})


app.post('/',(req,res)=>{
  let city = req.body.city
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=2633fa48f537ad55f4b39af6e402c84e`
 
request(url, function(err,response,body){
  if(err){
    res.render('index',{weather:null,err:"error in featching weather of city",title:"City",count:"Country",tempmin:"min temp",tempmax:"max temp", tempstatus: null})
  }
  else{
    let weather = JSON.parse(body)
    if(weather.main == undefined){
      res.render('index', {weather:null, error:"please try again",title:"City",count:"Country",tempmin:"min temp",tempmax:"max temp", tempstatus: null})
    }else{
      let arrweather = [weather]
      let temps = arrweather[0].main.temp
      let temp_min = weather.main.temp_min
      let temp_max = weather.main.temp_max
      let cityName = weather.name
      let country =weather.sys.country
      let tempstatus =weather.weather[0].main
      res.render('index',{weather:temps,error:null,title:cityName,count:country,tempmin:temp_min,tempmax:temp_max, tempstatus: tempstatus})
      
    }
  }
})
})

app.listen(PORT,()=>{
  console.log(`app has started on port ${PORT}`)
})

