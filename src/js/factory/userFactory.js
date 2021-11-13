superhero.factory("userFactory", [
	"$http",
	"$q",
	function ($http, $q) {
		/* Get Users */
		return {
			getAll: function () {
				var deferred = $q.defer();

				$http.get("/users").then(
					function (serverData) {
						deferred.resolve(serverData.data);
					},
					function (error) {
						deferred.reject(error);
					}
				);

				return deferred.promise;
			},
		};
	},
]);
