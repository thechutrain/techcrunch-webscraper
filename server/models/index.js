const mongoose = require('mongoose')

module.exports.connect = (uri) => {
  mongoose.Promise = Promise
  const options = {}
  mongoose.connect(uri, options, function(err) {
    if (err) { 
      console.log(err)
      process.exit(1)
    } else {
      console.log(`Successfully connected to db @ "${uri}"`)
    }
  })

  // load models
  require('./user')
  require('./article')
}