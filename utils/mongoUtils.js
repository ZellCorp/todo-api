const MongoClient = require('mongodb').MongoClient;
const config = require('../config/config');

var dbConnexion = {};

//Export will allow to use connectDbServer and getDb anywhere in application.
module.exports = {
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
