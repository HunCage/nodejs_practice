superhero.factory("userFactory", [
	"$http",
	"$q",
	function ($http, $q) {
		return {
			getAll: function () {
				let deferred = $q.defer();

				$http.get("/users").then(
					function (serverData) {
						deferred.resolve(serverData.data);
					},
					function (err) {
						deferred.reject(err);
					}
				);

				return deferred.promise;
			},
			saveUser: function (row) {
				let deferred = $q.defer();

				$http.post("/users", row).then(
					function (serverData) {
						deferred.resolve(serverData.data);
					},
					function (err) {
						deferred.reject(err);
					}
				);

				return deferred.promise;
			},
			deleteUser: function (row) {
				let deferred = $q.defer();

				$http.delete("/users/" + row._id).then(
					function (serverData) {
						deferred.resolve(serverData.data);
					},
					function (err) {
						deferred.reject(err);
					}
				);

				return deferred.promise;
			},
			insertUser: function (row) {
				let deferred = $q.defer();

				$http.put("/users", row).then(
					function (serverData) {
						deferred.resolve(serverData.data);
					},
					function (err) {
						deferred.reject(err);
					}
				);

				return deferred.promise;
			},
		};
	},
]);
