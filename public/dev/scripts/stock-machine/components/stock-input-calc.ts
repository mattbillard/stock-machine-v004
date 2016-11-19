declare var angular: any;

angular.module('stockMachineApp').component('stockInputCalc', {
    transclude: true,
    bindings: {
        key: '@',
        label: '@',
        readonly: '@'
    },
    templateUrl: '/scripts/stock-machine/components/stock-input-calc.html',
    controller: class {
        public StocksServ: any;

        constructor(StocksServ) {
            this.StocksServ = StocksServ;
        }

        redoCalcs(key, $event) {
            this.StocksServ.redoCalcs(key, $event.target.value);
        }
    }
});
