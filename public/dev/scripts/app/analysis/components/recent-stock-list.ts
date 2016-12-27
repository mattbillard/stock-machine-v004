declare var angular: any;

angular.module('stockMachineApp').component('recentStockList', {
    bindings: {},
    templateUrl: 'scripts/app/analysis/components/recent-stock-list.html',
    controller: class {
        public StocksServ: any;

        constructor(StocksServ) {
            this.StocksServ = StocksServ;
        }
    }
});
