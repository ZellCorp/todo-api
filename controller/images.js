var express = require('express');
var router = express.Router();

router.get('/:uniqueName', function(req, res) {  
  res.sendFile("/\Users/Larbi Bougoufa/Documents/todo-api/node_modules/warframe-items/data/img/" 
  + req.params.uniqueName);
});

module.exports = router;

