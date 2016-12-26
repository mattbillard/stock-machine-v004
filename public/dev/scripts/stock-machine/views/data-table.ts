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
            rows: []
        };
        public options: any = {
            limit: {
                default: 25,
                options: [25, 50, 100, 250, 500]
            }
        };
        public paginate: any = {
            maxSize: 5,
            showingXofY: ''
        };
        public searchFor: any = {
            cols: {},
            limit: this.options.limit.default,
            pageNum: 1,
            sort: {}
        };
        public state: string = '';

        
        // PRIVATE

        constructor($http, $log, $scope) {
            this.$http = $http;
            this.$scope = $scope;
            this.$log = $log;

            $scope.$watch('$ctrl.searchFor', () => {
                this.clearData();
            }, true);
            this.doSearch();
        }

        clearData() {
            this.data.count = 0;
            this.data.rows = [];
            this.paginate.showingXofY = '';
        }

        doXhr() {
            this.$log.log('Searching: ', JSON.stringify(this.searchFor, null, '    '));

            this.state = 'loading';
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
                    this.state = 'loaded';
                    this.makeShowingXofY();
                })
                .error((response, status, headers, config) => {
                    this.$log.error(response);
                    this.state = 'error';
                });
        }

        resetPageIdx() {
            this.searchFor.pageNum = 1;
        }


        // PUBLIC

        doPaginate() {
            this.doXhr();
        }

        doSearch() {
            this.resetPageIdx();
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
                this.searchFor.sort['symbol']===1 ? 'fa-caret-up' :
                this.searchFor.sort['symbol']===-1 ? 'fa-caret-down' :
                '';
            return result;
        }

        makeShowingXofY() {
            var min = (this.searchFor.pageNum-1) * this.searchFor.limit +1,
                max = this.searchFor.pageNum * this.searchFor.limit;

            if (max > this.data.count) {
                max = this.data.count;
            }

            this.paginate.showingXofY = 'Showing '+min+'-'+max+' of '+this.data.count;
        }
    }
});
