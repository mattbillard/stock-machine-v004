var express = require('express'),
    path = require('path');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev',
    app = express(),
    config = require('./server/config/config')[env];

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);

require('./server/routes/core-routes')(app);
require('./server/routes/stocks-routes')(app);

require('./server/config/errors')(app, config);

app.listen(config.port);
console.log('\nListening on port ' + config.port + '...');
