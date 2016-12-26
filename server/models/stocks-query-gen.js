var _ = require('lodash');


function t(str) {
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
function parseSearch(searchObj) {
    var arr = [];
    _.forEach(searchObj, function(fieldVal, fieldName) {
        if (fieldVal) {
            var result = parseField(fieldName, fieldVal);
            arr.push(result);
        }
    });

    var results = {};
    if (arr.length) {
        results['$and'] = arr;
    }

    return results;
}

//disc, >50 AND <100
function parseField(fieldName, fieldVal) {
    var andOr;
    try {
        andOr = fieldVal.match(/ AND | OR /g)[0].trim();
    } catch(err) {
        andOr = 'AND';
    }

    var arr = [];
    var clauses = fieldVal.split(/ AND | OR /g);  //[>50, <100]
    clauses.forEach(function(clause) {
        var result = parseClause(fieldName, clause);
        arr.push(result);
    });

    var result = {};
    result[t(andOr)] = arr;
    return result;
}

//disc, >50
function parseClause(fieldName, clause) {
    var result = {};
    result[fieldName] =
        (isNaN(parseFloat(clause)) === false) ? parseNum(clause) :
        (clause.match(/>=|<=|>|<|!=|<>|==|=/gi)) ? parseComparison(clause) :
        parseRegEx(clause);

    return result;
}

//e.g. 12.5
function parseNum(clause) {
    var comparator = t('='),
        value = parseFloat(clause);

    var result = {};
    result[comparator] = value;
    return result;
}

//e.g. > 1, =2, <= 3, etc
function parseComparison(clause) {
    var matches = clause.match(/>=|<=|>|<|!=|<>|==|=|[\w\d.,]+/gi);
    var comparator = t(matches[0]);
    var value =
        (matches[1]==='null') ? null :
        (isNaN(parseFloat(matches[1]))===false) ? parseFloat(matches[1]) :
        matches[1];

    var result = {};
    result[comparator] = value;
    return result;
}

//e.g. ^a, tech, advanced tech
function parseRegEx(clause) {
    //Convert spaces into RegEx's equivalent of AND's
    //so searching for "aaa ccc" will find "ccc aaa" or "aaa bbb ccc"
    //but not "aaa" or "ccc"
    var exp = clause
        .split(/\s+/gi)
        .map(function(word) {
            return '(?=.*'+word+')';
        }).join('');

    var result = new RegExp(exp, 'i');
    return result;

}

module.exports.parseSearch = parseSearch;