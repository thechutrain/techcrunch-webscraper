'use strict'
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Article = require('../models/article')
const update = require('../webScrapper')

router.get('/', (req, res) => {
  // 1. Get all the articles and sent that to the homepage
  Article.find({}, (err, articles_array) => {
    if (err) {console.log(err)}
    console.log(articles_array)
    res.render('home', { articles_array })
  })
})

router.get('/article/:id', (req, res) => {
  Article.findOne({'_id': req.params.id}).populate('comments')
  .exec((err, article) => {
    if (err) {
      console.log(err)
    }
    console.log(article)
    res.render('article', article)
  })
})

router.get('/update', (req, res) => {
  update(null, function() {
    // successfully updated!
    res.json({ okay: true })
  })
})
module.exports = router
