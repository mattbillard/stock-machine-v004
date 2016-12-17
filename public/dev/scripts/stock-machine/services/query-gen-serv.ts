declare var $: any;
declare var _: any;
declare var angular: any;

angular.module('stockMachineApp').service('QueryGenServ', class UtilsServ {
    t(str) {
        switch (str) {
            case 'and': case 'AND': return '$and';
            case 'or': case 'OR': return '$or';
            case '>=': return '$gte';
            case '>': return '$gt';
            case '<': return '$lt';
            case '<=': return '$lte';
            case '=': case '==': return '$eq';
            case '!=': case '<>': return '$ne';
            default: return str;
        }
    }

    //{ price:>10, disc:>=50 or < 100};
    parseSearch(searchObj) {
        let arr = [];
        _.forEach(searchObj, (fieldVal, fieldName) => {
            if (fieldVal) {
                let result = this.parseField(fieldName, fieldVal);
                arr.push(result);
            }
        });

        let results = {};
        if (arr.length) {
            results['$and'] = arr;
        }
        return results;
    }

    //disc, >50 AND <100
    parseField(fieldName, fieldVal) {
        let andOr = ((fieldVal.match(/AND|OR/gi) || [])[0] || 'AND').toUpperCase();

        let arr = [];
        let clauses = fieldVal.split(/AND|OR/gi);  //[>50, <100]
        clauses.forEach((clause) => {
            let result = this.parseClause(fieldName, clause);
            arr.push(result);
        });

        let result = {};
        result[this.t(andOr)] = arr;
        return result;
    }

    //disc, >50
    parseClause(fieldName, clause) {
        let matches = clause.match(/>=|<=|>|<|!=|<>|==|=|[\d.,]+/gi);
        let comparator = this.t(matches[0]),
            value = parseFloat(matches[1]);

        let result = {};
        result[fieldName] = {};
        result[fieldName][comparator] = value;
        return result;
    }
});
