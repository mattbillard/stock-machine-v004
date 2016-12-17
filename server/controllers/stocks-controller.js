var stocksModel = require('../models/stocks-model');

function getStockFromDb(req, res) {
    stocksModel.getStockFromDb(req.params.symbol, function(stock){
        res.json(stock);
    });
}

function redoCalcs(req, res) {
    res.json(req.body.stockObj);
}

function search(req, res) {
    //res.json(req.body.whereCond);
    stocksModel.search(req.body.whereCond, function(stocks){
        res.json(stocks);
    });
}

function automateNextStock(req, res) {
    stocksModel.automateNextStock(function(symbol){
        res.send(symbol);
    });
}

exports.getStockFromDb = getStockFromDb;
exports.redoCalcs = redoCalcs;
exports.search = search;
exports.automateNextStock = automateNextStock;
