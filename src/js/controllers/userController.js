superhero.controller("userController", [
	"$scope",
	"userService",
	function ($scope, userService) {
		/* users */
		$scope.users = [];
        $scope.ths = ['#', 'name', 'email', 'phone'];

		userService.getAll().then(
			function (userData) {
				$scope.users = userData;
			},
			function (error) {
				console.error("Error while getting user data: ", error);
			}
		);
	},
]);
