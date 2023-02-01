var { createRepository } = require('./db');
var { Schemas: SchemasTable } = require('./dbhelper');

let queryMap = {
	getAll: (obj) => SchemasTable.generateSelectSql(obj),
	create: (obj) => SchemasTable.generateInsertSql(obj),
	update: (obj) => SchemasTable.generateUpdateSql(obj)
};

module.exports = createRepository(queryMap);
