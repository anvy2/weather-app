const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW52eWF0IiwiYSI6ImNrYWJib3lodTE0dm0ydnF3ZXdwb2Nvb28ifQ.tBZKTjJB0Z8WtPrEkrd7rg&limit=1'

    request({url: url, json: true}, (error, response) => {
        // console.log(response)
        if (error) {
            callback('Unable to connect to service!')
        }
        else if (response.body.features.length === 0) {
            callback('Unable to find location', undefined)
        }
        else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })

}

module.exports = geocode
