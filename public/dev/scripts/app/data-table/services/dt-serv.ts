declare var angular: any;

angular.module('stockMachineApp').service('DtServ', class {
    private $http: any;
    private $log: any;

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
        //limit: this.DtServ.options.limit.default,
        limit: 25,
        pageNum: 1,
        sort: {}
    };
    
    
    // PRIVATE

    constructor($http, $log) {
        this.$http = $http;
        this.$log = $log;
        //this.DtServ = DtServ;

        //$scope.$watch('$ctrl.searchFor.cols', (o, n) => {
        //    if (angular.equals(o, n)) { return; }
        //    this.clearData();
        //}, true);
        this.doSearch();
    }

    private clearData() {
        this.data.count = 0;
        this.data.rows = [];
        this.data.error = '';
        this.data.showingXofY = '';
        this.data.state = 'CLEARED';
    }

    private doXhr() {
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

    private resetPageIdx() {
        this.searchFor.pageNum = 1;
    }


    // PUBLIC

    public doPaginate() {
        this.clearData();
        this.doXhr();
    }

    public doSearch() {
        this.resetPageIdx();
        this.clearData();
        this.doXhr();
    }

    public doSort(colName: string) {
        if (this.searchFor.sort[colName]) {
            this.searchFor.sort[colName] *= -1;
        } else {
            this.searchFor.sort = {};
            this.searchFor.sort[colName] = 1;
        }

        this.doSearch();
    }

    public getSortClass(colName: string) {
        var result =
            this.searchFor.sort[colName]===1 ? 'fa-caret-up' :
            this.searchFor.sort[colName]===-1 ? 'fa-caret-down' :
            '';
        return result;
    }

    public makeShowingXofY() {
        var min = (this.searchFor.pageNum-1) * this.searchFor.limit +1,
            max = this.searchFor.pageNum * this.searchFor.limit;

        if (max > this.data.count) {
            max = this.data.count;
        }

        this.data.showingXofY = 'Showing '+min+'-'+max+' of '+this.data.count;
    }
});
