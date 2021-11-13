superhero.controller("priceController", [
	"$scope",
	"$http",
	function ($scope, $http) {
		/* Watched Variable - yourPrice */
		$scope.$watch("yourPrice", function (newValue, oldValue) {
			console.log(newValue, oldValue);
		});

		/* Calculate a new Value */
		$scope.calcOwnPrice = function (price) {
			price = price.toString().replace(/[^0-9]/g, "");
			newPrice = parseFloat(price) * 0.7;
			return isNaN(newPrice) ? 0 : newPrice;
		};

		$scope.calcOtherPrice = function (price) {
			price = price.toString().replace(/[^0-9]/g, "");
			newPrice = parseFloat(price) * 0.9;
			return isNaN(newPrice) ? 0 : newPrice;
		};

		// $scope.calcFullPrice = function (price) {
		// 	price = price.toString().replace(/[^0-9]/g, "");
		// 	newPrice = parseInt(price);
		// 	return isNaN(newPrice) ? 0 : newPrice;
		// };

		$scope.yourPrice = 999;
	},
]);
