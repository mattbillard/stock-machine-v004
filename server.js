var express = require('express'),
    path = require('path');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev',
    app = express(),
    config = require('./server/config/config')[env];

require('./server/config/express')(app, config);
require('./server/routes/main')(app);
require('./server/config/errors')(app, config);

app.listen(config.port);
console.log('Listening on port ' + config.port + '...');
