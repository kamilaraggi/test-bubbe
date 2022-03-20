var app = angular.module('myApp');
app.controller('SignupController', function($scope, $rootScope, $stateParams, $state, AuthService) {
    $rootScope.title = 'Test Bubbe';
   
   $scope.formSubmit = function() {
    AuthService.signup($scope.firstname, $scope.lastname, $scope.username, $scope.password) 
    .then(function(res) {
        // success
        AuthService.setUser(res.data);
        $rootScope.user = res.data;
        AuthService.setAuthenticated(true);
        $scope.error = '';
        $scope.firstname = '';
        $scope.lastname = '';
        $scope.username = '';
        $scope.password = '';
        $state.transitionTo('home');
    }, 
    function(response) { // optional
            // failed
        $scope.error = "Error!";
    });
        
   };    
 });