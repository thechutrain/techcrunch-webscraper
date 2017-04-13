'use strict'
const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', (req, res) => {
  res.json({ test: true })
})

router.get('/findAll', (req, res) => {
  User.find({}, function(err, users) {
    if (err) throw err
    res.json(users)
  })
})

module.exports = router
