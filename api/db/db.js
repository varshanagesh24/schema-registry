var mysql = require('mysql');
var pool = mysql.createPool({
	connectionLimit: 10,
	host: 'sql12.freemysqlhosting.net',
	user: 'sql12592456',
	password: 'YMJR8k3bHC',
	database: 'sql12592456'
});

let getConnection = () =>
	new Promise((res, rej) => {
		pool.getConnection((err, connection) => {
			if (err) {
				rej(err);
			}

			connection.config.queryFormat = function(query, values) {
				console.log('Query Formatting - ', query, values);
				if (!values) return query;
				console.log('Reached over here');
				return query.replace(
					/\:(\w+)/g,
					function(txt, key) {
						if (values.hasOwnProperty(key)) {
							return this.escape(values[key]);
						}
						console.log('Query Formatting', query, values, txt);
						return txt;
					}.bind(this)
				);
			};

			res(connection);
		});
	});

let query = (query, params) => {
	return getConnection().then((connection) => {
		return new Promise((resolve, reject) => {
			console.log('Execute Query', query(params), params);
			let objWithAuditFields = {
				...{ createdOn: Date.now(), createdBy: 'System', modifiedOn: Date.now(), modifiedBy: 'System' },
				...(params || {})
			};
			connection.query(query(params), objWithAuditFields, function(error, result, fields) {
				if (error) {
					reject(error);
				}
				console.log('Query', result);
				resolve(result);
			});
		});
	});
};

let queryFunction = (sqlText) => (params) => query(sqlText, params);

let createRepository = (map) => Object.keys(map).reduce((agr, key) => ((agr[key] = queryFunction(map[key])), agr), {});

module.exports = {
	getConnection,
	query,
	createRepository
};
