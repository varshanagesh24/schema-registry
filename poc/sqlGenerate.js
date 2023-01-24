let map = {
	Resource: {
		keys: [ 'id' ],
		fields: [ 'id', 'page', 'key', 'value', 'createdOn', 'createdBy', 'modifiedOn', 'modifiedBy' ]
	},
	Schemas: {
		keys: [ 'sc_id' ],
		fields: [ 'sc_id', 'name', 'version', 'schema', 'active', 'createdOn', 'createdBy', 'modifiedOn', 'modifiedBy' ]
	},
	User: {
		keys: [ 'userid' ],
		fields: [ 'userid', 'passwordHash', 'active', 'name', 'createdOn', 'createdBy', 'modifiedOn', 'modifiedBy' ]
	}
};

let createStatement = (obj, table) => {
	let fields = map[table].fields;
	let objWithAuditFields = {
		...{ createdOn: Date.now(), createdBy: 'System', modifiedOn: Date.now(), modifiedBy: 'System' },
		...obj
	};
	let propertyKeys = Object.keys(objWithAuditFields);
	let selectedProperties = propertyKeys.filter((prop) => fields.includes(prop));
	let columns = selectedProperties.map((prop) => '`' + prop + '`').join(', ');
	let values = selectedProperties.map((prop) => ':' + prop).join(', ');
	let query = `INSERT INTO ${table} (${columns}) VALUES (${values})`;
	return query;
};

let updateStatement = (obj, table) => {
	let fields = map[table].fields;
	let keys = map[table].keys;
	let fieldsWithoutKey = fields.filter((field) => !keys.includes(field));

	let objWithAuditFields = {
		...{ createdOn: Date.now(), createdBy: 'System', modifiedOn: Date.now(), modifiedBy: 'System' },
		...obj
	};
	let propertyKeys = Object.keys(objWithAuditFields);
	let selectedProperties = propertyKeys.filter((prop) => fieldsWithoutKey.includes(prop));
	//let columns = selectedProperties.map((prop) => '`' + prop + '`').join(', ');
	//let values = selectedProperties.map((prop) => ':' + prop).join(', ');
	let columnClause = selectedProperties.map((prop) => '`' + prop + '` = ' + ':' + prop).join(', ');
	let whereClause = keys.map((prop) => '`' + prop + '` = ' + ':' + prop).join(' AND ');
	let query = `UPDATE ${table} SET ${columnClause} WHERE ${whereClause}`;
	return query;
};

let selectStatement = (obj, table, selectedFields) => {
	let fields = selectedFields || map[table].fields;

	let propertyKeys = obj ? Object.keys(obj) : [];
	let selectedProperties = propertyKeys.filter((prop) => map[table].fields.includes(prop));
	let columnClause = fields.map((prop) => '`' + prop + '`').join(', ');
	let whereClause = selectedProperties.map((prop) => '`' + prop + '` = ' + ':' + prop).join(' AND ');
	let query = obj
		? `SELECT ${columnClause} FROM ${table} WHERE ${whereClause}`
		: `SELECT ${columnClause} FROM ${table}`;
	return query;
};

console.log(createStatement({ id: 1, page: 'p', key: 'k', name: 'n' }, 'Resource'));

console.log(updateStatement({ id: 1, page: 'p', key: 'k', name: 'n' }, 'Resource'));

console.log(selectStatement(null, 'Resource'));

console.log(selectStatement({ id: 1 }, 'Resource'));

console.log(selectStatement({ id: 1 }, 'Resource', [ 'page', 'key', 'value' ]));

console.log(selectStatement(null, 'Resource', [ 'page', 'key', 'value' ]));

console.log(createStatement({ id: 1, passwordHash: 'p', active: 'a', name: 'n' }, 'User'));

console.log(updateStatement({ id: 1, passwordHash: 'p', active: 'a', name: 'n' }, 'User'));

console.log(selectStatement(null, 'User'));

console.log(selectStatement({ id: 1 }, 'User'));

console.log(selectStatement({ id: 1 }, 'User', [ 'passwordHash', 'active', 'name' ]));

console.log(selectStatement(null, 'User', [ 'passwordHash', 'active', 'name' ]));

console.log(JSON.stringify(map));
