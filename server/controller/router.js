'use strict'
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.json({ test: true })
})

module.exports = router
