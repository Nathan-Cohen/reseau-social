const express = require('express')
const mongo = require('mongodb').MongoClient;
const path = require('path')

app = express()
server = require('http').createServer(app);
app.use(express.static(__dirname + '/'));

//////////////// ROUTES //////////////
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'models/index.html'));
  });


////////////// CONNEXION A LA BASE ///////////////////
var url = 'mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8'
mongo.connect(url, {useNewUrlParser: true}, function(err, client) {
  if(err){
    console.log('err', err)
  }
  else{
    console.log("Connected successfully to server");
    const db = client.db('heroku_g9jk10c8').collection('utilisateur');
    client.close();

  }
});


//////////// SOCKET IO /////////////
var socketIO = require('socket.io');
var io = socketIO(server);
io.on('connection', function(socket){
  socket.on('test', function(){
    console.log('connexion ok', socket)
    
  })
})
  
server.listen(8080)
 