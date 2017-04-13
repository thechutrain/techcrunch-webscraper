const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
require('dotenv').config({path: '../.env'})

const PORT = process.env.PORT || 3000
console.log(PORT)
const app = express()

// require models
require('./models')

// Logger ------------------------- /
app.use(morgan('combined'))

module.exports = app
