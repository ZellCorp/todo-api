//init environment params
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const mongoUtil = require('./utils/mongoUtils');
var auth = require('./utils/auth');
const initServer = () => {
  //init server
  const authenticate = require('./controller/authenticate');
  const images = require('./controller/images');
  const items = require('./controller/items');
  const users = require('./controller/users');
  const errorHandler = require('./utils/errorHandler.js');
  var bodyParser = require("body-parser"); 
  
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(auth.checkUser);
  app.use('/auth',authenticate);
  app.use('/items', items);
  app.use('/images', images);
  app.use('/users', users);
  /*app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });*/
  app.use(errorHandler.genericError);

  app.listen(3000, () => {
    console.log("server up");
  })
}

//Connect to mongoDB then initialize the server (route, controller, ...).
//mongoUtil.connectDbServer.then(initServer).catch(error => console.log(error));

mongoUtil.initDbServer
.then(mongoUtil.connectDbServer)
.then(initServer);
