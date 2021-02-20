const mysql = require('mysql');

module.exports = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'TunaStarfish45',
  database: 'connectfour'
});