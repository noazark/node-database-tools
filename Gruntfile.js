module.exports = function (grunt) {
	grunt.initConfig({
		db: {
			host: '',
			user: '',
			password: '',
			database: '',
			migrationsDir: ''
		}
	});

	// local tasks
	grunt.loadTasks('./tasks');
};
