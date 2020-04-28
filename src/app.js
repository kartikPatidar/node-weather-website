const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define path for Express config
const publicDirpath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Set static directory to serve
app.use(express.static(publicDirpath))
 
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kartik'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Kartik'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is Help text',
        title: 'Help Page',
        name: 'Kartik'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error : 'Please provide a location'
        })
    }

    geocode(req.query.address,(error, {latitude, longitude, location} = {})=>{
        if (error) {
            return res.send( { error })
        }
        forecast(latitude, longitude, (error2, forecastdata) => {
            if(error2) {
                return res.send(error2)
            }
            res.send({
                forecast: forecastdata,
                location: location,
                address: req.query.address,
            })
          })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide  search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kartik',
        errorMessage: 'Help  article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kartik',
        errorMessage: 'Page Not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
