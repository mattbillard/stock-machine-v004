declare var angular: any;

//Automation page
angular.module('stockMachineApp').component('automate', {
    bindings: {},
    templateUrl: 'scripts/app/automate/views/automate.html',
    controller: class {
        private $http: any;
        private $log: any;
        private automationCount: number = null;
        private automating: boolean = false;

        public NUM_STOCKS_TO_AUTOMATE: number = 500;


        // PRIVATE

        constructor($http, $log) {
            this.$http = $http;
            this.$log = $log;
        }

        private automateNextStock() {
            this.automationCount++;
            this.$log.log(this.automationCount + ': Automating stock');

            this.$http.get('api/stocks/automate/')
                .success((data, status, headers, config) => {
                    if (typeof data === 'string' && data.match(/error/gi)) {
                        this.$log.error(data);
                    } else {
                        this.$log.log(data);
                    }
                })
                .error((data, status, headers, config) => {
                    this.$log.log('ERROR automating stock');
                })
                .finally(() => {
                    //If we are still automating (i.e. hasn't been stopped)
                    if (this.automating === true) {

                        //Automate next stock until we've automated through automationCount
                        if (this.automationCount < this.NUM_STOCKS_TO_AUTOMATE) {
                            this.automateNextStock();
                        } else {
                            this.automating = false;
                            this.$log.log('DONE automating stocks.\n');
                        }
                    }
                });
        }


        // PUBLIC

        public automationStart() {
            if (this.automationCount === null || this.automationCount >= this.NUM_STOCKS_TO_AUTOMATE) {
                this.$log.log('\nAutomating (' + this.NUM_STOCKS_TO_AUTOMATE + ') stocks...');
                this.automationCount = 0;
            } else {
                this.$log.log('Resuming automation...');
            }
            this.automating = true;
            this.automateNextStock();
        }

        public automationStop() {
            this.automating = false;
            this.$log.log('Automation stopped');
        }

        public getAutomationCount() {
            return this.automationCount;
        }

        public getAutomationPercent() {
            let percent;
            let count = this.automationCount;
            if (count === null) {
                percent = 0;
            } else {
                let total = this.NUM_STOCKS_TO_AUTOMATE;
                percent = count / total * 100;
                percent = percent.toFixed(1);
            }
            return percent;
        }

        public isAutomating() {
            return this.automating;
        }
    }
});
