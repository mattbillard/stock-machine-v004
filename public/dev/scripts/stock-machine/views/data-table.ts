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
        private QueryGenServ: any;

        public data: any = [];
        public search: any = {};
        public state: string = '';

        // PRIVATE

        constructor($http, $log, $scope, QueryGenServ) {
            this.$http = $http;
            this.$scope = $scope;
            this.$log = $log;
            this.QueryGenServ = QueryGenServ;

            $scope.$watch('$ctrl.search', () => {
                this.clearTable();
            }, true);
            this.getStocks();
        }

        clearTable() {
            this.data = [];
        }

        getStockData(whereCond: string) {
            this.$log.log('Searching: ', JSON.stringify(whereCond, null, '    '));
            this.$http({
                    method: 'POST',
                    url: '/api/stocks/search/',
                    data: {
                        whereCond: whereCond
                    }
                })
                .success((data, status, headers, config) => {
                    if (angular.isArray(data) === false) {
                        this.$log.error( $('<div></div>').html(data).text() );
                        this.state = 'loaded';

                    } else {
                        this.data = data;
                        this.state = 'loaded';
                    }
                })
                .error((data, status, headers, config) => {
                    //this.$log.log('ERROR : '+data, '\n');
                });
        }


        // PUBLIC

        getStocks() {
            console.clear();
            this.clearTable();

            //bugfix: smart-table doesn't like reinitializing the table after an XHR request. Use this and ng-if to destroy/recreate the smart-table
            this.state = 'loading';

            let whereCond = this.QueryGenServ.parseSearch(this.search);
            this.getStockData(whereCond);
        }
    }
});
