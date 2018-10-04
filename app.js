const path = require('path');
const mongo = require('mongodb').MongoClient;
var express = require('express')
app = express()
server = require('http').createServer(app);

app.use(express.static(__dirname + '/'));
// app.use(express.static(__dirname + '/node_modules'));
// app.use(express.static(__dirname + '/directives'));
// app.use(express.static(__dirname + '/views'));
// app.use(express.static(__dirname + './controllers'));
// app.use(express.static(__dirname + './style'));
// app.use(express.static(__dirname + './roote'));


// var url = "mongodb://heroku_xxbnv843:m1tp1ts1p4deps3isa7f6dlcgm@ds141932.mlab.com:41932/heroku_xxbnv843";
var url = 'mongodb://heroku_9qn3w1x7:vinil75020@ds121673.mlab.com:21673/heroku_9qn3w1x7'
// Use connect method to connect to the server
mongo.connect(url, {useNewUrlParser: true}, function(err, client) {
  if(err){
    console.log('err', err)
  }
  else{
    console.log("Connected successfully to server");
    const db = client.db('heroku_9qn3w1x7').collection('reseau');
    client.close();

  }
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'models/index.html'));
  });
  
 
server.listen(9007);