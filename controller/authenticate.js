var express = require('express');
var router = express.Router();
const config = require('../config/config');
var mongoUtil = require('../utils/mongoUtils');
var jwt = require('jsonwebtoken');
const fs = require('fs');
var privateKEY  = fs.readFileSync('./config/private.key', 'utf8');

router.post('/create', function(req, res) {
    // find the user
    mongoUtil.getDb().db("todoFrame").collection("users").insertOne({
      name: req.body.name,
      password: req.body.password
    },(err)=>{
        if(err) throw err;
        res.json({
            success: true,
            message: 'Created enjoy your account!'
        });
    });
}),

router.post('/login', function(req, res) {
    // find the user
    mongoUtil.getDb().db("todoFrame").collection("users").findOne({
      name: req.body.login
    }, (err, user) => {
      if (err) throw err;
      if (!user) 
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      else if (user) {
          // check if password matches
          if (user.password != req.body.password) 
              res.json({ success: false, message: 'Authentication failed. Wrong password.' });
          else {
              // if user is found and password is right
              // create a token with only our given payload
              // we don't want to pass in the entire user since that has the password
              const payload = {
                  isLoged: true
              };
              var token = jwt.sign(payload, privateKEY, config.jwtSignOption);
              // return the information including token as JSON
              res.json({
                  success: true,
                  message: 'Enjoy your token!',
                  token: token
              });
          }
      }
    });
  });
  
//the logout page
router.post('/logout', function(req, res) {
    res.json({
        success: true,
        message: 'Enjoy your logout!'
    });
}),

module.exports = router;