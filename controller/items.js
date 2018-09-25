
var express = require('express');
var router = express.Router();
const Items = require('warframe-items');

// define the about route
router.get('/:category', function(req, res) {  
  const items = new Items({
    category:[req.params.category]
  })
  res.send(items);
});

module.exports = router;
