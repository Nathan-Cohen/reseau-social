exports.connectDB = function(req, res, next, cb){
  if(this.mongoClient && this.mongoClient.isConnected()){
      var instance = client.db(this.mongoClient);
      // cb(instance);
      console.log('Déjà connecter');
  }else{
      var MongoClient = require('mongodb').MongoClient;
      const url = "mongodb://heroku_g9jk10c8:81fdmoe6u00km5k3mokn3k5eg9@ds223763.mlab.com:23763/heroku_g9jk10c8";
      const dbName = 'heroku_g9jk10c8';
      MongoClient.connect(url, {useNewUrlParser: true}, function(err, client){
          this.mongoClient = client;
          if(err){
              res.status(404);
              next();
              return;
          }
      console.log('Connecter');            
          var instance = client.db(dbName);
          // cb(instance);
      })
  }
}