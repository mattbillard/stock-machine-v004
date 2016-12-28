declare var angular: any;

//Controller for RecentStocks modal
angular.module('stockMachineApp').component('recentStockListModal', {
    templateUrl: 'scripts/app/analysis/modals/recent-stock-list-modal.html',
    bindings: {
        modalInstance: '<'
    },
    controller: class {
        private modalInstance: any;

        public StocksServ: any;


        // PRIVATE

        constructor(StocksServ) {
            this.StocksServ = StocksServ;
        }


        // PUBLIC

        public modalOk() {
            this.modalInstance.close();
        }

        public modalCancel() {
            this.modalInstance.dismiss('cancel');
        }
    }
});
