declare var angular: any;

angular.module('stockMachineApp').directive('dtFilter', function($compile, DtServ) {
    return {
        restrict: 'A',
        scope: {
            dtFilter: '@'
        },
        controllerAs: '$ctrl',
        controller: function() {
            var $ctrl = this;
            $ctrl.DtServ = DtServ;
        },
        link: function($scope, $element, $attrs) {
            var html = `
                <input
                    class="input-sm form-control"
                    ng-model="$ctrl.DtServ.searchFor.cols['${$scope.dtFilter}']"
                    xng-enter="$ctrl.DtServ.doSearch()"
                    type="search"
                />
            `;
            $element.prepend(html);
            $compile($element.contents())($scope);
        }
    }
});
