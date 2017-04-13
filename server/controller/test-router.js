'use strict'
const express = require('express')
const router = express.Router()
const Article = require('../models/article')
const scrape = require('../webScrapper')

router.get('/', (req, res) => {
  scrape()
  res.send('done')
})

router.get('/findAll', (req, res) => {
  Article.find({}, function(err, users) {
    if (err) throw err
    res.json(users)
  })
})

module.exports = router
