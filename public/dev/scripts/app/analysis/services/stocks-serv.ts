declare var $: any;
declare var angular: any;

angular.module('stockMachineApp').service('StocksServ', class {
    private $http: any;
    private $log: any;
    private $rootScope: any;
    private $timeout: any;
    private stocksToAnalyze: any = [];

    public UtilsServ: any;
    public currStock: any;
    public stocksInput: string;
    public stockList = [];


    // PRIVATE

    constructor($http, $log, $rootScope, $timeout, UtilsServ) {
        this.$http  = $http;
        this.$log  = $log;
        this.$rootScope  = $rootScope;
        this.$timeout  = $timeout;
        this.UtilsServ  = UtilsServ;

        this.loadStocksFromLocalStorage();
        this.$rootScope.stockList = this.stockList;
        this.$rootScope.$watchCollection('stockList', () => {
            this.saveStocksToLocalStorage();
        });
    }

    addToStockList(stockObj) {
        let symbol = stockObj.symbol;
        this.stockList.unshift(stockObj);
        this.$log.log(symbol+' added to recent stocks');
    }

    analyzeOneStock(symbol) {
        this.$log.log('\nAnalyzing '+symbol);

        this.$http.get('api/stocks/from-database/'+symbol)
            .success((data) => {
                if (typeof data === 'string' && data.match(/error/gi)) {
                    this.$log.error(data);
                } else {
                    this.$log.log(symbol, data);
                    this.addToStockList(data);
                    this.loadFromStockList(0);
                }
            })
            .error(() => {
                this.$log.log('ERROR with stock: '+symbol, '\n');
            })
            .finally(() => {
                this.analyzeStocksArr();
            });

    }

    analyzeStocksArr() {
        this.stocksInput = this.stocksToAnalyze.join(', ');

        if (this.stocksToAnalyze.length >= 1) {
            this.analyzeOneStock( this.stocksToAnalyze.shift() );
        } else {
            this.$log.log('DONE analyzing all stocks.');
        }
    }

    loadStocksFromLocalStorage() {
        this.$log.log('Loading stocks form localStorage');
        if (localStorage['recentStocks']) {
            this.stockList = JSON.parse(localStorage['recentStocks']);
        }
    }

    saveStocksToLocalStorage() {
        this.$log.log('Saving stocks to localStorage\n\n');
        localStorage['recentStocks'] = JSON.stringify(angular.copy(this.stockList));
    }


    // PUBLIC

    analyzeStocks() {
        this.$log.log('Starting stock $ctrl...');
        let stockArr :any = this.stocksInput.toUpperCase().replace(/ /g, '').split(',');
        this.stocksToAnalyze = stockArr.filter((val) => { return val; });
        this.analyzeStocksArr();
    }

    deleteStock(index) {
        this.stockList.splice(index, 1);
        this.$timeout(() => {
            this.loadFromStockList(index);
        });
    }

    isBadStockMarket(stockMarket) {
        if (stockMarket) {
            return ( stockMarket.indexOf('OT') >= 0 );
        }
    }

    loadFromStockList(index) {
        let currStock = this.stockList[index];
        if (currStock) {
            this.currStock = currStock;

            this.$timeout(() => {
                let nthChild = index+1;
                let selector = '#recent-stock-list li:nth-child('+nthChild+') a:last';
                $(selector).focus();
            });
        }
    }

    percentageDiscountCssClass(stockObj) {
        let cssClass = '';
        if (stockObj && stockObj.calcs) {
            let percentageDiscount = stockObj.calcs.percentageDiscount;

            if (this.UtilsServ.isNum(percentageDiscount) === false) {
                cssClass = 'discount-not-numeric';
            } else if (percentageDiscount < 0) {
                cssClass = 'negative-discount';
            } else if (percentageDiscount < 20) {
                cssClass = 'some-discount';
            } else if (percentageDiscount < 50) {
                cssClass = 'great-discount';
            } else if (percentageDiscount >= 50) {
                cssClass = 'reached-mos';
            }

        }
        return cssClass;
    }

    redoCalcs(field, value) {
        this.$log.log('(Re)doing calcs');
        let currStock = this.currStock;

        //If not enough info, don't continue
        if (value === '' || currStock.size === 0) {
            return;
        }

        let data = {
            field: field,
            value: value,
            stockObj: currStock
        };

        this.$http({
            method: 'POST',
            url: '/api/stocks/redo-calcs/',
            data: data
        })
        .success((data, status, headers, config) => {
            let stockObj = data;
            this.currStock.calcs = stockObj.calcs;

        })
        .error((data, status, headers, config) => {
            this.$log.log('ERROR: RedoCalcs failed');
        });
    }
});
