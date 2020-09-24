const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiaG1xaXd0IiwiYSI6ImNrZmY5eHAxNzBjcjUydGw4bmp5NDlweDIifQ.3jExm3bx23jvClif0EbZtw'
    request({'url' : url, 'json' : true}, (error,response, body) =>{
        if(error){
            callback('Check Your Internet Connection Error...',undefined)
        }else if(body.features.length === 0){
            callback('The Address You Enter Doesn\'t Exist...',undefined)
        }else{
            callback(undefined,{
                'latitude' : body.features[0].center[1],
                'longitude': body.features[0].center[0],
                'location' : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode