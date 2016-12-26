declare var angular: any;

angular.module('stockMachineApp').component('recentStockList', {
    bindings: {},
    templateUrl: '/scripts/stock-machine/components/recent-stock-list.html',
    controller: class {
        public StocksServ: any;

        constructor(StocksServ) {
            this.StocksServ = StocksServ;
        }
    }
});
