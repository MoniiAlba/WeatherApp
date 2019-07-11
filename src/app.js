const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDir))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Moni'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About page',
        name: 'Moni'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: 'Help page',
        text: 'AUXILIOOOOOOOOOOOOOOOO',
        name:'Moni'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location
            })
            
         })
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
        name: 'Moni',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Moni',
        errorMessage: 'Page not found.'
    })
})




app.get('/weather', (req, res) => {
    res.send({forecast: 'string', location: 'string'})
})

app.listen(port, () => {
    console.log('Server is up on port ' + port +'. :)')
})