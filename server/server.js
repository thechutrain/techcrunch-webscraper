const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
require('dotenv').load()

const PORT = process.env.PORT || 3000
const app = express()

// require models
require('./models').connect(process.env.MONGODB_URI)

// Logger ------------------------- /
// app.use(morgan('combined'))
app.use(morgan('dev'))

// Router ------------------------- /
const apiRouter = require('./controller/router')
app.use('/api', apiRouter)

// Start Server ------------------------- /
app.listen(PORT, () => {
  console.log(`App is running on local host port: ${PORT}`)
})

module.exports = app
