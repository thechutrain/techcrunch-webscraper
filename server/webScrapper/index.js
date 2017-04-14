const axios = require('axios')
const cheerio = require('cheerio')
const Article = require('../models/article')

// 1. make a request to url w. axios
function makeRequest(input_uri, done_cb) {
  const uri = input_uri || 'https://techcrunch.com/'
  axios.get(uri)
    .then(function(response) {
      // console.log(typeof response.data)
      processHTML(response.data, saveArticle, done_cb)
    })
    .catch(function(axios_err) {
      console.log(axios_err)
      process.exit(1)
    })
}
// ===== TESTING ======
// makeRequest()

// 2. get the important web page content
function processHTML (rawHTML, callback, done_cb) {
  const articles_array = []
  const $ = cheerio.load(rawHTML)
  $('ul#river1 li.river-block').each((index, value) => {
    // console.log($(value).html())
    // console.log('===========================')
    const title = $(value).find('h2.post-title a').text()
    const published_timestamp = $(value).find('time.timestamp').attr('datetime')
    const blurb = $(value).find('p.excerpt')
    const excerpt = blurb.text()
    const article_link = $(blurb).find('a').attr('href')
    const img_url_raw = $(value).find('div.block-content > span img').attr('data-src')
    let img_url
    try {
      img_url = img_url_raw.split(/(^.+)[?]/)[1]
    } catch (e){
      img_url = ''
    }
    const articleData = { title, published_timestamp, excerpt, article_link, img_url }
    // console.log(articleData)
    articles_array.push(articleData)
  })
  // console.log(articles_array)
  callback(articles_array, done_cb)
}

// 3. save each article into the mongo database
function saveArticle(data, done_cb) {
  data.forEach((article_obj) => {
    // console.log(article_obj)
    let article = new Article(article_obj)
    let error = ''
    try {
      article.save((err) => {
        error = err
      })
    } catch (e) {
      console.log(error)
      console.log(article_obj)
      console.log('===================')
    }
  })
  done_cb()
}

module.exports = makeRequest