'use strict'
const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', (req, res) => {
  res.render('home', { msg: 'you are at the homepage '})
})

router.get('/article/:id', (req, res) => {
  res.render('article', { msg: req.params.id })
})
module.exports = router
