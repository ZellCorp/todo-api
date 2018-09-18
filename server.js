const express = require('express')
const app = express()

var warframes = require('./controller/warframes');
var images = require('./controller/images');
var primaries = require('./controller/primaries');
var secondaries = require('./controller/secondaries');
//var melee = require('./controller/melee');
//var relics = require('./controller/relics');

app.use('/images', images);
app.use('/warframes', warframes);
app.use('/primaries', primaries);
app.use('/secondaries', secondaries);
//app.use('/melee', melee);
//app.use('/relics', relics);

app.listen(3000, function () {
  console.log('server up')
})

