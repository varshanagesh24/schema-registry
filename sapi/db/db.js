var mysql = require('mysql');
var pool = mysql.createPool({
	connectionLimit: 10,
	host: process.env.host,
	user: process.env.user,
	password: process.env.password,
	database: process.env.database
});

let getConnection = () =>
	new Promise((res, rej) => {
		pool.getConnection((err, connection) => {
			if (err) {
				console.error(err);
				rej(err);
				return;
			}

			connection.config.queryFormat = function(query, values) {
				if (!values) return query;
				return query.replace(
					/\:(\w+)/g,
					function(txt, key) {
						if (values.hasOwnProperty(key)) {
							return this.escape(values[key]);
						}
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
			let objWithAuditFields = {
				...{ createdOn: Date.now(), createdBy: 'System', modifiedOn: Date.now(), modifiedBy: 'System' },
				...(params || {})
			};
			connection.query(query(params), objWithAuditFields, function(error, result, fields) {
				if (error) {
					reject(error);
				}
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
