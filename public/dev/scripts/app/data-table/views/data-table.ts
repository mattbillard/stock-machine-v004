declare var $: any;
declare var angular: any;

//DataTable page
angular.module('stockMachineApp').component('datatable', {
    bindings: {},
    templateUrl: 'scripts/app/data-table/views/data-table.html',
    controller: class {
        public DtServ: any;

        constructor(DtServ) {
            this.DtServ = DtServ;
        }
    }
});
