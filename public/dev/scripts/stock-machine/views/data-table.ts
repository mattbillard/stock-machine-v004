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

        public data: any = {
            count: 0,
            error: '',
            rows: [],
            showingXofY: '',
            state: ''
        };
        public options: any = {
            limit: {
                default: 25,
                options: [25, 50, 100, 250, 500]
            },
            paginate: {
                maxSize: 5
            }
        };
        public searchFor: any = {
            cols: {},
            limit: this.options.limit.default,
            pageNum: 1,
            sort: {}
        };

        
        // PRIVATE

        constructor($http, $log, $scope) {
            this.$http = $http;
            this.$scope = $scope;
            this.$log = $log;

            $scope.$watch('$ctrl.searchFor.cols', (o, n) => {
                if (angular.equals(o, n)) { return; }
                this.clearData();
            }, true);
            this.doSearch();
        }

        clearData() {
            this.data.count = 0;
            this.data.rows = [];
            this.data.error = '';
            this.data.showingXofY = '';
            this.data.state = 'CLEARED';
        }

        doXhr() {
            this.$log.log('Searching: ', JSON.stringify(this.searchFor, null, '    '));
            this.data.state = 'LOADING';

            this.$http({
                    method: 'POST',
                    url: '/api/stocks/search/',
                    data: {
                        searchFor: this.searchFor
                    }
                })
                .success((response, status, headers, config) => {
                    this.data.count = response.count;
                    this.data.rows = response.rows;
                    this.data.state = 'LOADED';
                    this.makeShowingXofY();
                })
                .error((response, status, headers, config) => {
                    this.$log.error(response);
                    this.data.error = response;
                    this.data.state = 'ERROR';
                });
        }

        resetPageIdx() {
            this.searchFor.pageNum = 1;
        }


        // PUBLIC

        doPaginate() {
            this.clearData();
            this.doXhr();
        }

        doSearch() {
            this.resetPageIdx();
            this.clearData();
            this.doXhr();
        }

        doSort(colName: string) {
            if (this.searchFor.sort[colName]) {
                this.searchFor.sort[colName] *= -1;
            } else {
                this.searchFor.sort = {};
                this.searchFor.sort[colName] = 1;
            }

            this.doSearch();
        }

        getSortClass(colName) {
            var result =
                this.searchFor.sort[colName]===1 ? 'fa-caret-up' :
                this.searchFor.sort[colName]===-1 ? 'fa-caret-down' :
                '';
            return result;
        }

        makeShowingXofY() {
            var min = (this.searchFor.pageNum-1) * this.searchFor.limit +1,
                max = this.searchFor.pageNum * this.searchFor.limit;

            if (max > this.data.count) {
                max = this.data.count;
            }

            this.data.showingXofY = 'Showing '+min+'-'+max+' of '+this.data.count;
        }
    }
});
