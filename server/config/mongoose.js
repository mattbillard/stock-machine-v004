var mongoose = require('mongoose'),
    stocksModel = require('../models/stocks-model');

module.exports = function (config) {
    mongoose.connect(config.db);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Could not connect to DB'));
    db.once('open', function callback() { console.log('Connect to StockMachine DB'); });
    
    stocksModel.createDefaultStockData();
};

