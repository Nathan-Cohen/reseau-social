const express = require('express')
const mongo = require('mongodb').MongoClient;
const path = require('path')
var bodyParser = require('body-parser')

//////////////// CREATE SERVER //////////////
app = express()
server = require('http').createServer(app);
app.use(express.static(__dirname + '/'));

//////////////// BODY-PARSER //////////////
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//////////////// ROUTES //////////////
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'models/index.html'));
});
// recupere les donnees de l'enregistrement pour l'enregistrer dans la BDD
app.post('/enregistrement', function(req, res) {
  console.log('ressssssssssssssssssssssss', req.body)
  //////////////// CONNEXION A LA BASE ///////////////////
  var url = 'mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8'
  mongo.connect(url, {useNewUrlParser: true}, function(err, client) {
    if(err){
      console.log('err', err)
    }
    else{
      console.log("Connexion a la base reussi");
      const collection = client.db('heroku_g9jk10c8').collection('utilisateur');
      // cherche si l'utilisateur existe deja
      collection.findOne({nom: req.body.nom, prenom: req.body.prenom, mail: req.body.mail, password: req.body.mdp}, function(err, o) {
        if(err){
          console.log(err.message);
        }else{
          // si il m'existe pas on l'insert
          collection.insertOne({nom: req.body.nom, prenom: req.body.prenom, mail: req.body.mail, password: req.body.mdp, genre: req.body.genre, age: req.body.age, ville: req.body.ville, pays: req.body.pays, photo: req.body.photo, presentation: req.body.presentation, website: req.body.website}, function(err, o) {
            if(err){
              console.log(err.message);
            }
            else{
              console.log("Nouvel utilisateur : ");

            }
          });
        }

      });
  
    }
  });
  
});
  



//////////////// SOCKET IO /////////////
var socketIO = require('socket.io');
var io = socketIO(server);
io.on('connection', function(socket){
  ///// ROUTE ////
  socket.on('test', function(){
    console.log('connexion ok', socket)
  })



})
  
 
server.listen(7007);
