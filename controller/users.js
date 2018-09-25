const express = require('express');
const router = express.Router();
const mongoUtil = require('../utils/mongoUtils.js');
const db = mongoUtil.getDb();
const errorHandler = require('../utils/errorHandler.js');

router.get('/account', (req, res) => {
  db.collection.insertOne({
    'nickname': req.body.nickname,
  }).then(() =>
    res.status(201).json({
      message: 'Your nickname is: ' + req.body.nickname
    })
  ).catch((err) => errorHandler.customError({
    status: 500,
    error: err
  }, req, res));
});

module.exports = router;
