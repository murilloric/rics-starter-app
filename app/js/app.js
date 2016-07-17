var MASTERAPP = angular.module('masterapp',['ionic', 'ngCookies'])

MASTERAPP.config(['$stateProvider', '$ionicConfigProvider', '$urlRouterProvider', function($stateProvider, $ionicConfigProvider, $urlRouterProvider) {
  //$ionicConfigProvider.views.transition(true);
  $ionicConfigProvider.templates.maxPrefetch(0);
  $ionicConfigProvider.views.maxCache(0);
  $ionicConfigProvider.scrolling.jsScrolling(true)


  $urlRouterProvider.otherwise('/home')

  $stateProvider.state('home', {
    url: '/home',
    templateUrl: '/partials/home.html',
    controller:'homeCtrl'
  })

}]);