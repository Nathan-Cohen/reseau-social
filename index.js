const express = require('express')
const mongo = require('mongodb').MongoClient;
const path = require('path')
var bodyParser = require('body-parser')
var md5 = require('md5')

//////////////// CREATE SERVER //////////////
app = express()
server = require('http').createServer(app);
app.use(express.static(__dirname + '/'));
app.use("/socket", express.static(path.join(__dirname + "/node_modules/socket.io-client/dist/")));

//////////////// BODY-PARSER //////////////
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//////////////// ROUTES //////////////
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'models/index.html'));
});

// ENREGISTREMENT
// recupere les donnees de l'enregistrement pour l'enregistrer dans la BDD
app.post('/enregistrement', function(req, res) {
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
      mdp = md5(req.body.mdp)
      
      collection.findOne({nom: req.body.nom, prenom: req.body.prenom, mail: req.body.mail, password: mdp}, function(err, o) {
        if(err){
          console.log(err.message);
        }else{
          mdp = md5(req.body.mdp)
          // si il m'existe pas on l'insert
          collection.insertOne({nom: req.body.nom, prenom: req.body.prenom, mail: req.body.mail, password: mdp, genre: req.body.genre, age: req.body.age, ville: req.body.ville, pays: req.body.pays, photo: req.body.photo, presentation: req.body.presentation, website: req.body.website}, function(err, o) {
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


// CONNECTION
// recupere les donnees de la connection pour verifier dans la BDD
app.post('/connection', function(req, res) {
  //////////////// CONNEXION A LA BASE ///////////////////
  var url = 'mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8'
  mongo.connect(url, {useNewUrlParser: true}, function(err, client) {
    if(err){
      console.log('err', err)
    }
    else{
      console.log("Connexion a la base reussi");
      const collection = client.db('heroku_g9jk10c8').collection('utilisateur');
      mdp = md5(req.body.mdp)
      // cherche si l'utilisateur existe deja
      collection.findOne({mail: req.body.mail, password: mdp}, function(err, o) {
        if(err){
          console.log('Echec de connexion a la collection', err.message);
        }else{
          if(o){
            console.log('Bien connecter');
            res.send({mail: o.mail, nom: o.nom, prenom: o.prenom});

          }
          else{
            console.log('Mot de passe ou adresse mail invalide');
            res.send({message: 'Mot de passe ou adresse mail invalide'});
          }

        }

      });
  
    }
  });
  
});


// PROFIL
// recupere les donnees de la connection pour verifier dans la BDD
app.post('/profil', function(req, res) {
  //////////////// CONNEXION A LA BASE ///////////////////
  var url = 'mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8'
  mongo.connect(url, {useNewUrlParser: true}, function(err, client) {
    if(err){
      console.log('err', err)
    }
    else{
      console.log("Connexion a la base reussi");
      const collection = client.db('heroku_g9jk10c8').collection('utilisateur');
      console.log(req.body.mail)
      // cherche si l'utilisateur existe deja
      collection.findOne({mail: req.body.mail}, function(err, o) {
        if(err){
          console.log('Echec de connexion a la collection', err.message);
        }else{
          if(o){
            console.log('Bien connecter profil');
            res.send({profilUtilisateur: o});

          }
          else{
            console.log('Erreur de connexion au profil');
            res.send({message: 'Erreur de connexion au profil'});
          }

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
  
 
server.listen(process.env.PORT || 5000);
