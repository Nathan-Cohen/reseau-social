
var MongoClient = require('mongodb').MongoClient
// var url = 'mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8';

var state = {
  db: null,
};

exports.connect = function(url, done) {
  if (state.db) {
    return done();
  }

  MongoClient.connect('mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8', {useNewUrlParser: true}, function(err, db) {
    if (err) {
      return done(err);
    }
    state.db = db;
    done();
  });
};

exports.get = function() {
  return state.db;
};

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null;
      state.mode = null;
      if (err) {
        done(err);
      }
    });
  };
};

/* Dans le fichier index.js où nous gérons les différentes routes, nous faison un require du fichier db.js.
Pour chaque route, nous débutons par le code suivant :
db.connect('ADRESSE DE LA BDD', function(err) {

et nous terminons en coupant la connexion :
db.close();


/*********************************
*************Exercice*************
*********************************/
/*
Reprenez l'exercice précédent. Prévoyez deux routes. Dans chacune, vous vous connectez à la BDD et vous fermez la connection à la fin.
*/