declare var $: any;
declare var angular: any;

angular.module('stockMachineApp').component('simpleChart', {
    bindings: {
        data: '='
    },
    templateUrl: '/scripts/stock-machine/components/simple-chart.html',
    controller: class {
        private $scope: any;
        private $element: any;


        // PRIVATE

        constructor($scope, $element) {
            this.$scope = $scope;
            this.$element = $element;

            $scope.$watch('$ctrl.data', (data) => {
                if (data) {
                    this.draw(data);
                }
            });
        }


        // PUBLIC

        convert(data) {
            let result = [];
            angular.forEach(data, (val, key) => {
                let num = val*1;
                num = (angular.isNumber(num) && !isNaN(num) && num !== null) ? num : null;
                result.push(num);
            });
            return result;
        }

        draw(data) {
            this.$element.find('.chart').highcharts({
                title: {
                    text: '',
                    style: {
                        display: 'none'
                    }
                },
                xAxis: {
                    labels: {
                        enabled: false
                    },
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    labels: {
                        enabled: false
                    },
                    title: {
                        text: null
                    }
                },
                legend: {
                    enabled: false
                },
                series: [{
                    connectNulls: true,
                    color: '#777',
                    data: this.convert(data)
                }],
                plotOptions: {
                    series: {
                        animation: false
                    }
                }
            });

            $('*[text-anchor="end"]').hide();
        }
    }
});
