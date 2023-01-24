var { createRepository } = require('./db');
var { User: UserTable } = require('./dbhelper');

let queryMap = {
	getAll: (obj) => UserTable.generateSelectSql(obj),
	create: (obj) => UserTable.generateInsertSql(obj),
	update: (obj) => UserTable.generateUpdateSql(obj)
};

module.exports = createRepository(queryMap);
