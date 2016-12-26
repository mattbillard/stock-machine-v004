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

        public count: number = 0;
        public rows: any = [];
        public options: any = {
            limit: {
                default: 25,
                options: [25, 50, 100, 250, 500]
            }
        };
        public searchFor: any = {
            cols: {},
            limit: this.options.limit.default,
            pageIdx: 0,
            sort: {}
        };
        public state: string = '';

        // PRIVATE

        constructor($http, $log, $scope) {
            this.$http = $http;
            this.$scope = $scope;
            this.$log = $log;

            $scope.$watch('$ctrl.searchFor', () => {
                this.clearCount();
                this.clearTable();
            }, true);
            this.doSearch();
        }

        clearCount() {
            this.count = 0;
        }

        clearTable() {
            this.rows = [];
        }

        doXhr() {
            console.clear();
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
                    this.count = response.count;
                    this.rows = response.rows;
                    this.state = 'loaded';
                })
                .error((response, status, headers, config) => {
                    this.$log.error(response);
                    this.state = 'error';
                });
        }

        resetPageIdx() {
            this.searchFor.pageIdx = 0;
        }


        // PUBLIC

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

        getShowingXofY() {
            var min = this.searchFor.pageIdx * this.searchFor.limit +1,
                max = (this.searchFor.pageIdx+1) * this.searchFor.limit;
            return 'Showing '+min+'-'+max+' of '+this.count;
        }

        getSortClass(colName) {
            var result =
                this.searchFor.sort['symbol']===1 ? 'fa-caret-up' :
                this.searchFor.sort['symbol']===-1 ? 'fa-caret-down' :
                '';
            return result;
        }

        paginate() {
            this.doXhr();
        }
    }
});
