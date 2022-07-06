const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    const weatherData = {
    "request": {
        "type": "City",
        "query": "Chicago, United States of America",
        "language": "en",
        "unit": "m"
    },
    "location": {
        "name": "Chicago",
        "country": "United States of America",
        "region": "Illinois",
        "lat": "41.850",
        "lon": "-87.650",
        "timezone_id": "America/Chicago",
        "localtime": "2019-09-08 08:39",
        "localtime_epoch": 1567931940,
        "utc_offset": "-5.0"
    },
    "current": {
        "observation_time": "01:39 PM",
        "temparature": 19,
        "weather_code": 122,
        "weather_icons": [
            "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png"
        ],
        "weather_descriptions": [
            "Overcast"
        ],
        "wind_speed": 17,
        "wind_degree": 100,
        "wind_dir": "E",
        "pressure": 1019,
        "precip": 0,
        "humidity": 73,
        "cloudcover": 100,
        "feelslike": 19,
        "uv_index": 4,
        "visibility": 16
    },
    "forecast": {
        "2019-09-08": {
            "date": "2019-09-08",
            "date_epoch": 1567900800,
            "astro": {
                "sunrise": "06:23 AM",
                "sunset": "07:13 PM",
                "moonrise": "04:25 PM",
                "moonset": "12:58 AM",
                "moon_phase": "First Quarter",
                "moon_illumination": 62
            },
            "mintemp": 10,
            "maxtemp": 18,
            "avgtemp": 16,
            "totalsnow": 0,
            "sunhour": 6.5,
            "uv_index": 4
        }
    }
}

    // geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    //     debugger;
    //     if (error) {
    //         return res.send({ error })
    //     }

    //     // forecast(latitude, longitude, (error, forecastData) => {
    //     //     if (error) {
    //     //         return res.send({ error })
    //     //     }

    //     //     res.send({
    //     //         forecast: forecastData,
    //     //         location,
    //     //         address: req.query.address
    //     //     })
    //     // })
    // })
    res.send({
        weather: 'cool'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})