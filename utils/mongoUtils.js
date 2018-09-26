const MongoClient = require('mongodb').MongoClient;
const config = require('../config/config');

var dbConnexion = {};

//Export will allow to use connectDbServer and getDb anywhere in application.
module.exports = {
  initDbServer: new Promise((resolve, reject) => {
    MongoClient.connect(config.mongoUrl, { useNewUrlParser: true }, (error, database) => {
      if (database) {
        database.db("todoFrame").addUser("todo", "password", {
          roles:  [{
            role : "readWrite",
            db   : "todoFrame"
          }]
        }).catch((err)=>{if(err.codeName == "DuplicateKey")resolve();});
      } else reject(error);
    });
  }),
  
  connectDbServer: new Promise((resolve, reject) => {
    MongoClient.connect(config.mongoUrl, { useNewUrlParser: true }, (error, database) => {
      if (database) {
        dbConnexion = database;
        resolve();
      } else reject(error);
    });
  }),

  getDb: () => dbConnexion
};
