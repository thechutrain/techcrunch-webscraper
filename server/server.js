const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
require('dotenv').load()

const PORT = process.env.PORT || 3000
const app = express()

// require models
console.log(process.env.MONGODB_URI)
require('./models').connect(process.env.MONGODB_URI)

// Logger ------------------------- /
app.use(morgan('combined'))

module.exports = app
