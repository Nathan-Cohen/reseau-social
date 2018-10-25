const express = require('express')
const mongo = require('mongodb').MongoClient;
const path = require('path')
var bodyParser = require('body-parser')
var md5 = require('md5')
var ObjectID = require('mongodb').ObjectID

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
      
      collection.findOne({mail: req.body.mail}, function(err, o) {
        if(err){
          console.log(err.message);
        }else if(o){
          res.send({message: 'Adresse mail déjà enregistrer'});                      
          
        }
        else{
          mdp = md5(req.body.mdp)
          // si il m'existe pas on l'insert
          collection.insertOne({nom: req.body.nom, prenom: req.body.prenom, mail: req.body.mail, password: mdp, genre: req.body.genre, age: req.body.age, ville: req.body.ville, pays: req.body.pays, photo: req.body.photo, presentation: req.body.presentation, website: req.body.website}, function(err, o) {
            if(err){
              console.log(err.message);
              res.send({message: 'Erreur'});            
            }
            else{
              console.log("Nouvel utilisateur : ");
              res.send({id: o._id, mail: req.body.mail, nom: req.body.nom, prenom: req.body.prenom, mdp: o.password});                          

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
            console.log('Bien connecter', o._id);
            res.send({id: o._id, mail: o.mail, nom: o.nom, prenom: o.prenom, mdp: o.password});

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



// BAR DE RECHERCHE
// recupere les donnees de la connection pour verifier dans la BDD
app.post('/search', function(req, res) {
  console.log('req.body.message', req.body.message)
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
      var test = req.body.message;
      var query = { nomString: test};
      console.log('query.nomString', query.nomString)
      collection.find({ 'nom': { '$regex': query.nomString } }).toArray(function(err, o) {
        if(err){
          console.log('Echec de connexion a la collection', err.message);
        }else{
          if(o){
            console.log('Resultat', o);
              if(o.length == 0){
                console.log('Aucun resultat');
                res.send({search: 'Aucun resultat'});
              }
              else{
                console.log('Recherche effectuer', o);
                // {nom: o.nom, prenom: o.prenom, mail: o.mail}
                res.send({search: o});
              }
          }
          else{
            console.log('Recherche echouer');
            res.send({message: 'Recherche echouer'});
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
      console.log('profil connexion', req.body)
      // cherche si l'utilisateur existe
      collection.find({'_id': ObjectID(req.body.id)}).toArray(function(err, o) {
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


// PROFIL VISITEUR
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
      console.log('profil connexion', req.body)
      // cherche si l'utilisateur existe
      collection.find({'_id': ObjectID(req.body.id)}).toArray(function(err, o) {
        if(err){
          console.log('Echec de connexion a la collection', err.message);
        }else{
          if(o){
            console.log('Bien connecter profil visiteur');
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



// AJOUTER UN AMI
// recupere les donnees de la connection pour verifier dans la BDD
app.post('/ajouteami', function(req, res) {
  //////////////// CONNEXION A LA BASE ///////////////////
  var url = 'mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8'
  mongo.connect(url, {useNewUrlParser: true}, function(err, client) {
    if(err){
      console.log('err', err)
    }
    else{
      console.log("Connexion a la base reussi");
      const collection = client.db('heroku_g9jk10c8').collection('utilisateur');
      console.log('ajouterAmi connexion', req.body)
      // cherche si l'utilisateur existe
      collection.find({'_id': ObjectID(req.body.idEnCour)}).toArray(function(err, o) {
        if(err){
          console.log('Echec de connexion a la collection', err.message);
        }else{
          if(o){
            console.log('Bien connecter ajouterAmi visiteur');
            res.send({profilUtilisateur: o});

          }
          else{
            console.log('Erreur de connexion au ajouterAmi');
            res.send({message: 'Erreur de connexion au ajouterAmi'});
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
  
 
server.listen(process.env.PORT || 5001);
