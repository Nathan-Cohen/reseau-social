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
      // console.log("Connexion a la base reussi");
      const collection = client.db('heroku_g9jk10c8').collection('utilisateur');
      // cherche si l'utilisateur existe deja
      mdp = md5(req.body.mdp)
      
      collection.findOne({mail: req.body.mail}, function(err, o) {
        if(err){
          console.log(err.message);
        }else if(o){
          res.send({message: 'Adresse mail déjà enregistrer'});
          client.close();     
          
        }
        else{
          mdp = md5(req.body.mdp)
          // si il m'existe pas on l'insert
          collection.insertOne({nom: req.body.nom, prenom: req.body.prenom, mail: req.body.mail, password: mdp, genre: req.body.genre, age: req.body.age, ville: req.body.ville, pays: req.body.pays, photo: req.body.photo, presentation: req.body.presentation, website: req.body.website}, function(err, o) {
            if(err){
              console.log(err.message);
              res.send({message: 'Erreur'});
              client.close();
            }
            else{
              console.log("Nouvel utilisateur : ", o.ops[0].prenom);
              res.send({id: o.ops[0]._id, mail: req.body.mail, nom: req.body.nom, prenom: req.body.prenom, mdp: o.ops[0].password});  
              client.close();                        

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
      // console.log("Connexion a la base reussi");
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
            client.close();

          }
          else{
            console.log('Mot de passe ou adresse mail invalide');
            res.send({message: 'Mot de passe ou adresse mail invalide'});
            client.close();
          }

        }

      });
  
    }
  });
  
});



// BAR DE RECHERCHE
// recupere les donnees de la connection pour verifier dans la BDD
app.post('/search', function(req, res) {
  //////////////// CONNEXION A LA BASE ///////////////////
  var url = 'mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8'
  mongo.connect(url, {useNewUrlParser: true}, function(err, client) {
    if(err){
      console.log('err', err)
    }
    else{
      // console.log("Connexion a la base reussi");
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
                res.send({search: o});
                client.close();
              }
          }
          else{
            console.log('Recherche echouer');
            res.send({message: 'Recherche echouer'});
            client.close();
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
      // console.log("Connexion a la base reussi");
      const collection = client.db('heroku_g9jk10c8').collection('utilisateur');
      // cherche si l'utilisateur existe
      collection.find({'_id': ObjectID(req.body.id)}).toArray(function(err, o) {
        if(err){
          console.log('Echec de connexion a la collection', err.message);
        }else{
          if(o){
            res.send({profilUtilisateur: o});
            client.close();
          }
          else{
            res.send({message: 'Erreur de connexion au profil'});
            client.close();
          }

        }

      });
  
    }
  });
  
});


// PROFIL VISITEUR
// recupere les donnees de la connection pour verifier dans la BDD
app.post('/profil/recherche', function(req, res) {
  //////////////// CONNEXION A LA BASE ///////////////////
  var url = 'mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8'
  mongo.connect(url, {useNewUrlParser: true}, function(err, client) {
    if(err){
      console.log('err', err)
    }
    else{
      // console.log("Connexion a la base reussi");
      const collection = client.db('heroku_g9jk10c8').collection('utilisateur');
      // cherche si l'utilisateur existe
      collection.find({'_id': ObjectID(req.body.id)}).toArray(function(err, o) {
        if(err){
          console.log('Echec de connexion a la collection', err.message);
        }else{
          if(o){
            res.send({profilUtilisateur: o});
            client.close();
          }
          else{
            res.send({message: 'Erreur de connexion au profil'});
            client.close();
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
      // console.log("Connexion a la base reussi");
      const collection = client.db('heroku_g9jk10c8').collection('utilisateur');
      // console.log('ajouterAmi connexion', req.body)
      // ajoute une notification de demande ami
      collection.updateOne({'_id': ObjectID(req.body.id)}, {$push: {demandeAjoutAmi: req.body.idEnCour}}, function(err, o) {
        if(err){
          console.log('Echec de connexion a la collection', err.message);
        }else{
          if(o){
            console.log('Notification envoyer', o);
            res.send({profilUtilisateur: o});
            client.close();

          }
          else{
            console.log('Erreur de connexion');
            res.send({message: 'Erreur de connexion ajouterAmi'});
            client.close();

          }

        }

      });
  
    }
  });
  
});


// ACCEPTE OU REFUSE LA DEMANDE D'AMI
// recupere les donnees de la connection pour verifier dans la BDD
app.post('/choixajouteami', function(req, res) {
  //////////////// CONNEXION A LA BASE ///////////////////
  var url = 'mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8'
  mongo.connect(url, {useNewUrlParser: true}, function(err, client) {
    if(err){
      console.log('err', err)
    }
    else{
      // console.log("Connexion a la base reussi");
      const collection = client.db('heroku_g9jk10c8').collection('utilisateur');
      // console.log('profil connexion', req.body)
      // cherche si l'utilisateur existe
      collection.find({'_id': ObjectID(req.body.id)}).toArray(function(err, o) {
        if(err){
          console.log('Echec de connexion a la collection', err.message);
        }else{
          if(o){
            if(o[0].demandeAjoutAmi){
              console.log('profil connexion', o)            
              collection.find({'_id': ObjectID(o[0].demandeAjoutAmi[0])}).toArray(function(err, o) {
                if(err){
                  console.log('Echec de connexion a la collection', err.message);
                }else{
                  if(o){
                    res.send({notificationAmi: o});
                    client.close();
        
                  }
                  else{
                    res.send({message: 'Erreur de connexion au profil'});
                    client.close();
                  }
        
                }
        
              });

            }
          }
          else{
            res.send({message: 'Erreur de connexion au profil'});
          }

        }

      });
  
    }
  });
  
});
  



// AJOUTER UN AMI
// recupere les donnees de la connection pour verifier dans la BDD
app.post('/reponseajouteami', function(req, res) {
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
      // si l'utilisateur accepte l'invitation on met a jour les deux compte en les ajoutant mutuellement dans les amis
      if(req.body.reponse == "accepter"){
        // met a jour la liste d'ami de la personne qui recoit la demande
        collection.updateOne({'_id': ObjectID(req.body.id)}, {$set: {ami: req.body.idDemande}}, {$pull: {demandeAjoutAmi: {$eq: req.body.idDemande}}}, function(err, o) {
          if(err){
            console.log('Echec de connexion a la collection', err.message);
          }else{
            if(o){
              console.log('Ajout a la liste reussi ami du receveur');
              // met a jour la liste d'ami de la personne qui envoie la demande
              collection.updateOne({'_id': ObjectID(req.body.idDemande)}, {$set: {ami: req.body.id}}, function(err, o) {
                if(err){
                  console.log('Echec de connexion a la collection', err.message);
                }else{
                  if(o){
                    collection.updateOne({'_id': ObjectID(req.body.id)}, {$unset: {demandeAjoutAmi: req.body.idDemande}})
                    console.log('Ajout a la liste reussi du demandeur');
                    res.send({profilUtilisateur: o});
        
                  }
                  else{
                    console.log('Erreur de connexion au ajouterAmi');
                    res.send({message: 'Erreur de connexion ajouterAmi'});
                  }
        
                }
        
              });
  
            }
            else{
              console.log('Erreur de connexion au ajouterAmi');
              res.send({message: 'Erreur de connexion ajouterAmi'});
            }
  
          }
  
        });
        

      }
      // sinon on supprime de la liste d'attente le compte qui a fait la demande
      else(
        console.log('noooooooooooooo')        

      )
  
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
