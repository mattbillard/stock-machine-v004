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
        public options: any = {
            limit: {
                default: 25,
                options: [25, 50, 100, 250, 500]
            }
        };
        public searchFor: any = {
            limit: this.options.limit.default,
            pageIdx: 0,
            cols: {}
        };
        public state: string = '';

        // PRIVATE

        constructor($http, $log, $scope) {
            this.$http = $http;
            this.$scope = $scope;
            this.$log = $log;

            $scope.$watch('$ctrl.searchFor', () => {
                this.clearTable();
            }, true);
            this.doSearch();
        }

        clearTable() {
            this.data = [];
        }

        doXhr() {
            console.clear();
            this.clearTable();
            this.$log.log('Searching: ', JSON.stringify(this.searchFor, null, '    '));

            this.state = 'loading';
            this.$http({
                    method: 'POST',
                    url: '/api/stocks/search/',
                    data: {
                        searchFor: this.searchFor
                    }
                })
                .success((data, status, headers, config) => {
                    this.data = data;
                    this.state = 'loaded';
                })
                .error((data, status, headers, config) => {
                    this.$log.error(data);
                    this.state = 'error';
                });
        }

        resetPage() {
            this.searchFor.pageIdx = 0;
        }


        // PUBLIC

        paginate() {
            this.doXhr();
        }

        doSearch() {
            this.resetPage();
            this.doXhr();
        }
    }
});
