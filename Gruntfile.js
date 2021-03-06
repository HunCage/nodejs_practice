module.exports = function (grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
			},
			build: {
				src: [
					"src/vendor/jquery/dist/jquery.min.js",
					"src/vendor/bootstrap/dist/js/bootstrap.min.js",
					"src/vendor/angular/angular.min.js",
					"src/vendor/angular-currency-filter/currencyModule.js",
					"src/js/main.js",
					"src/js/factory/*.js",
					"src/js/controllers/*.js",
				],
				dest: "build/js/all.js",
			},
		},

		watch: {
			scripts: {
				files: [
					"src/**/*.js",
					"src/**/*.html",
					"src/**/*.css",
					"src/**/*.jade",
					"Gruntfile.js",
				],
				tasks: ["dev"],
				options: {
					spawn: false,
				},
			},
		},

		clean: ["build/**"],
		copy: {
			main: {
				files: [
					// includes files within path
					{
						expand: true,
						cwd: "src/",
						src: ["**/*.html", "**/*.jade", "img/*"],
						dest: "build/",
						filter: "isFile",
					},
					{
						expand: true,
						cwd: "src/",
						src: ["vendor/**"],
						dest: "build/",
					},

					/* 					// includes files within path and its sub-directories
					{ expand: true, src: ["path/**"], dest: "dest/" },

					// makes all src relative to cwd
					{ expand: true, cwd: "path/", src: ["**"], dest: "dest/" }, */
				],
			},
		},
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1,
			},
			target: {
				files: {
					"build/css/all.min.css": [
						"src/css/style.css",
						"src/vendor/bootstrap/dist/css/bootstrap.min.css",
					],
				},
			},
		},

		jshint: {
			options: {
				curly: true,
				eqnull: true,
				eqeqeq: true,
				undef: true,
				globals: {
					jQuery: true,
					$: true,
					console: true,
					module: true,
				},
			},
			all: ["Gruntfile.js", "src/js/*.js"],
		},
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-copy");
	// grunt.loadNpmTasks("grunt-contrib-imagemin");
	grunt.loadNpmTasks("grunt-contrib-cssmin");

	// Default task(s).
	grunt.registerTask("default", ["watch"]);
	// grunt.registerTask("dev", ["jshint", "clean", "copy", "uglify", "cssmin"]);
	grunt.registerTask("dev", ["clean", "copy", "uglify", "cssmin"]);
};
