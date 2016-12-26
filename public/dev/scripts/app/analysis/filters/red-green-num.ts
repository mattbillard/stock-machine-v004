declare var angular: any;

//Returns a CSS class for red vs green vs black numbers
angular.module('stockMachineApp').filter('redGreenNum', function(UtilsServ){
    'use strict';

    return function(val) {
        //Make sure it's not undefined
        if (typeof val === 'undefined') {
            return '';
        }

        let number;
        let cssClass = '';

        //Try converting to a number and then checking what color it should be
        number = UtilsServ.toNum(val);
        if (UtilsServ.isNum(number)) {
            if (number < 8) {
                cssClass = 'red-text';
            } else if (number < 10) {
                //Do nothing
            } else {
                cssClass = 'green-text';
            }

        //Null, etc are red
        } else {
            cssClass = 'red-text';
        }

        return cssClass;
    };
});
