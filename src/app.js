const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')

const app = express()
const port = process.env.PORT || 3000

const publicdir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicdir))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Anvy'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Anvy'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helptext: 'This is some useful text',
        name: 'Anvy'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Must provide a valid string'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})


app.get('/weather', (req, res) => {
    const geocode = require('./../utils/geocode')
    const forecast = require('./../utils/forecast')
    if(!req.query.location) {
        return res.send({
            error:'You must provide a valid location'
        })
    }
    const address = req.query.location
    geocode(address, (error, data) => {
        if (error) {
            
            return res.send({
                error: error
            })
        }
        forecast(data, (error, fdata) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: 'It is ' + fdata.Temperature + ' degrees at ' + address,
                location: data.location
            })
        })
    })
    
 })

 app.get('*', (req, res) => {
    res.render('my_404', {
        title: '404 error',
        name: 'Anvy'
    })
})


app.listen(port, () => {
    console.log('Server is running on port ' + port)
})