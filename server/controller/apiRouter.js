'use strict'
const express = require('express')
const router = express.Router()
const Article = require('../models/article')
const Comment = require('../models/comment')

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

// router.get('/', (req, res) => {
//   // 1. create user
//   const alan = new User({
//     username: 'alan',
//     password: 'secret'
//   })
//   // 2.save Alan
//   alan.save((err) => {
//     if (err) throw err
//     console.log('User was saved')
//   })

//   res.json({ test: true })
// })

// router.get('/findAll', (req, res) => {
//   User.find({}, function(err, users) {
//     if (err) throw err
//     res.json(users)
//   })
// })

module.exports = router
