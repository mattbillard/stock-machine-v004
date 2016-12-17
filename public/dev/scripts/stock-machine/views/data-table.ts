declare var $: any;
declare var angular: any;

//DataTable page
angular.module('stockMachineApp').component('datatable', {
    templateUrl: '/scripts/stock-machine/views/data-table.html',
    bindings: {},
    controller: class {
        private $http: any;
        private $log: any;
        private $scope: any;

        public data: any = [];
        public search: any = {};
        public state: string = '';

        // PRIVATE

        constructor($http, $log, $scope) {
            this.$http = $http;
            this.$scope = $scope;
            this.$log = $log;

            $scope.$watch('$ctrl.search', () => {
                this.clearTable();
            }, true);
            this.getStocks();
        }

        clearTable() {
            this.data = [];
        }

        getStockData(searchQuery: any) {
            this.$log.log('Searching: ', JSON.stringify(searchQuery, null, '    '));

            this.state = 'loading';
            this.$http({
                    method: 'POST',
                    url: '/api/stocks/search/',
                    data: {
                        searchQuery: searchQuery
                    }
                })
                .success((data, status, headers, config) => {
                    this.data = data;
                    this.state = 'loaded';
                })
                .error((data, status, headers, config) => {
                    this.$log.error('ERROR : '+data, '\n');
                    this.state = 'error';
                });
        }


        // PUBLIC

        getStocks() {
            console.clear();
            this.clearTable();
            this.getStockData(this.search);
        }
    }
});
