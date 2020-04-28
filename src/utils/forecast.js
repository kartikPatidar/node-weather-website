const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/c08c86694a5f356f66f5a70bc6e65cf4/' + latitude + ',' + longitude + '?units=si'

    request( {url, json: true}, (error, { body } = {}) => {
        if(error){
            callback('Unable to connect to Weather Service.', undefined)
        } else if( body.error){
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + ' degrees out. There is a ' +  body.currently.precipProbability + '% chances of rain.')
        }
    })
}

module.exports = forecast