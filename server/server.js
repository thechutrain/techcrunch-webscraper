const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const path = require('path')
require('dotenv').load()

const PORT = process.env.PORT || 3000
const app = express()

// require models
require('./models').connect(process.env.MONGODB_URI)

// Middleware ------------------------- /
// app.use(morgan('combined'))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, '/views/layouts'),
  partialsDir: path.join(__dirname, '/views/partials')
}))

// Router ------------------------- /
app.use('/', require('./controller/htmlRouter'))
app.use('/test', require('./controller/test-router'))
app.use('/api', require('./controller/apiRouter'))

// Start Server ------------------------- /
app.listen(PORT, () => {
  console.log(`App is running on local host port: ${PORT}`)
})

module.exports = app
