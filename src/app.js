const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecasted = require('./utils/forecasted');
const geocode = require('./utils/geocode');
const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// configurations
app.use(express.static(publicDirectoryPath));
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// To register partials
hbs.registerPartials(partialsPath);

var accessToken = "pk.eyJ1IjoiYXR1bG1pc2hyYSIsImEiOiJjand2cGdnMzgwYW1iNDNtaGpvYjV2d2FoIn0.ruCdCt6o4dBmKBV_LJtwZQ";

// routes with functions
app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather'
    });
});

app.get('/help', (req, res)=>{  
    res.render('help', {
        title: "Help"
    })
});

app.get('/help/*', (req, res)=>{  
    res.render('error', {
        title:  "404",
        errorText: "The requested Help section is not found!"
    });
});

app.get('/about', (req, res)=>{
   res.render('about', {
       title: "About"
   });
});

var errorString,forecastedString;

app.get('/weather', (req, res)=>{

    
    if(req.query && !req.query.address || req.query.address && req.query.address.length<1){
        return res.send({
            title: "Please provide a Weather search address"
        });
    }

    
    geocode(encodeURIComponent(req.query.address),accessToken,(error, message) => {
        if(error){
            weatherForecst(res, error, req.query.address);
        }else{
            var lat = message.features[0].center[1];
            var long =message.features[0].center[0];
            var coordinates = lat+","+long;
            forecasted(coordinates, (error, {summary, temperature}) => {
                if(error){
                    weatherForecst(res, error, req.query.address);
                }else{
                    forecastedString = "Weather is "+ summary + " and the temerature is now "+ temperature +" Degree Celcius";
                    weatherForecst(res, "", forecastedString, req.query.address)
                }
            });
        }
    });
});

function weatherForecst(res, errorString, forecastedString, address) {
    return res.send({
        location: address?address: "address is not available",
        weatherForecast: errorString ? errorString : forecastedString
    });
}

app.get('/products', (req, res) => {

    if(!req.query.search){
        return res.send({error: 'Please provide a search term!'});
    }
    console.log(req.query);
    res.send({
        products: []
    })
});

app.get('*', (req, res)=> {
    res.render('error', {
        title:  "404",
        errorText: "The page is not found!"
    });
});

app.listen(3000, ()=>{
    console.log('Server is up on port 3000');
})

