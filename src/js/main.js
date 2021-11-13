// const jQuery = require('jquery');

/* $.getJSON("users", function (users) {
	console.log("users: ", users);
});
 */

/* AngularJS
    Module
    Controller
    Factory
    Service
    Filter
    Directive
*/

/* Main Module */
var superhero = angular.module("superhero", ["currencyModule"]);

/* The start of the module run */
superhero.run(["$http", function ($http) {
	$http.defaults.headers.common["x-requested-with"] =
		"XMLHttpRequest";
}]);


/* Controller */
