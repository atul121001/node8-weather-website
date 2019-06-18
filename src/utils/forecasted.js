var request = require('request');
const forecasted = (coordinates, callBack) => {
    const url = "https://api.darksky.net/forecast/da9a47ea078ec363e8061efd16323c76/"+coordinates+"?units=si";
    request({url, json: true}, function(err, response, {error,currently}){
        if(err){
            callBack(err, undefined);
        }else if(err && error){
            callBack(error, undefined);
        }else{
            console.log(response.body.daily.data[0]);
            callBack(undefined, currently)
        }
    });
}

module.exports = forecasted



