var mysql = require('mysql'),
    nodefn = require('when/node');

function Storage() {
  this.connection = mysql.createConnection({
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME
  });

  this.connection.connect();
  this.query = this.connection.query.bind(this.connection);
}

Storage.prototype.setup = function() {
  var that = this;
  return nodefn.call(this.query, 'DROP TABLE IF EXISTS scores').then(function() {
    return nodefn.call(that.query, 'CREATE TABLE scores(score INT)');
  });
}

Storage.prototype.populate = function() {
  return nodefn.call(this.query, 'INSERT INTO scores(score) VALUES(1234)');
}

Storage.prototype.score = function() {
  return nodefn.call(this.query, 'SELECT * FROM scores').then(function(rows, fields) {
    console.log(rows[0]);
    return Number(rows[0].score);
  });
}

module.exports = Storage;
