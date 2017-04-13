const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)

console.log(process.env.MONGODB_URI)