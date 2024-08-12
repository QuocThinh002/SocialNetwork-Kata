const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')

const app = express()

// init middleware
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

// init database
require('./databases/init.mongodb')

// init routes 
app.get('/', (req, res) => {
    const strCompress = 'Abcd'
    res.status(200).json({
        message: 'hi Kata',
        data: strCompress.repeat(1000)
    })
})

// handling error

module.exports = app