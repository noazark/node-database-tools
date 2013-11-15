var path = require('path')
var assert = require('assert')
var DBMigrate = require('db-migrate')

var Migrate = module.exports = function (config) {
	this.config = config
}

Migrate.prototype.up = function (to, callback) {
	var partialName = undefined

	if (typeof to === "string") {
		partialName = to
		to = Number.MAX_VALUE
	}

	createMigrator(this.config, function (err, migrator) {
		assert.ifError(err)
		migrator.upToBy(partialName, to, function () {
			migrator.driver.close()
			callback.apply(this, arguments)
		})
	})
}

Migrate.prototype.upUntil = function (to, callback) {
	var partialName = '99999999999999'

	if (typeof to === "string") {
		partialName = to
		to = -1
	} else {
		to -= 1
	}

	createMigrator(this.config, function (err, migrator) {
		assert.ifError(err)
		migrator.upToBy(partialName, to, function () {
			migrator.driver.close()
			callback.apply(this, arguments)
		})
	})
}

Migrate.prototype.down = function (to, callback) {
	var partialName = undefined

	if (typeof to === "string") {
		partialName = to
		to = 1
	}

	createMigrator(this.config, function (err, migrator) {
		assert.ifError(err)
		migrator.downToBy(partialName, to, function () {
			migrator.driver.close()
			callback.apply(this, arguments)
		})
	})
}


function createMigrator(config, callback) {
	DBMigrate.connect(config, function (err, migrator) {
		migrator.migrationsDir = path.resolve(config.migrationsDir)
		migrator.driver.createMigrationsTable(function (err) {
			callback(err, migrator)
		})
	})
}
