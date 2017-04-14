'use strict'
const express = require('express')
const router = express.Router()
const Article = require('../models/article')
const Comment = require('../models/comment')
const update = require('../webScrapper')

router.get('/update', (req, res) => {
  update()
  res.send('okay')
})

router.get('/article', (req, res) => {
  Article.find({}, (err, queryResult) => {
    if (err) {
      throw err
      return res.send('Error')
    }
    res.json(queryResult)
  })
})

router.get('/article/:id', (req, res) => {
  Article.find({'_id': req.params.id}).populate('comments')
  .exec((err, queryResult) => {
    if (err) {
      throw err
      return res.send('Error')
    }
    res.json(queryResult)
  })
})

router.post('/article/:id/new-comment', (req, res) => {
  let username = req.body.username || 'guest'
  let newComment = new Comment({
    text: req.body.text,
    username
  })
  newComment.save((err, enteredComment) => {
    if (err) { 
      console.log(err)
      process.exit(1)
    } else {
      Article.findByIdAndUpdate(req.params.id, { 
          $push: {'comments': enteredComment._id}
        },
        {
          new: true
        },
        (error, updatedArticle) => {
          if (error) {return res.send(err)}
          res.json(updatedArticle)
        })
    }
  })
})


module.exports = router
