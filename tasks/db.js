var Db = require('../lib/db')

module.exports = function (grunt) {
	grunt.config.requires('db')
	var config = grunt.config.get('db')

	var db = new Db(config)

	grunt.registerTask('db:create', 'create the database', function () {
		var done = this.async();
		db.create(function (err, data) {
			if (err && err.code == 'ER_DB_CREATE_EXISTS') {
				grunt.log.ok(config.database, 'database already exists, it\'s cool though, we\'re moving on')
			} else if (data) {
				grunt.log.ok('created database', config.database)
			} else {
				grunt.log.error(err)
			}

			done()
		})
	})

	grunt.registerTask('db:drop', 'drop the database', function () {
		var done = this.async();
		db.drop(function (err, data) {
			if (err) {
				grunt.log.error(err)
			}
			if (data) {
				grunt.log.ok('dropped database', config.database)
			}

			done()
		})
	})

	grunt.registerTask('db:reset', 'drop and recreate the database', function () {
		var done = this.async();
		db.reset(function (err, data) {
			if (err) {
				grunt.log.error(err)
			}
			if (data) {
				grunt.log.ok('reset database', config.database)
			}

			done()
		})
	})
}
