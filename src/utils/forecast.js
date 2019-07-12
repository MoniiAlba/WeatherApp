const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/1d752bc6ff3a7d64adb19e777faa5c7a/" + latitude +"," + longitude + "?units=si&lang=es"
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect weather service!', undefined)
        }else if (body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, body.daily.data[0].summary + ' La temperatura actual es ' +body.currently.temperature + ' grados. Hay una probabilidad de ' + body.currently.precipProbability + '% de lluvia. Mañana estará: ' + body.daily.data[1].summary)
        }
    })

}

module.exports = forecast