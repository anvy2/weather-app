const request = require('request')


const forecast = (data, callback) => {
    const latitude = data.latitude
    const longitude = data.longitude
    url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=metric&exclude=hourly&appid=1ad129ed04ac767b521a7f943c8002b1'

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to fetch data')
        }
        else if (response.body.message) {
            callback('Invalid Location')
        }
        else {
            callback(undefined, {
                Temperature: response.body.current.temp,
                Weather: response.body.current.weather[0].description,
                Humidity: response.body.current.humidity
            })
        }
    })
}

module.exports = forecast