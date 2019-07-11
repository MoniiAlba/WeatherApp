const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibW9uaWFsYmEiLCJhIjoiY2p4a2xubXVyMDFlYzNvbW9tcGthcGx1eiJ9.cT973SskCOJ17zxPO8mMbg&limit=1"
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services!', undefined)
        }else if(body.message || body.features.length === 0){
            callback("Unable to find location. Try another search", undefined)
        }else{
            const data = body.features[0]
            callback(undefined, {
                latitude: data.center[1],
                longitude: data.center[0],                 
                location: data.place_name 
            })
        }
        
    })
    
}

module.exports = geocode