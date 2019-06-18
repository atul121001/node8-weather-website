var request = require('request');
var geocode = (placeTyped, accessToken, callback) => {
  var geoCodingURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(placeTyped)+".json?access_token="+accessToken+"&limit=1";
  request({url: geoCodingURL, json: true}, function(error, {body}, {message, features}){  
     if(error){
        callback("Unable to connect to location services");
     }else if(body && message){
        callback(message);
     }else if(body && features ){
         if(features.length<1){
            callback("Couldn't able to find the location try another search");
         }else{
             callback(undefined, body);
         }
     }
 });
}

module.exports = geocode;



