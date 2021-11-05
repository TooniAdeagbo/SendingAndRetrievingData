//uses express, bodyparser,ejs and mongodb
const express  = require("express");
const app = express();
const ejs = require('ejs');
const MongoClient =require('mongodb').MongoClient;
const bodyParser = require("body-parser");
const connect = require("./connect");
const client = new MongoClient(connect.database.url, {useUnifiedTopology: true});
const dbName = 'EmailAddress';
client.connect(function(err){
    console.log("Connected Succesfully");
})
const db = client.db(dbName);
const emailCollection = db.collection('email')
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))/*
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
  })*/
  app.get('/', (req, res) => {
    db.collection('email').find().toArray()
      .then(results => {
        res.render('index.ejs', { email: results })
      })
.catch(error => console.error(error))
  })
  app.post('/email', (req, res) => {
    emailCollection.insertOne(req.body)
      .then(result => {
        res.redirect('/')
      })
      .catch(error => console.error(error))
  }) 

app.listen(3000, function() {
    console.log('listening on 3000')
  })