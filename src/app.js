const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')

const app = express()

//domain name - app.com
// url app.com/about
// url app.com/help
//req = request
//res = response

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebar engine and views location
app.set('view engine', 'hbs')
//to change the directory views - load the views files  
app.set('views', viewsPath)

//to load partials folder files
hbs.registerPartials(partialsPath)

// to customize the server to server any particular folder or file
//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Learning NodeJS',
        name: 'Rahul Makwana'
    })
})


app.get('/help', (req, res) => {
    res.send([{
        name: 'rahul',
        age: 30,
    }, {
        name: 'gayatri',
        age: 26
    }
    ])
})

app.get('/help-web', (req, res) => {
    res.render('help', {
        title: 'help page',
        name: 'rahul makwana'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about us page',
        name: 'rahul makwana'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    return res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'address field is required'
        })
    }
    const url = "http://api.weatherstack.com/current?access_key=04f4e2d39585f5f9edaa0fcf6ff016f3&query=" + req.query.address

    request({ url: url, json: true }, function (error, response, body) {
        
        if (body.success!= undefined && body.success ==false) {
            return res.send({
                error: 'address not match'
            })
        } else {
            res.send({
                body: body.current.temperature,
                timezone: body.location.timezone_id,
                address: req.query.address
            })
        }
    });
})

app.get('/help/*', (req, res) => {
    res.send('help article not found')
})
app.get('*', (req, res) => {
    res.render('404')
})

app.listen(3001, () => {
    console.log('server started at port 3000')
})
