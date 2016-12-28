declare var angular: any;

//Analysis page
angular.module('stockMachineApp').component('analysis', {
    bindings: {},
    templateUrl: 'scripts/app/analysis/views/analysis.html',
    controller: class {
        private $uibModal: any;

        public StocksServ: any;
        public externalUrls: any = {
            'yahooCharts': function(symbol) {
                return 'http://finance.yahoo.com/echarts?s='+ symbol;
            },
            'yahooNews': function(symbol) {
                return 'http://finance.yahoo.com/q/h?s='+ symbol +'+Headlines';
            }
        };


        // PRIVATE

        constructor($uibModal, StocksServ) {
            this.$uibModal = $uibModal;
            this.StocksServ = StocksServ;
        }


        // PUBLIC

        public openExternalUrl(command) {
            let url;
            let symbol = this.StocksServ.currStock.symbol;

            if (symbol) {
                url =
                    (typeof this.externalUrls[command] === 'function') ? this.externalUrls[command](symbol) :
                    (typeof this.externalUrls) ? this.externalUrls[command]+symbol :
                    null;

                if (url) {
                    window.open(url);
                }
            }
        }

        public openRecentStockListModal() {
            this.$uibModal.open({
                animation: true,
                component: 'recentStockListModal',
                size: 'lg'
            });
        }
    }
});
