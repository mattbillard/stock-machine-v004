declare var angular: any;

//CODE FROM: http://eric.sau.pe/angularjs-detect-enter-key-ngenter/
angular.module('stockMachineApp').directive('xngEnter', function () {
    'use strict';

    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.xngEnter);
                });

                event.preventDefault();
            }
        });
    };
});
