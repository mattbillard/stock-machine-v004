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


        // PUBLIC

        getStocks() {
            this.clearTable();

            //bugfix: smart-table doesn't like reinitializing the table after an XHR request. Use this and ng-if to destroy/recreate the smart-table
            this.state = 'loading';

            let whereArr = [];
            angular.forEach(this.search, (val, key) => {
                val = val.trim();
                if (val) {
                    //If they did not add an operator (e.g. >|<|=, etc) add ='' for them
                    if (!val.match(/>|<|!=|=|not like|like|is not null|is null/gi)) {
                        val = '="'+val+'"';
                    }

                    //Add in the key/column name
                    val = val.replace(/(>=|<=|>|<|!=|=|not like|like|is not null|is null)/gi, key+' $1 ');
                    whereArr.push(val);
                }
            });

            //Finish whereCond
            let whereCond = whereArr.join('  AND  ');
            this.$log.log('Getting stocks WHERE '+whereCond);

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
                    this.data = data.map(function(row){
                        return JSON.parse(row['allInfoAsJson']);
                    });
                    this.state = 'loaded';
                }
            })
            .error((data, status, headers, config) => {
                this.$log.log('ERROR : '+data, '\n');
            });
        }
    }
});
