const express = require('express')
const mongo = require('mongodb').MongoClient;
const path = require('path')
var bodyParser = require('body-parser')
var md5 = require('md5')
var ObjectID = require('mongodb').ObjectID
// recupere les variables d'environnement pour le local
// require('dotenv').config();
// console.log('test recuperation des variables environnement', process.env.NODE_ENV)
//////////ENVOIE MAIL//////////
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
var envoiDuMail = function(mail, sujet, text, html){
  const msg = {
    to: mail,
    from: 'manathane.co@gmail.com',
    subject: sujet,
    text: text,
    html: html,
  };
  sgMail.send(msg);
  console.log('envoie du mail effectuer', mail, sujet, text, html)
}


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
              
              //////////ENVOIE MAIL//////////
              var sujet = '[Socialead] Bienvenue ' + req.body.prenom;
              var text = 'Vous êtes inscrit sur Socialead';
              var html = '<strong>Vous êtes inscrit sur Socialead</strong>';
              envoiDuMail(req.body.mail, sujet, text, html)
              //////////FIN ENVOIE MAIL//////////

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
          console.log('Echec de connexion', err.message);
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


////////MISE A JOUR DU PROFIL///////
// recupere les donnees de la connection pour verifier dans la BDD
app.post('/miseAJourProfil', function(req, res) {
  //////////////// CONNEXION A LA BASE ///////////////////
  var url = 'mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8'
  mongo.connect(url, {useNewUrlParser: true}, function(err, client) {
    if(err){
      console.log('err', err)
    }
    else{
      const collection = client.db('heroku_g9jk10c8').collection('utilisateur');
      // si il m'existe pas on l'insert
      collection.updateOne({'_id': ObjectID(req.body.idEnCour)}, {$set: {nom: req.body.nom, prenom: req.body.prenom, mail: req.body.mail, genre: req.body.genre, age: req.body.age, ville: req.body.ville, pays: req.body.pays, presentation: req.body.presentation, website: req.body.website}}, function(err, o) {
        if(err){
          console.log(err.message);
          res.send({message: 'Erreur'});
          client.close();
        }
        else{
          // console.log("mise a jours reussi");
          res.send({message: 'mise a jours reussi'});  
          client.close(); 

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
          console.log('Echec de la recuperation de la recherche', err.message);
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



// BAR DE RECHERCHE DES AMIS
// recupere les donnees de la connection pour verifier dans la BDD
app.post('/searchami', function(req, res) {
  var tabListesearchDeAmis = []
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
      // console.log('req.body searhc ami', req.body)
      collection.find({'_id': ObjectID(req.body.idEnCour)}).toArray(function(err, o) {
        if(err){
          console.log('Echec de la recuperation de la liste d\'ami', err.message);
        }else{
          if(o){
            if(o[0]){
              // si il n'a pas encore d'ami
              if(o[0].ami.length == 0){
                res.send({message: '0'});
                client.close();
              }
              else{                
                // boucle sur le nombre d'ami
                var compteurSearchAmi = 0
                for(var i=0; i<o[0].ami.length; i++){
                  compteurSearchAmi++
                  collection.findOne({'_id': ObjectID(o[0].ami[i])}, function(err, o) {
                    if(err){
                      console.log('Echec de la recuperation de la recherche d\'ami', err.message);
                    }else{
                        // on met le resultat dans le tableau seulement si il contient le charactere dans le nom ou le prenom
                        var position = o.nom.indexOf(search);
                        if(position >= 0){
                          tabListesearchDeAmis.push(o)
                        }
                    }
                      // si le tableau a bien ete construit on envoie les données
                      compteurSearchAmi--
                      if(!compteurSearchAmi){
                        res.send({listeSearchAmi: tabListesearchDeAmis}); 

                      }
                  });
                  
                }
              }

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
          console.log('Echec de la recuperation du profil', err.message);
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
      collection.find({'_id': ObjectID(req.body.id)}, {$maxTimeMS: 100}).toArray(function(err, o) {
        if(err){
          console.log('Echec de la recuperation du profil', err.message);
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



/////// ACUTALITER ACCUEIL ////////
// recupere les donnees de la connection pour verifier dans la BDD
app.post('/accueilactualiter', function(req, res) {
  // console.log('accueilactualiter req body', req.body)
  //////////////// CONNEXION A LA BASE ///////////////////
  var url = 'mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8'
  mongo.connect(url, {useNewUrlParser: true}, function(err, client) {
    if(err){
      console.log('err', err)
    }
    else{
      const collection = client.db('heroku_g9jk10c8').collection('publication');
      // cherche si l'utilisateur existe dans les publications ou dans les commentaires des publications
      collection.find({$or:[ {"idProfil":req.body.idEnCour}, {"idPublication":req.body.idEnCour}]}, {$maxTimeMS: 100}).toArray(function(err, o) {
        if(err){
          console.log('Echec de la recuperation des publication', err.message);
        }else{
          // console.log('accueilactualiter', o)
          res.send({accueilactualiter: o});
        }

      });
  
    }
  });
  
});

// actualise le nombre de publication dans l'accueil pour les utilisateurs non connecter
// recupere les donnees de la connection pour verifier dans la BDD
app.post('/nbpublicationaccueil', function(req, res) {
  //////////////// CONNEXION A LA BASE ///////////////////
  var url = 'mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8'
  mongo.connect(url, {useNewUrlParser: true}, function(err, client) {
    if(err){
      console.log('err', err)
    }
    else{
      const collection = client.db('heroku_g9jk10c8').collection('publication');
      // cherche si l'utilisateur existe dans les publications ou dans les commentaires des publications
      collection.find().toArray(function(err, o) {
        if(err){
          console.log('Echec de la recuperation du nombre de publication', err.message);
        }else{
          res.send({nbpublicationaccueil: o.length});
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
          console.log('Echec de la demande d\'ami', err.message);
        }else{
          if(o){
            console.log('Notification envoyer');
            res.send({profilUtilisateur: o});
            client.close();

            //////////ENVOIE MAIL//////////
            var sujet = '[Socialead] Nouvel demande ami ! ';
            var text = 'Vous avez une demande d\'ami sur Socialead';
            var html = '<strong>Vous avez une demande d\'ami sur Socialead</strong>';
            envoiDuMail(req.body.mail, sujet, text, html)
            //////////FIN ENVOIE MAIL//////////

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
          console.log('Echec de la recherche du membre', err.message);
        }else{
          if(o[0]){
            if(o[0].demandeAjoutAmi){
              // si il n'a pas encore de demande d'ami
              if(o[0].demandeAjoutAmi.length == 0){
                res.send({notificationAmi: tabDesDemandes});                
              }
              for(var i=0; i<o[0].demandeAjoutAmi.length; i++){
                collection.find({'_id': ObjectID(o[0].demandeAjoutAmi[i])}, {$maxTimeMS: 100}).toArray(function(err, o) {
                  if(err){
                    console.log('Echec de la recherche d\'ajout d\'ami', err.message);
                  }else{
                    if(o){
                      tabDesDemandes.push(o[0])
                      if(i == tabDesDemandes.length){
                        booleanDemande = true;

                      }
                      client.close();
          
                    }
                    else{
                      res.send({message: 'Erreur'});
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

            }else{
              res.send({message: '0'});              
            }
          }
          else{
            res.send({message: 'Erreur'});
          }

        }

      });
  
    }
  });
  
});
  





// LISTE AMI
// recupere les donnees de la connection pour verifier dans la BDD
app.post('/listeami', function(req, res) {
  var tabListeDeAmisNonTrier = []
  //////////////// CONNEXION A LA BASE ///////////////////
  var url = 'mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8'
  mongo.connect(url, {useNewUrlParser: true}, function(err, client) {
    if(err){
      console.log('err', err)
    }
    else{
      const collection = client.db('heroku_g9jk10c8').collection('utilisateur');
      // cherche si l'utilisateur existe
      collection.find({'_id': ObjectID(req.body.id)}, {$maxTimeMS: 100}).toArray(function(err, o) {
        if(err){
          console.log('Echec de la recuperation de la liste d\'ami', err.message);
        }else{
          if(o[0]){
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
                  collection.findOne({'_id': ObjectID(o[0].ami[i])}, {$maxTimeMS: 100}, function(err, o) {
                    if(err){
                      console.log('Echec de la recuperation des amis', err.message);
                    }else{
                        tabListeDeAmisNonTrier.push(o)
                    }
                      // si le tableau a bien ete construit on envoie les données
                      compteurAmi--
                      if(!compteurAmi){
                        // function pour trier le resultat par nom
                        function tri(a,b){
                          return (a.nom > b.nom)?1:-1;
                        }
                        tabListeDeAmis = tabListeDeAmisNonTrier.sort(tri);
                        // envoie le resultat trier
                        res.send({listeAmi: tabListeDeAmis}); 

                      }
                  });
                  
                }
              }

            }
            else{
              res.send({message: '0'});
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
      const collection = client.db('heroku_g9jk10c8').collection('utilisateur');
      // si l'utilisateur accepte l'invitation on met a jour les deux compte en les ajoutant mutuellement dans les amis
      if(req.body.reponse == "accepter"){
        // met a jour la liste d'ami de la personne qui recoit la demande
        collection.updateOne({'_id': ObjectID(req.body.id)}, {$push: {ami: req.body.idDemande}}, function(err, o) {
          if(err){
            console.log('Echec de la reponse accepter du membre qui recoit', err.message);
          }else{
            if(o){
              console.log('Ajout a la liste reussi ami du receveur');
              // met a jour la liste d'ami de la personne qui envoie la demande
              collection.updateOne({'_id': ObjectID(req.body.idDemande)}, {$push: {ami: req.body.id}}, function(err, o) {
                if(err){
                  console.log('Echec de la reponse accepter du membre qui demande', err.message);
                }else{
                  if(o){
                    // supprime la demande dans la liste des demandes d'ami
                    collection.updateOne({'_id': ObjectID(req.body.id)}, {$pull: {demandeAjoutAmi: req.body.idDemande}})
                    console.log('Ajout a la liste reussi du demandeur');
                    res.send({profilUtilisateur: o});
        
                  }
                  else{
                    console.log('Erreur de connexion');
                    res.send({message: 'Erreur de connexion'});
                  }
        
                }
        
              });
  
            }
            else{
              console.log('Erreur de connexion');
              res.send({message: 'Erreur de connexion'});
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
            console.log('Echec de la supression d\'un ami', err.message);
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


/////////////RECOMMANDATION AMI/////////////////
// recupere les donnees de la connection pour verifier dans la BDD
app.post('/recommandationami', function(req, res) {
  //////////////// CONNEXION A LA BASE ///////////////////
  var url = 'mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8'
  mongo.connect(url, {useNewUrlParser: true}, function(err, client) {
    if(err){
      console.log('err', err)
    }
    else{
      const collection = client.db('heroku_g9jk10c8').collection('utilisateur');
      // console.log('recommandation', req.body)
        //  ajouter comme recommandation d'ami
        collection.updateOne({'_id': ObjectID(req.body.idRecommanderSelectionner)}, {$push: {recommandationAmi: {idQuiARecommander: req.body.idEnCour, nomQuiARecommander: req.body.nomEnCour, prenomQuiARecommander: req.body.prenomEnCour, idRecommander: req.body.idRecommander, nomRecommander: req.body.nomRecommander, prenomRecommander: req.body.prenomRecommander, mailRecommander: req.body.mailRecommander}}}, function(err, o) {
          if(err){
            console.log('Echec de l\'envoie de la recommandation d\'ami', err.message);
          }else{
            if(o){
              console.log('recommandation reussi');              
              res.send({message: 'recommandation reussi'});
  
              //////////ENVOIE MAIL//////////
              var mail = req.body.mailRecommanderSelectionner;
              var sujet = '[Socialead] Nouvel recommandation d\'ami ! ';
              var text = 'Vous avez une nouvel recommandation d\'ami sur Socialead';
              var html = '<strong>Vous avez une nouvel recommandation d\'ami sur Socialead</strong>';
              envoiDuMail(mail, sujet, text, html)
              //////////FIN ENVOIE MAIL//////////
            }
            else{
              res.send({message: 'Erreur'});
            }
  
          }
  
        });
          
    }
  });
  
});


// liste des recommandations d'amis
// recupere les donnees de la connection pour verifier dans la BDD
app.post('/listerecommandationami', function(req, res) {
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
          console.log('Echec de la recuperation des recommandations d\'amis', err.message);
        }else{
          if(o[0]){
            if(o[0].recommandationAmi){
              res.send({listeDesRecommandationsAmis: o[0].recommandationAmi});
  
            }
            else{
              res.send({message: 'pas de recommandation'});
  
            }

          }
        }

      });
  
    }
  });
  
});



// Supprime la recommandations d'amis
// recupere les donnees de la connection pour verifier dans la BDD
app.post('/supprimerecommandation', function(req, res) {
  //////////////// CONNEXION A LA BASE ///////////////////
  var url = 'mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8'
  mongo.connect(url, {useNewUrlParser: true}, function(err, client) {
    if(err){
      console.log('err', err)
    }
    else{
      const collection = client.db('heroku_g9jk10c8').collection('utilisateur');
      console.log('suppression de la recommandation', req.body)
      // cherche si l'utilisateur existe
      collection.update({'_id': ObjectID(req.body.idEnCour)}, {$pull: {recommandationAmi: {idRecommander: req.body.id}}}, function(err, o) {
        if(err){
          console.log('suppression de la recommandation d\'ami echouer', err.message);
        }else{
          console.log('suppression reussi');
          
          // res.send({listeDesRecommandationsAmis: o[0].recommandationAmi});
        }

      });
  
    }
  });
  
});



///////////VERIFIE SI L'UTILISATEUR PEUT PUBLIER///////////
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
          console.log('Echec de la recherche de membre avec autorisation de publier', err.message);
        }else{
          if(o[0].ami){
            for(var j=0; j<o[0].ami.length; j++){
              if(o[0].ami[j] == req.body.id){
                res.send({message: 'autoriser'});
              }
            }

          }
        }

      });
  
    }
  });
  
});


////////////// PUBLICATION ///////////////
// quand un membre publie sur le profil d'un autre membre
app.post('/publicationProfil', function(req, res) {
  //////////////// CONNEXION A LA BASE ///////////////////
  var url = 'mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8'
  mongo.connect(url, {useNewUrlParser: true}, function(err, client) {
    if(err){
      console.log('err', err)
    }
    else{
      var tab_mois=new Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre");
      var d = new Date()
      var date = d.getDate() + ' ' + tab_mois[d.getMonth()] + ' ' + d.getHours() + ' heures ' + d.getMinutes() + ' minutes';
      const collection = client.db('heroku_g9jk10c8').collection('publication');
      // si il m'existe pas on l'insert
      collection.insertOne({idProfil: req.body.idEnCour, idPublication: req.body.id, publication: req.body.messagepublication, nomAuteur: req.body.nom, prenomAuteur: req.body.prenom, date: date}, function(err, o) {
        if(err){
          console.log(err.message);
          res.send({message: 'Erreur'});
          client.close();
        }
        else{
          res.send({message: 'Publier'});
          client.close();                        

          //////////ENVOIE MAIL//////////
          var sujet = '[Socialead] Nouvel publication profil ';
          var text = 'Une nouvel publication sur votre profil';
          var html = '<strong>Une nouvel publication sur votre profil</strong>';
          // envoiDuMail(req.body.idEnCour, sujet, text, html)
          //////////FIN ENVOIE MAIL//////////
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
          console.log('Echec de la recuperation des pubilcations', err.message);
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
            console.log('Echec de suppression de la publication', err.message);
          }else{
            if(o){
              res.send({message: 'suppression'});
  
            }
            else{
              console.log('Erreur il n\'y a pas de publication');
              res.send({message: 'Erreur'});
            }
  
          }
  
        });
          
    }
  });
  
});



// COMMENTAIRE
app.post('/ajoutcommentaire', function(req, res) {
  //////////////// CONNEXION A LA BASE ///////////////////
  var url = 'mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8'
  mongo.connect(url, {useNewUrlParser: true}, function(err, client) {
    if(err){
      console.log('err', err)
    }
    else{
      var tab_mois=new Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre");
      var d = new Date()
      var date = d.getDate() + ' ' + tab_mois[d.getMonth()] + ' ' + d.getHours() + ' heures ' + d.getMinutes() + ' minutes';
      idUniqueCommentaire = ObjectID()
      const collection = client.db('heroku_g9jk10c8').collection('publication');
      collection.updateOne({'_id': ObjectID(req.body.idDeLaPublication)}, {$push: {'idCommentateur': {idUniqueCommentaire: idUniqueCommentaire, id: req.body.id, commentaire: req.body.commentaire, prenom: req.body.prenom, nom: req.body.nom, date: date}}}, function(err, o) {
        if(err){
          console.log('Echec de la publication du commentaire', err.message);
        }else{
          res.send({message: 'Commentaire ajouter'});          
        }
      });
    }
  });
  
});


// SUPRIMER UN COMMENTAIRE
// recupere les donnees de la connection pour verifier dans la BDD
app.post('/supprimecommentaire', function(req, res) {
  console.log('SUPPRIME COMMENTAIRE', req.body)
  //////////////// CONNEXION A LA BASE ///////////////////
  var url = 'mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8'
  mongo.connect(url, {useNewUrlParser: true}, function(err, client) {
    if(err){
      console.log('err', err)
    }
    else{
      const collection = client.db('heroku_g9jk10c8').collection('publication');
        // supprime le commentaire
      collection.updateOne({'_id': ObjectID(req.body.idPublication)}, {$pull: {'idCommentateur': {idUniqueCommentaire: ObjectID(req.body.idUniqueCommentaire)}}}, function(err, o) {
        if(err){
          console.log('Echec de la suppression du commentaire', err.message);
        }else{
          if(o){
            console.log('Suppresion reussi');
            res.send({message: 'suppression'});

          }
          else{
            console.log('Erreur de connexion');
            res.send({message: 'Erreur de connexion'});
          }

        }

      });
          
    }
  });
  
});



////////////// MESSAGE Instantanner ///////////////
app.post('/envoiedemandemessageinstantanner', function(req, res) {
  //////////////// CONNEXION A LA BASE ///////////////////
  var url = 'mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8'
  mongo.connect(url, {useNewUrlParser: true}, function(err, client) {
    if(err){
      console.log('err', err)
    }
    else{
      const collection = client.db('heroku_g9jk10c8').collection('utilisateur');
      // ajoute la demande dans le document de l'ami
      collection.updateOne({'_id': ObjectID(req.body.idAmi)}, {$push: {messageInstantanner: {idAmi: req.body.idEnCour, demande: req.body.demandeMessage, prenom: req.body.prenomMessageInstantanner, nom: req.body.nomMessageInstantanner}}}, function(err, o) {
        if(err){
          console.log('Echec de la publication de message instantanner', err.message);
        }else{
          if(o){
            // ajoute la demande de message dans le document de l'utilisateur en cours
            collection.updateOne({'_id': ObjectID(req.body.idEnCour)}, {$push: {messageInstantanner: {idAmi: req.body.idAmi, demande: "demandeur"}}})

            console.log('demande message Instantanner envoyer');
            res.send({message: 'ok'});
            client.close();

          }
          else{
            res.send({message: 'Erreur'});
            client.close();

          }

        }
      })
  
    }
  });
  
});



app.post('/envoiereponsedemandemessageinstantanner', function(req, res) {
  //////////////// CONNEXION A LA BASE ///////////////////
  var url = 'mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8'
  mongo.connect(url, {useNewUrlParser: true}, function(err, client) {
    if(err){
      console.log('err', err)
    }
    else{
      const collection = client.db('heroku_g9jk10c8').collection('utilisateur');
      // ajoute la mention 'accepter' dans le document de l'ami
      collection.updateOne({'_id': ObjectID(req.body.idAmi), "messageInstantanner.idAmi": req.body.idEnCour, "messageInstantanner.demande": 'demandeur'}, {$set: {"messageInstantanner.$.demande": 'accepter'}}, function(err, o) {
        if(err){
          console.log('Echec de la reponse a la demande de message instantanner', err.message);
        }else{
          if(o){
            // ajoute la mention 'accepter' dans le document de l'utilisateur
            collection.updateOne({'_id': ObjectID(req.body.idEnCour), "messageInstantanner.idAmi": req.body.idAmi, "messageInstantanner.demande": 'en cours'}, {$set: {"messageInstantanner.$.demande": 'accepter'}})
            console.log('demande message Instantanner envoyer', req.body);
            res.send({message: 'ok'});
            client.close();

            // //////////ENVOIE MAIL//////////
            // var sujet = '[Socialead] Conversation instantanné';
            // var text = 'Vous avez confirmer la conversation instantanné';
            // var html = '<strong>Vous avez confirmer la conversation instantanné</strong>';
            // envoiDuMail(req.body.mail, sujet, text, html)
            // //////////FIN ENVOIE MAIL//////////

          }
          else{
            res.send({message: 'Erreur'});
            client.close();

          }

        }
      })
  
    }
  });
  
});




app.post('/envoiemessageinstantanner', function(req, res) {
  //////////////// CONNEXION A LA BASE ///////////////////
  var url = 'mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8'
  mongo.connect(url, {useNewUrlParser: true}, function(err, client) {
    if(err){
      console.log('err', err)
    }
    else{
      var tab_mois=new Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre");
      var d = new Date()
      var date = d.getDate() + ' ' + tab_mois[d.getMonth()] + ' ' + d.getHours() + ' heures ' + d.getMinutes() + ' minutes';
      const collection = client.db('heroku_g9jk10c8').collection('utilisateur');
      // ajoute le message dans le document de l'ami
      collection.updateOne({'_id': ObjectID(req.body.idAmi)}, {$push: {messageInstantanner: {idAmi: req.body.idEnCour, messageInstantanner: req.body.messageInstantanner, prenom: req.body.prenomMessageInstantanner, nom: req.body.nomMessageInstantanner, date: date, vu: 'faux'}}}, function(err, o) {
        if(err){
          console.log('Echec de l\'envoie du message instantanner', err.message);
        }else{
          if(o){
            console.log('message Instantanner envoyer');
            // ajoute le message dans le document de l'utilisateur en cours
            collection.updateOne({'_id': ObjectID(req.body.idEnCour)}, {$push: {messageInstantanner: {idAmi: req.body.idAmi, messageInstantanner: req.body.messageInstantanner, prenom: req.body.prenomMessageInstantanner, nom: req.body.nomMessageInstantanner, date: date}}})
            res.send({message: 'ok'});
            client.close();

          }
          else{
            res.send({message: 'Erreur'});
            client.close();

          }

        }
      })
  
    }
  });
  
});


// recupere les donnees de la connection pour verifier dans la BDD
app.post('/affichemessageinstantanner', function(req, res) {
  var tabListeMessageInstantanner = []
  //////////////// CONNEXION A LA BASE ///////////////////
  var url = 'mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8'
  mongo.connect(url, {useNewUrlParser: true}, function(err, client) {
    if(err){
      console.log('err', err)
    }
    else{
      const collection = client.db('heroku_g9jk10c8').collection('utilisateur');
      // cherche les messages Instantanner
      collection.find({'_id': ObjectID(req.body.idEnCour)}, {'messageInstantanner.$.idAmi': req.body.idAmi}).toArray(function(err, o) {
        if(err){
          console.log('Echec de la recuperation des messages instantanner', err.message);
        }else{
            if(o[0]){
              // si il y a deja eu des message
              if(o[0].messageInstantanner){
                collection.updateOne({'_id': ObjectID(req.body.idEnCour), 'messageInstantanner.idAmi': req.body.idAmi}, {$set: {'messageInstantanner.$[].vu': 'vrais'}})
                // boucle sur le tableau des messages Instantanner pour trouver les messages correspondant au deux ami et les mettre dans le tableau avant l'envoie
                o[0].messageInstantanner.forEach(function(elem){
                    if(elem.idAmi == req.body.idAmi){
                      tabListeMessageInstantanner.push(elem)
                    }
                    
                  })
                // si il y a des messages on envoie la liste
                if(tabListeMessageInstantanner.length > 0){
                  // envoie la liste des message Instantanner
                  res.send({listeMessageInstantanner: tabListeMessageInstantanner});
                }
                // sinon on envoie un message
                else{
                  res.send({message: 'pas de message'});
                }
                
              }
              // sinon il n'y a eu encore aucun message
              else{
                res.send({message: 'pas de message'});

              }
              
            }
            else{
              res.send({message: 'pas de message'});
            }
        }

      });
  
    }
  });
  
});



app.post('/affichenotifmessageinstantanner', function(req, res) {
  //////////////// CONNEXION A LA BASE ///////////////////
  var url = 'mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8'
  mongo.connect(url, {useNewUrlParser: true}, function(err, client) {
    if(err){
      console.log('err', err)
    }
    else{
      const collection = client.db('heroku_g9jk10c8').collection('utilisateur');
      // cherche les messages Instantanner
      // console.log('recherche liste message Instantanner', req.body)
      collection.find({'_id': ObjectID(req.body.idEnCour)}).toArray(function(err, o) {
        if(err){
          console.log('Echec de la recuperation des notifcation de messages instantanner', err.message);
        }else{
            if(o[0]){
              // envoie la liste des message Instantanner
              res.send({listeMessageInstantanner: o[0].messageInstantanner});

            }
            else{
              res.send({message: 'pas de message'});
            }
        }

      });
  
    }
  });
  
});


/////////////////MESSAGE PRIVER//////////////
app.post('/creationConversationPriver', function(req, res) {
  //////////////// CONNEXION A LA BASE ///////////////////
  var url = 'mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8'
  mongo.connect(url, {useNewUrlParser: true}, function(err, client) {
    if(err){
      console.log('err', err)
    }
    else{
      // console.log('req.body.tabDesMembres ', req.body.tabDesMembres)
      // console.log('req.body.sujet ', req.body.sujet)
        const collection = client.db('heroku_g9jk10c8').collection('conversationpriver');
        // creer la conversation priver
        collection.insertOne({tableauDesMembres: req.body.tabDesMembres, sujet: req.body.sujet}, {$maxTimeMS: 100}, function(err, o) {
          if(err){
            console.log(err.message);
            res.send({message: 'Erreur'});
            client.close();
          }
          else{
            console.log('conversation creer');
            res.send({message: 'Conversation creer'});  
            client.close(); 

          }
        });

    }
  });

});


app.post('/afficheConversationPriver', function(req, res) {
  //////////////// CONNEXION A LA BASE ///////////////////
  var url = 'mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8'
  mongo.connect(url, {useNewUrlParser: true}, function(err, client) {
    if(err){
      console.log('err', err)
    }
    else{
      const collection = client.db('heroku_g9jk10c8').collection('conversationpriver');
      // cherche les conversations priver
      collection.find({'tableauDesMembres.id': req.body.idEnCour}, {$maxTimeMS: 100}).toArray(function(err, o) {
        if(err){
          console.log('Echec de la recuperation des notifcation de messages instantanner', err.message);
        }else{
            if(o[0]){
              // envoie la liste des conversations priver
              // console.log('tessssssssssst', o[0])
              res.send({listeConversationPriver: o});
              

            }
            else{
              res.send({message: 'pas de message'});
            }
        }

      });
  
    }
  });
  
});



app.post('/envoieMessagePriver', function(req, res) {
  //////////////// CONNEXION A LA BASE ///////////////////
  var url = 'mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8'
  mongo.connect(url, {useNewUrlParser: true}, function(err, client) {
    if(err){
      console.log('err', err)
    }
    else{
      console.log('req.body', req.body)
      const collection = client.db('heroku_g9jk10c8').collection('conversationpriver');
      // ajoute la demande dans le document de l'ami
      collection.updateOne({'_id': ObjectID(req.body.idConversationPriver)}, {$push: {messagePriver: {idConversationPriver: req.body.idConversationPriver, idExpediteur: req.body.idEnCour, prenom: req.body.prenomMessagePriver, nom: req.body.nomMessagePriver, messagePriver: req.body.messagePriver}}}, {$maxTimeMS: 100}, function(err, o) {
        if(err){
          console.log('Echec de la publication de message Priver', err.message);
        }else{
          if(o){
            console.log('demande message Priver envoyer');
            res.send({message: 'ok'});
            client.close();

          }
          else{
            res.send({message: 'Erreur'});
            client.close();

          }

        }
      })
  
    }
  });
  
});




//////////////// SOCKET IO /////////////
var socketIO = require('socket.io');
var io = socketIO(server);
var tabConnection = [];

///// ROUTE SOCKET////
io.on('connection', function(socket){
  // a la connexion de l'utilisateur on ajoute dans le tableau
  socket.on('connexion', function(data){
    tabConnection.push(socket)

  })

  socket.on('recupereNbConnecter', function(){
    io.emit('nbUtilisateurConnecter', {co: tabConnection.length})
  })
  

  // socket.on("disconnect", function(){
  //   console.log('utilisateur deconnecter')
  //   // tabConnection.pop();
  //   // socket.broadcast.emit('nbUtilisateurConnecter', {co: tabConnection.length})
  // })


})
  
 
server.listen(process.env.PORT || 27017);
