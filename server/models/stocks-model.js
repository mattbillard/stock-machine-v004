
var mongoose = require('mongoose');

var stockSchema = mongoose.Schema({
    name: {
        type: String
        //required: '{PATH} is required!'
    },
    stockMarket: {
        type: String
        //required: '{PATH} is required!'
    },
    symbol: {
        type: String
        //required: '{PATH} is required!',
        //unique:true
    },
    dateAutomated: {
        type : Date,
        default: function() { return new Date(2014,0,1, 0,0,0,0); }
    }
});
var Stock = mongoose.model('Stock', stockSchema);



function createDefaultStockData() {
    Stock.find({}).exec(function(err, collection) {
        if (collection.length === 0) {
            console.log('Creating default stock data');

            var stocksData = require('../../data/stocksData.json');
            Stock.collection.insert(stocksData, function (err, docs) {
                if (err) {
                    console.error('Error insert default stock data', err)
                } else {
                    console.info('Default stock data created successfully');
                }
            });
        }
    });
}

function getStockFromDb(symbol, callback) {
    Stock.findOne({symbol:symbol}).exec(function(err, stock) {
        callback(stock);
    });
}

function search(whereCond, callback) {
    Stock.find(whereCond, {}, {
            limit: 999
        },
        function(err, stocks) {
            callback(stocks);
        }
    );
}

function automateNextStock(callback) {
    Stock.find({}, {
            _id: 1,
            symbol: 1,
            dateAutomated: 1
        }, {
            limit: 1,
            sort: {
                dateAutomated: 1
            }
        },
        function(err, stocks) {
            var stock = stocks[0];
            stock.dateAutomated = Date.now();
            stock.save(function(err, updatedStock) {
                callback(updatedStock.symbol);
            });
        }
    );
}



module.exports.createDefaultStockData = createDefaultStockData;
module.exports.getStockFromDb = getStockFromDb;
module.exports.search = search;
module.exports.automateNextStock = automateNextStock;
