var mysql = require('mysql')

var Db = module.exports = function (config) {
	this.client = mysql.createConnection({
		host: config.host,
		user: config.user,
		password: config.password,
		multipleStatements: true
	})

	this.config = config
}

Db.prototype.escape = function (values) {
	return this.client.escape.apply(this.client, arguments)
}

Db.prototype.query = function (sql, callback) {
	this.client.query(sql, function (err, data) {
		callback.apply(this, arguments)
	})
}

Db.prototype.create = function (callback) {
	var self = this
	  , sql = 'CREATE DATABASE ' + self.config.database

	self.query(sql, function (err, data) {
		// reinitialize the database
		self.client.changeUser(self.config)
		callback.apply(self, arguments)
	})
}

Db.prototype.drop = function (callback) {
	var sql = 'DROP DATABASE ' + this.config.database
	this.query(sql, callback)
}
