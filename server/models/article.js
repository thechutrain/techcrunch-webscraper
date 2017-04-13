const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 1. Create user schema
const articleSchema= new Schema({
  title: { type: String, required: true }
  
})

// 2. create reference to model
const Article = mongoose.model('Article', articleSchema)

// 3. export the User model
module.exports = Article
