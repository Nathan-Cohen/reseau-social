const express = require('express')
const mongo = require('mongodb').MongoClient;
const path = require('path')
var bodyParser = require('body-parser')
var md5 = require('md5')
var ObjectID = require('mongodb').ObjectID

// IMPORTER LE MODULE MONGODB
// var mongoUtil = require( './db' );
// var db = mongoUtil.get();

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
      const collection = client.db('heroku_g9jk10c8').collection('utilisateur');
      // cherche si l'utilisateur existe deja
      var search = req.body.searchEnCour;
      var query = { nomString: search};
      console.log('query.nomString', query.nomString)
      collection.find({$or:[{ 'nom': { '$regex': query.nomString } },{ 'prenom': { '$regex': query.nomString } }]}).toArray(function(err, o) {
        if(err){
          console.log('Echec de connexion a la collection', err.message);
        }else{
          if(o){
            console.log('Resultat');
              if(o.length == 0){
                console.log('Aucun resultat');
                res.send({search: 'Aucun resultat'});
              }
              else{
                console.log('Recherche effectuer');
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
      const collection = client.db('heroku_g9jk10c8').collection('utilisateur');
      // ajoute une notification de demande ami
      collection.updateOne({'_id': ObjectID(req.body.id)}, {$push: {demandeAjoutAmi: req.body.idEnCour}}, function(err, o) {
        if(err){
          console.log('Echec de connexion a la collection', err.message);
        }else{
          if(o){
            console.log('Notification envoyer');
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
  var tabDesDemandes = []
  var booleanDemande = false;
  //////////////// CONNEXION A LA BASE ///////////////////
  var url = 'mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8'
  mongo.connect(url, {useNewUrlParser: true}, function(err, client) {
    if(err){
      console.log('err', err)
    }
    else{
      const collection = client.db('heroku_g9jk10c8').collection('utilisateur');
      // cherche si l'utilisateur existe
      collection.find({'_id': ObjectID(req.body.id)}).toArray(function(err, o) {
        if(err){
          console.log('Echec de connexion a la collection', err.message);
        }else{
          if(o){
            if(o[0]){
              // si il n'a pas encore de demande d'ami
              if(o[0].demandeAjoutAmi.length == 0){
                res.send({notificationAmi: tabDesDemandes});                
              }
              for(var i=0; i<o[0].demandeAjoutAmi.length; i++){
                collection.find({'_id': ObjectID(o[0].demandeAjoutAmi[i])}).toArray(function(err, o) {
                  if(err){
                    console.log('Echec de connexion a la collection', err.message);
                  }else{
                    if(o){
                      tabDesDemandes.push(o[0])
                      if(i == tabDesDemandes.length){
                        booleanDemande = true;

                      }
                      client.close();
          
                    }
                    else{
                      res.send({message: 'Erreur de connexion au profil'});
                      if(i == tabDesDemandes.length){
                        booleanDemande = true;

                      }                   
                      client.close();
                    }
          
                  }
                  // si le traitement du tableau a eu lieu on envoie les donnees
                  if(booleanDemande){
                    res.send({notificationAmi: tabDesDemandes});
                  }           
          
                });

              }

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
  





// LISTE AMI
// recupere les donnees de la connection pour verifier dans la BDD
app.post('/listeami', function(req, res) {
  var tabListeDeAmis = []
  //////////////// CONNEXION A LA BASE ///////////////////
  var url = 'mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8'
  mongo.connect(url, {useNewUrlParser: true}, function(err, client) {
    if(err){
      console.log('err', err)
    }
    else{
      const collection = client.db('heroku_g9jk10c8').collection('utilisateur');
      // cherche si l'utilisateur existe
      collection.find({'_id': ObjectID(req.body.id)}).toArray(function(err, o) {
        if(err){
          console.log('Echec de connexion a la collection', err.message);
        }else{
            if(o[0].ami){
              // si il n'a pas encore d'ami
              if(o[0].ami.length == 0){
                res.send({message: '0'});
                client.close();
              }
              else{                
                // boucle sur le nombre d'ami
                var compteurAmi = 0
                for(var i=0; i<o[0].ami.length; i++){
                  compteurAmi++
                  collection.findOne({'_id': ObjectID(o[0].ami[i])}, function(err, o) {
                    if(err){
                      console.log('Echec de connexion a la collection', err.message);
                    }else{
                        tabListeDeAmis.push(o)
                    }
                      // si le tableau a bien ete construit on envoie les données
                      compteurAmi--
                      if(!compteurAmi){
                        res.send({listeAmi: tabListeDeAmis}); 

                      }
                  });
                  
                }
              }

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
      // si l'utilisateur accepte l'invitation on met a jour les deux compte en les ajoutant mutuellement dans les amis
      if(req.body.reponse == "accepter"){
        // met a jour la liste d'ami de la personne qui recoit la demande
        collection.updateOne({'_id': ObjectID(req.body.id)}, {$push: {ami: req.body.idDemande}}, function(err, o) {
          if(err){
            console.log('Echec de connexion a la collection', err.message);
          }else{
            if(o){
              console.log('Ajout a la liste reussi ami du receveur');
              // met a jour la liste d'ami de la personne qui envoie la demande
              collection.updateOne({'_id': ObjectID(req.body.idDemande)}, {$push: {ami: req.body.id}}, function(err, o) {
                if(err){
                  console.log('Echec de connexion a la collection', err.message);
                }else{
                  if(o){
                    // supprime la demande dans la liste des demandes d'ami
                    collection.updateOne({'_id': ObjectID(req.body.id)}, {$pull: {demandeAjoutAmi: req.body.idDemande}})
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
      else{      
        collection.updateOne({'_id': ObjectID(req.body.id)}, {$pull: {demandeAjoutAmi: req.body.idDemande}})
        res.send({message: 'Suppression reussi'});

      }
  
    }
  });
  
});




// SUPRIMER UN AMI
// recupere les donnees de la connection pour verifier dans la BDD
app.post('/supprimeami', function(req, res) {
  //////////////// CONNEXION A LA BASE ///////////////////
  var url = 'mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8'
  mongo.connect(url, {useNewUrlParser: true}, function(err, client) {
    if(err){
      console.log('err', err)
    }
    else{
      const collection = client.db('heroku_g9jk10c8').collection('utilisateur');
        // supprime l'ami de l'utilisateur en cour
        collection.updateOne({'_id': ObjectID(req.body.id)}, {$pull: {ami: req.body.idAmi}}, function(err, o) {
          if(err){
            console.log('Echec de connexion a la collection', err.message);
          }else{
            if(o){
              // supprime l'utilisateur de l'ami en cour
              collection.updateOne({'_id': ObjectID(req.body.idAmi)}, {$pull: {ami: req.body.id}})
              res.send({message: 'suppression'});
  
            }
            else{
              console.log('Erreur de connexion au ajouterAmi');
              res.send({message: 'Erreur de connexion ajouterAmi'});
            }
  
          }
  
        });
          
    }
  });
  
});



///////VERIFIE SI L'UTILISATEUR PEUT PUBLIER ////////
// recupere les donnees de la connection pour verifier dans la BDD
app.post('/publicationbar', function(req, res) {
  //////////////// CONNEXION A LA BASE ///////////////////
  var url = 'mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8'
  mongo.connect(url, {useNewUrlParser: true}, function(err, client) {
    if(err){
      console.log('err', err)
    }
    else{
      const collection = client.db('heroku_g9jk10c8').collection('utilisateur');
      // cherche si l'utilisateur existe
      collection.find({'_id': ObjectID(req.body.idEnCour)}).toArray(function(err, o) {
        if(err){
          console.log('Echec de connexion a la collection', err.message);
        }else{
          for(var j=0; j<o[0].ami.length; j++){
            if(o[0].ami[j] == req.body.id){
              res.send({message: 'autoriser'});
            }
          }
        }

      });
  
    }
  });
  
});


////////////// PUBLICATION ///////////////
app.post('/publicationProfil', function(req, res) {
  //////////////// CONNEXION A LA BASE ///////////////////
  var url = 'mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8'
  mongo.connect(url, {useNewUrlParser: true}, function(err, client) {
    if(err){
      console.log('err', err)
    }
    else{
      const collection = client.db('heroku_g9jk10c8').collection('publication');
      // si il m'existe pas on l'insert
      collection.insertOne({idProfil: req.body.idEnCour, idPublication: req.body.id, publication: req.body.messagepublication, nomAuteur: req.body.nom, prenomAuteur: req.body.prenom}, function(err, o) {
        if(err){
          console.log(err.message);
          res.send({message: 'Erreur'});
          client.close();
        }
        else{
          res.send({message: 'Publier'});
          client.close();                        

        }
      });
  
    }
  });
  
});



/////// LISTE PUBLICATION ////////
// recupere les donnees de la connection pour verifier dans la BDD
app.post('/listepublication', function(req, res) {
  //////////////// CONNEXION A LA BASE ///////////////////
  var url = 'mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8'
  mongo.connect(url, {useNewUrlParser: true}, function(err, client) {
    if(err){
      console.log('err', err)
    }
    else{
      const collection = client.db('heroku_g9jk10c8').collection('publication');
      // cherche si l'utilisateur existe
      collection.find({'idProfil': req.body.idEnCour}).toArray(function(err, o) {
        if(err){
          console.log('Echec de connexion a la collection', err.message);
        }else{
          res.send({listePublication: o});
        }

      });
  
    }
  });
  
});


// SUPRIMER UNE PUBLICATION
// recupere les donnees de la connection pour verifier dans la BDD
app.post('/supprimepublication', function(req, res) {
  //////////////// CONNEXION A LA BASE ///////////////////
  var url = 'mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8'
  mongo.connect(url, {useNewUrlParser: true}, function(err, client) {
    if(err){
      console.log('err', err)
    }
    else{
      const collection = client.db('heroku_g9jk10c8').collection('publication');
        // supprime la publication
        collection.deleteOne({'_id': ObjectID(req.body.idPublication)}, function(err, o) {
          if(err){
            console.log('Echec de connexion a la collection', err.message);
          }else{
            if(o){
              res.send({message: 'suppression'});
  
            }
            else{
              console.log('Erreur de suppression de la publication');
              res.send({message: 'Erreur'});
            }
  
          }
  
        });
          
    }
  });
  
});



// COMMENTAIRE
app.post('/ajoutcommentaire', function(req, res) {
  console.log('ajoute commentaire', req.body)
  //////////////// CONNEXION A LA BASE ///////////////////
  var url = 'mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8'
  mongo.connect(url, {useNewUrlParser: true}, function(err, client) {
    if(err){
      console.log('err', err)
    }
    else{
      const collection = client.db('heroku_g9jk10c8').collection('publication');
      collection.updateOne({'_id': ObjectID(req.body.idDeLaPublication)}, {$push: {'idCommentateur': [req.body.id, req.body.commentaire]}}, function(err, o) {
        if(err){
          console.log('Echec de connexion a la collection', err.message);
        }else{
          res.send({message: 'Commentaire ajouter'});          
        }
      });
    }
  });
  
});



//////////////// SOCKET IO /////////////
var socketIO = require('socket.io');
var io = socketIO(server);
var tabConnection = [];

///// ROUTE ////
io.on('connection', function(socket){
  // a la connexion de l'utilisateur on ajoute dans le tableau
  socket.on('connexion', function(data){
    tabConnection.push(socket)

  })
  socket.on('recupereNbConnecter', function(){
    socket.emit('nbUtilisateurConnecter', {co: tabConnection.length})
    socket.broadcast.emit('nbUtilisateurConnecter', {co: tabConnection.length})

    
  })
  

  socket.on('chatBox', function(data){
    socket.emit('chatBoxRetourMoi', data)
    socket.broadcast.emit('chatBoxRetour', data)
  })

  socket.on("disconnect", function(){
    console.log('utilisateur deconnecter')
    tabConnection.pop();
    socket.broadcast.emit('nbUtilisateurConnecter', {co: tabConnection.length})
  })


})
  
 
server.listen(process.env.PORT || 5000);
