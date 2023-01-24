let map = require('./dbmap.json');

let generateColumnForCreate = (field) =>
	field.type === 'varbinary'
		? 'unhex(:' + field.name + ') '
		: field.hash ? 'MD5(:' + field.name + ')' : ':' + field.name;

let createStatement = (map, obj, table) => {
	let fields = map[table].fields;
	let objWithAuditFields = {
		...{ createdOn: Date.now(), createdBy: 'System', modifiedOn: Date.now(), modifiedBy: 'System' },
		...obj
	};
	let propertyKeys = Object.keys(objWithAuditFields);
	let selectedProperties = propertyKeys
		.filter((prop) => fields.find((f) => f.name === prop))
		.map((prop) => fields.find((f) => f.name === prop));
	let columns = selectedProperties.map((prop) => '`' + prop.name + '`').join(', ');
	let values = selectedProperties.map(generateColumnForCreate).join(', ');
	let tableName = '`' + table + '`';
	let query = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
	return query;
};

let generateColumnForUpdate = (field) =>
	field.type === 'varbinary'
		? '`' + field.name + '` = ' + 'unhex(:' + field.name + ') '
		: field.hash
			? '`' + field.name + '` = ' + 'MD5(:' + field.name + ')'
			: '`' + field.name + '` = ' + ':' + field.name;

let updateStatement = (map, obj, table) => {
	let fields = map[table].fields;
	let keys = map[table].keys;
	let fieldsWithoutKey = fields.filter((field) => !keys.includes(field.name));
	let fieldsWithKey = fields.filter((field) => keys.includes(field.name));

	let objWithAuditFields = {
		...{ createdOn: Date.now(), createdBy: 'System', modifiedOn: Date.now(), modifiedBy: 'System' },
		...obj
	};
	let propertyKeys = Object.keys(objWithAuditFields);
	let selectedProperties = propertyKeys
		.filter((prop) => fieldsWithoutKey.find((f) => f.name === prop))
		.map((prop) => fields.find((f) => f.name === prop));

	let columnClause = selectedProperties.map(generateColumnForUpdate).join(', ');
	let whereClause = fieldsWithKey.map(generateColumnForUpdate).join(' AND ');
	let tableName = '`' + table + '`';
	let query = `UPDATE ${tableName} SET ${columnClause} WHERE ${whereClause}`;
	return query;
};

let generateColumnForSelect = (field) =>
	field.type === 'varbinary' ? 'hex(' + field.name + ') as ' + '`' + field.name + '`' : '`' + field.name + '`';

let selectStatement = (map, obj, table, selectedFields) => {
	let fields = map[table].fields;
	fields = selectedFields ? fields.filter((f) => selectedFields.includes(f.name)) : fields;

	let propertyKeys = obj ? Object.keys(obj) : [];
	let selectedProperties = propertyKeys
		.filter((prop) => map[table].fields.find((f) => f.name === prop))
		.map((prop) => fields.find((f) => f.name === prop));
	let columnClause = fields.map(generateColumnForSelect).join(', ');
	let whereClause = selectedProperties.map(generateColumnForUpdate).join(' AND ');
	let tableName = '`' + table + '`';
	let query = obj
		? `SELECT ${columnClause} FROM ${tableName} WHERE ${whereClause}`
		: `SELECT ${columnClause} FROM ${tableName}`;
	return query;
};

let QUERIES = {};

Object.keys(map).forEach((table) => {
	QUERIES[table] = {
		generateInsertSql: (obj) => createStatement(map, obj, table),
		generateUpdateSql: (obj) => updateStatement(map, obj, table),
		generateSelectSql: (obj, fields) => selectStatement(map, obj, table, fields)
	};
});

module.exports = QUERIES;
