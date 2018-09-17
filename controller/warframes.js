
var express = require('express');
var router = express.Router();
const Items = require('warframe-items');

// define the about route
router.get('/warframes', function(req, res) {  
  const items = new Items({
    category:['Warframes']
  }, )
  res.send(items);
});

module.exports = router;

