declare var angular: any;

angular.module('stockMachineApp').component('dtPagination', {
    bindings: {},
    templateUrl: 'scripts/app/data-table/components/dt-pagination.html',
    controller: class {
        public DtServ: any;

        constructor(DtServ) {
            this.DtServ = DtServ;
        }
    }
});
