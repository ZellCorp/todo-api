const express = require('express');
const app = express();
const cors = require('cors');
const images = require('./controller/images');
const items = require('./controller/items');
var db = require('./utils/mongoUtils');

app.use(cors());
app.use('/', items);
app.use('/images', images);

db.connect(()=>{
  app.listen(3000, () => {
    console.log(db.getDb())
  })
})
