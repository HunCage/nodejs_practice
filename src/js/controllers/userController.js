superhero.controller("userController", [
	"$scope",
	"userService",
	"userFactory",
	function ($scope, userService, userFactory) {
		// users
		$scope.users = [];
		$scope.ths = ["#", "name", "email", "phone", "actions"];
		$scope.newUser = {};
		$scope.formError = {};

		// get user
		userService.getAll().then(
			function (userData) {
				$scope.users = userData;
			},
			function (err) {
				console.error("Error while getting user data: ", err);
			}
		);

		// save.
		$scope.updateRecord = function (row) {
			userFactory.saveUser(row).then(function () {
				alert("User saved!");
			});
		};

		// delete data
		$scope.deleteUser = function (row) {
			userFactory.deleteUser(row).then(function (deleted) {
				if (deleted.ok) {
					let index = $scope.users.indexOf(row);
					$scope.users.splice(index, 1);
				} else {
					alert("Error, not deleted: " + row.name);
				}
			});
		};

		// data control
		$scope.checkNewUser = function (row) {
			$scope.formError = {};
			let fields = ["name", "email", "phone"];
			let returnValue = true;
			for (let k in fields) {
				if (
					row[fields[k]] == "" ||
					angular.isUndefined(row[fields[k]])
				) {
					$scope.formError[fields[k]] = true;
					returnValue = false;
				}
			}
			return returnValue;
		};

		// new record
		$scope.insertRecord = function (row) {
			if (!$scope.checkNewUser(row)) return;
			userFactory.insertUser(row).then(function (newUser) {
				$scope.users.push(newUser);
				$scope.newUser = {};
			});
		};
	},
]);
