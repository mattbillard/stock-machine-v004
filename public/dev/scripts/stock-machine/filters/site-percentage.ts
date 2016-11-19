declare var angular: any;

//Format number as percent
angular.module('stockMachineApp').filter('sitePercent', function($filter, UtilsServ){
    'use strict';

    return function(val, decimalPlaces) {
        //Make sure it's not undefined
        if (typeof val === 'undefined') {
            return '';
        }

        //Defaults
        decimalPlaces = (decimalPlaces) ? decimalPlaces : 1;

        //Vars
        let number;

        //Try converting to number
        number = UtilsServ.toNum(val);
        if (UtilsServ.isNum(number)) {
            number = $filter('number')(number, decimalPlaces);
            number = number+'%';

        //Else it must be a null or something. Just make sure it is a string so it displays.
        } else {
            number = UtilsServ.NAN;
        }



        return number;
    };
});
