//init environment params
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const mongoUtil = require('./utils/mongoUtils');

const initServer = () => {
  //init server
  const authenticate = require('./controller/authenticate');
  const images = require('./controller/images');
  const items = require('./controller/items');
  const users = require('./controller/users');
  const errorHandler = require('./utils/errorHandler.js');
  const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
  
  app.use(cors());
  app.use('authenticate',authenticate);
  app.use('/', items);
  app.use('/images', images);
  app.use('/users', users);
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
  app.use(errorHandler.genericError);

  app.listen(3000, () => {
    console.log("server up");
  })
  
  console.log(mongoUtil.getDb().db())
}

//Connect to mongoDB then initialize the server (route, controller, ...).
mongoUtil.connectDbServer.then(initServer).catch(error => console.log(error));
