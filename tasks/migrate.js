var Migrate = require('../lib/migrate')
var path = require('path')

module.exports = function (grunt) {
	grunt.config.requires('db')
	grunt.config.requires('db.migrationsDir')
	var options = grunt.config.get('db')

	var migrate = new Migrate(options)

	grunt.registerTask('db:migrate', ['db:migrate:up'])

	grunt.registerTask('db:migrate:up', 'migrate the database', function () {
		var steps = grunt.option('steps') || Number.MAX_VALUE
		migrate.up(steps, this.async())
	})

	grunt.registerTask('db:migrate:down', 'migrate the database', function () {
		var steps = grunt.option('steps') || 1
		migrate.down(steps, this.async())
	})
}
