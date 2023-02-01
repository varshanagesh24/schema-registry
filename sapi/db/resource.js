var { createRepository } = require('./db');
var { Resource: ResourceTable } = require('./dbhelper');
var { groupBy } = require('../utils');
let queryMap = {
	getAll: (obj) => ResourceTable.generateSelectSql(obj),
	getResourceMinView: (obj) => ResourceTable.generateSelectSql(obj, [ 'page', 'key', 'value' ]),
	create: (obj) => ResourceTable.generateInsertSql(obj),
	update: (obj) => ResourceTable.generateUpdateSql(obj)
};

module.exports = createRepository(queryMap);
