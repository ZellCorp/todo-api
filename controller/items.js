
var express = require('express');
var router = express.Router();
const Items = require('warframe-items');
var auth = require('../utils/auth');

// define the about route
router.get('/:category', function(req, res) {
  auth.checkToken(req)
  .then(()=>{
    const items = new Items({
      category:[req.params.category]
    })
    res.send(items);
  })
  .catch((error)=>console.log(error));
});

module.exports = router;
