declare var angular: any;

//Format financial number
angular.module('stockMachineApp').filter('siteNum', function($filter, UtilsServ){
    'use strict';

    return function(val, decimalPlaces) {
        //Make sure it's not undefined
        if (typeof val === 'undefined') {
            return '';
        }

        //Defaults
        decimalPlaces = (decimalPlaces) ? decimalPlaces : 2;

        //Vars
        let number;
        let suffix = '';

        //Try formatting as a number
        number = UtilsServ.toNum(val);
        if (UtilsServ.isNum(number)) {
            //If over 1 billion, use suffix
            if (number > 1000000000) {
                number /= 1000000000;
                suffix = ' Bil';

                //Else if over 1 million, use suffix
            } else if (number > 1000000) {
                number /= 1000000;
                suffix = ' Mil';
            }

            number = $filter('number')(number, decimalPlaces);

        //Else it must be a null or something. Just make sure it is a string so it displays.
        } else {
            number = UtilsServ.NAN;
        }

        return number+suffix;
    };
});
