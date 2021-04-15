const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const feedRoutes = require('./routes/feed')
const authRoutes = require('./routes/auth')

const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT')
    res.setHeader('Access-control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use(bodyParser.json())

app.use('/auth', authRoutes)
app.use(feedRoutes)

app.use((error, req, res, next) => {
    if (!error.statusCode) {
        error.statusCode = 500
    }
    console.log('error middleware', error)
    res.status(error.statusCode).send(error.message)
})

mongoose.connect('')
    .then(() => {
        app.listen(3000)
    }).catch(err => {
        console.log(err)
    })

