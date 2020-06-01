const request = require('request');

const forecast = (latitude, longitude, callback) => {
  //const url ='http://api.weatherstack.com/current?access_key=acf26ccc839532ce53b1234dd1559f00&query='+latitude+','+longitude+'&units=m';
  const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+ latitude + '&lon='+ longitude  + '&appid=8a66d6b02a8fe2ef78e7113d66be974e&units=metric'
  request({url,json:true}, (error,{ body })=>{
    if (error) {
      callback('Unable to connect to weather service',undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      // callback(undefined,{
      //   description:body.current.weather_descriptions[0],
      //   temp:body.current.temperature,
      //   temp2:body.current.feelslike,
      //   icon:body.current.weather_icon[0]
      //
      // })

      callback(undefined,body.weather[0].description +". It is currently "+body.main.temp + ' degrees out.It feels like '+body.main.feels_like +' degrees out.'+' Humidity :'+body.main.humidity+'%');
    }
  })


}

module.exports = forecast;
