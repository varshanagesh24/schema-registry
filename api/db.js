var mysql = require('mysql');
var connection = mysql.createPool({
	connectionLimit: 10,
	host: 'sql12.freemysqlhosting.net',
	user: 'sql12592456',
	password: 'YMJR8k3bHC',
	database: 'sql12592456'
});

module.exports = connection;
