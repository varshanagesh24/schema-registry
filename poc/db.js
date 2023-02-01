var mysql = require('mysql');
var connection = mysql.createPool({
	connectionLimit: 10,
	host: 'registry.cluster-custom-chjphxdplbro.us-east-1.rds.amazonaws.com',
	user: 'admin',
	password: 'YoscgrT9VqW7jppjWaI',
	database: 'registry'
});

// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }

//   console.log('connected as id ' + connection.threadId);
// });

connection.query('SELECT * FROM INFORMATION_SCHEMA.TABLES', function(error, results, fields) {
	if (error) throw error;
	console.log(results);
});

connection.getConnection((err, con) => {
	con.config.queryFormat = function(query, values) {
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
});
