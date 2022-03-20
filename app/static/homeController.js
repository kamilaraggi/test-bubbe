var app = angular.module('myApp');
  app.controller('HomeController', 
  function($scope, $rootScope, $stateParams, $state, AuthService) {
    $rootScope.title = 'Test Bubbe';
    $scope.user = $rootScope.user;
    $scope.usernameUp = function() {
        AuthService.newUsername($scope.username) 
      .then(function(response) {
          // success
          $scope.user.username = $scope.username;
          $scope.success = 'Successfully Updated!';
          $scope.username = '';
      },
      function(response) {
        $scope.success = '';
    });
   }
   $scope.passwordUp = function() {
    AuthService.newPassword($scope.password)
    .then(function(response){
      $scope.password = '';
      $scope.password_success = 'Successfully Updated!';
    }, function(response) {
      $scope.password_success = '';
    })
   }
   $scope.deleteBtn = function() {
    AuthService.delete()
    .then(function(response){
      $state.transitionTo('login');
    }, function(response) {
      $scope.delete_error = 'Internal Error';
    })
  }
  });