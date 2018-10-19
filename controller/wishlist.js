var express = require('express');
var router = express.Router();
const Items = require('warframe-items');
var auth = require('../utils/auth');
var jwt = require('jsonwebtoken');

// define the about route
router.get('/', function(req, res, next) {
  const listItems = new Items({
    category:['All']
  })
  let userName = '';
  auth.checkToken(req)
  .then((tokenDecoded)=>userName = tokenDecoded.userName)
  .catch()

  let userName = req.params.user;
  let listWish;
  let result = [];
  mongoUtil.getDb().db("todoFrame").collection("wishList").findOne({
    userName: userName
  }, (error, wishlist) => {
    if (error) throw error;
    if (!wishlist)
        res.json({ success: false, message: 'Wishlist not found.' });
        listWish = wishlist;
  });

  listItems.forEach(element => {
      if(listWish.includes(element.uniqueName)){
        result.push(element);
      }
  });

  res.send(result);
});

router.post('/:id', function(req, res) {
    let userName;
    auth.checkToken.then((token)=>userName = token.userName)
    mongoUtil.getDb().db("todoFrame").collection("wishList").findOne({
      name: userName
    },(err, wishlist)=>{
        if(err) throw err;
        wishlist.uniqueNameList.push('req.params.id');
        res.json({
            success: true,
            message: 'added enjoy your wishlist!'
        });
    });
}),

module.exports = router;
