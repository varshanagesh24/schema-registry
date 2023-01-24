var mysql = require('mysql');
var connection = mysql.createPool({
	connectionLimit: 10,
	host: 'sql12.freemysqlhosting.net',
	user: 'sql12592456',
	password: 'YMJR8k3bHC',
	database: 'sql12592456'
});

// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }

//   console.log('connected as id ' + connection.threadId);
// });

connection.query('SELECT * FROM User', function(error, results, fields) {
	if (error) throw error;
	console.log(results[0].userid, results.length, [ ...results ]);
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

	con.query('SELECT * FROM User WHERE userid = :userid', { userid: 'varsha' }, function(error, results, fields) {
		if (error) throw error;
		console.log('With Parameterised Query', results[0].userid, results.length, [ ...results ]);
	});
});
