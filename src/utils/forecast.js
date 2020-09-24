const request = require('request') //  npm i request@2.88.2
const forecast = (latitude, logitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=641ba08967096c3e4cc89aa48e2eebd0&query=' + latitude + ',' + logitude

    request({url, "json":true}, (error, response, body) => {
        if(error){ // this meant != null
            callback('Check Your Internet Connection Error...',undefined)
        }else if(body.error){
            callback('Please specify a valid location identifier using the query parameter.',undefined)
        }else{
            callback(undefined,{
                'weather':'Weather ' + body.current.weather_descriptions[0],
                'temperature' : body.current.temperature,
                'weather_icons': body.current.weather_icons[0]

            })
        }
        
    })
}

module.exports = forecast