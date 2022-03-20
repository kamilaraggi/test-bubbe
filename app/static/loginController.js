var app = angular.module('myApp');
app.controller('LoginController', function($scope, $rootScope, $stateParams, $state, AuthService) {
   $rootScope.title = 'Test Bubbe';
   
   $scope.formSubmit = function() {
     AuthService.login($scope.username, $scope.password)
     .then(function(res){
      AuthService.setAuthenticated(true);
      AuthService.setUser(res.data)
      $rootScope.user = res.data;
      $scope.error = '';
      $scope.username = '';
      $scope.password = '';
      $state.transitionTo('home');
     }, function(){
      AuthService.setAuthenticated(false);
      $scope.error = "Incorrect username/password !";
     }) 
   };    
 });