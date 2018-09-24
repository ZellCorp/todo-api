const MongoClient = require('mongodb').MongoClient

var database;
const mongoUrl = "mongodb://root:toor@37.187.11.132:27017";

module.exports = {
  connect: function( callback ) {
    MongoClient.connect( mongoUrl, {useNewUrlParser: true}, function( err, db ) {
      database = db;
    } );
  },

  getDb: function() {
    return _db;
  }
};