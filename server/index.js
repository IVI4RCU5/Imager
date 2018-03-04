const express = require('express');
const bodyParser = require('body-parser');
const googleMapsClient = require ('@google/maps').createClient({
  key: `${process.env.API_KEY || require('../config.js').API_KEY}`
});
const db = require('../database/index.js')

let app = express();

app.use(express.static(__dirname + '/../client/dist'))
app.use(bodyParser.json())

app.get('/images', (req, res) => {
  db.getAll()
  .then((data) => {
    res.status(200).send(data)
  })
  .catch((err) => {
    console.error(err)
  })
})

app.post('/images', (req, res) => {
  console.log('post request received by server', req.body)
  db.save(req.body)
  .then(() => {
    console.log('response received from database')
    res.status(201).send()
  })
  .catch((err) => {
    console.error(err)
  })
})

app.get('/details', (req, res) => {
  db.getDetails(req.query.imageId)
  .then((data) => {
    res.status(200).send(data)
  })
  .catch((err) => {
    console.error(err)
  })
})

app.post('/likes', (req, res) => {
  db.addLike(req.body.imageId)
  .then(() => {
    res.status(201).send()
  })
  .catch((err) => {
    console.error(err)
  })
})

app.get('/coordinates', (req, res) => {
  console.log('received get request and queried the API', req.query.location)
  googleMapsClient.geocode({
    address: `${req.query.location}`
  }, (err, data) => {
    if (err) {
      console.error(err)
    } else {
      console.log('got data from Geocoding API', data.json.results[0].geometry.location)
      res.status(200).send(data.json.results[0].geometry.location)
    }
  })
})

app.post('/comments', (req, res) => {
  db.addComment(req.body.imageId, req.body.comment)
  .then(() => {
    res.status(201).send()
  })
  .catch((err) => {
    console.error(err)
  })
})

let port = process.env.port || 3000

app.listen(port, function() {
  console.log(`listening on port ${port}`)
})