const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const e = require('express')
const app = express()

const port = process.env.PORT || 3000

// Define paths for express config 
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlesbar engine and views location
app.set('view engine', 'hbs');
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


// Setup directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,resp) =>{
    resp.render('index',{
        'title' : 'Weather App',
        'create': 'HMQ'
    })
})

app.get('/about',(req,resp) =>{
    resp.render('about',{
        'title' : 'About Me',
        'create': 'HMQ'
    })
})

app.get('/help',(req,resp) =>{
    resp.render('help',{
        'title' : 'Help Page',
        'create': 'HMQ'
    })
})

app.get('/product',(req,resp) =>{
    if(!req.query.search){
        return resp.send({
            'error' : 'You missing field search. Try again...'
        })
    }
    resp.send({
        'product':[]
    })
})

app.get('/weather',(req,resp) =>{
    if(!req.query.address){
        return resp.send({
            'error' : 'You missing field address. Try again...'
        })
    }
    const addr = req.query.address
    geocode(addr,(error,{latitude,longitude,location}={})=>{
        if(error){
            return resp.send({error})
        }
        forecast(latitude,longitude,(error,{weather,temperature,weather_icons}) =>{
            if(error){
                return resp.send({error})
            }
            resp.send({weather,temperature,weather_icons,location})
        })
    })

})

app.get('*',(req,resp) =>{
    resp.render('404_page',{
        'error' : new Date()
    })
})



app.listen(port,() => {
    console.log('Start at port ' + port)
}) // server side will be listen at port 