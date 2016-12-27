declare var angular: any;

angular.module('stockMachineApp').directive('dtSort', function($compile, DtServ) {
    return {
        restrict: 'A',
        scope: {
            dtSort: '@'
        },
        controllerAs: '$ctrl',
        controller: function() {
            var $ctrl = this;
            $ctrl.DtServ = DtServ;
        },
        link: function($scope, $element, $attrs) {
            $scope.DtServ = DtServ;

            var html = `<span class="fa {{$ctrl.DtServ.getSortClass('${$scope.dtSort}')}}"></span>`;
            $element.prepend(html);
            $compile($element.contents())($scope);

            $element.on('click', function(){
                DtServ.doSort($scope.dtSort);
            })
        }
    }
});
