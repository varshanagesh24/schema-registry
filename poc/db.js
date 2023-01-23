var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'sql12.freemysqlhosting.net',
  user     : 'sql12592456',
  password : 'YMJR8k3bHC',
  database : 'sql12592456'
});
 
// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }
 
//   console.log('connected as id ' + connection.threadId);
// });

connection.query('SELECT * FROM User', function (error, results, fields) {
    if (error) throw error;
    console.log(results[0].userid, results.length, [...results])
  });