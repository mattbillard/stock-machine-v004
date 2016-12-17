
var stocksCtrl = require('../controllers/stocks-controller');


module.exports = function(app) {
    app.get('/api/stocks/from-database/:symbol', stocksCtrl.getStockFromDb);
    app.post('/api/stocks/redo-calcs', stocksCtrl.redoCalcs);
    app.post('/api/stocks/search', stocksCtrl.search);
    app.get('/api/stocks/automate', stocksCtrl.automateNextStock);
};
