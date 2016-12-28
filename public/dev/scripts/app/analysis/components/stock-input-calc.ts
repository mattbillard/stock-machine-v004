declare var angular: any;

angular.module('stockMachineApp').component('stockInputCalc', {
    transclude: true,
    bindings: {
        key: '@',
        label: '@',
        readonly: '@'
    },
    templateUrl: 'scripts/app/analysis/components/stock-input-calc.html',
    controller: class {
        public StocksServ: any;

        constructor(StocksServ) {
            this.StocksServ = StocksServ;
        }

        public redoCalcs(key, $event) {
            this.StocksServ.redoCalcs(key, $event.target.value);
        }
    }
});
