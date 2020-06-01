const request = require('request');



const geocode =(address, callback) => {
  const url ="https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoiYW5raXQtMTQxIiwiYSI6ImNrYW0zb3doMTAzMnMyeXBmcHo0a3RiMWoifQ.JQEki1GwU-bfauCsnbs5wA&limit=1";

  request({url, json: true}, (error, { body }) =>{
    if (error) {
      callback('Unable to connect to location services', undefined);
    } else if (body.features.length===0){
      callback('Unable to find location. try another search.',undefined)
    } else {
      callback(undefined,{
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })

}


module.exports= geocode;