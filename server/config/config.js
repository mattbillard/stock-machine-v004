var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    dev: {
        env: 'dev',
        db: 'mongodb://localhost/stockMachine',
        rootPath: rootPath,
        port: process.env.PORT || 3000
    },
    prod: {
        env: 'prod',
        rootPath: rootPath,
        db: 'mongodb://localhost/stockMachine',
        //db: 'mongodb://user:pw@subdomain.mongolab.com:53178/stockMachine',
        port: process.env.PORT || 3001
    }
};
