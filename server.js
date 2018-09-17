const express = require('express')
const app = express()

var warframes = require('./controller/warframes');
var primaries = require('./controller/primaries');
var secondaries = require('./controller/secondaries');

app.use('/warframes', warframes);
app.use('/primaries', primaries);
app.use('/secondaries', secondaries);

app.listen(3000, function () {
  console.log('server up')
})

