MASTERAPP.factory('ricsAPI', ['$http', '$state', '$cookies', '$ionicPopup', function($http, $state, $cookies, $ionicPopup){



	var service = {}

	service.searchApp = function(search_term, callBack){
		var search_result = []
		return callBack(search_result)
	}

	return service

}]);