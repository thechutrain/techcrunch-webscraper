'use strict'
const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', (req, res) => {
  // 1. create user
  const alan = new User({
    username: 'alan',
    password: 'secret'
  })
  // 2.save Alan
  alan.save((err) => {
    if (err) throw err
    console.log('User was saved')
  })

  res.json({ test: true })
})

router.get('/findAll', (req, res) => {
  User.find({}, function(err, users) {
    if (err) throw err
    res.json(users)
  })
})

module.exports = router
