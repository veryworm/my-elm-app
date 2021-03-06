const express = require('express')

const app = express()

const appData = require('./data.json')
const seller = appData.seller
const goods = appData.goods

// const compression = require("compression")
const router = express.Router()

router.get('/seller', function (req, res) {
  res.json({
    errno: 0,
    data: seller
  })
})

router.get('/goods', function (req, res) {
  res.json({
    errno: 0,
    data: goods
  })
})

app.use('/api', router)
// app.use(compression)
app.use(express.static('./dist'))

const port = process.env.PORT || 8900
console.log(port, 'port')
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})