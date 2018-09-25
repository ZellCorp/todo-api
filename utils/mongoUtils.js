const MongoClient = require('mongodb').MongoClient;
var dbConnexion = {};

const mongoUrl = "mongodb://root:toor@37.187.11.132:27017";

//Export will allow to use connectDbServer and getDb anywhere in application.
module.exports = {
  connectDbServer: new Promise((resolve, reject) => {
    MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (error, database) => {
      if (database) {
        dbConnexion = database;
        resolve();
      } else reject(error);
    });
  }),

  getDb: () => dbConnexion
};
