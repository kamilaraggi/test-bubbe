var app = angular.module('myApp');
  
app.factory('AuthService', AuthService);

AuthService.$inject = ['$http', '$rootScope', '$timeout'];
function AuthService($http, $rootScope, $timeout) {
    var isAuthenticated = false;
    var user = {};
    return {
      login : function(username, password) {
        
        return $http({
          url: '/api/user/login',
          method: "POST",
          data: { 
                  'username' : username,
                  'password' : password
                }
        })
      },
      getUser : function() {
        return user;
      },

      setUser : function(u){
        user = u;
        if(u.token){
          $http.defaults.headers.common['Authorization'] = 'Bearer ' + u.token;
        }
      },

      isAuthenticated : function() {
        return isAuthenticated;
      },
      setAuthenticated : function(auth) {
        isAuthenticated = auth ;
      },
      signup: function(firstname, lastname, username, password) {
        return $http({
          url: '/api/user',
          method: "POST",
          data: { 'firstname' : firstname, 
                  'lastname' : lastname,
                  'username' : username,
                  'password' : password
                }
        })
        
      },
      newUsername: function(username) {
        return $http({
          url: '/api/user/' + user.id,
          method: "PUT",
          data: { 
                  'id' : user.id,
                  'username' : username
                }
        })
      },

      newPassword: function(password) {
        return $http({
          url: '/api/user/' + user.id,
          method: "PUT",
          data: { 
                  'id' : user.id,
                  'password' : password
                }
        })
      },
      delete: function() {
        return $http({
          url: '/api/user/' + user.id,
          method: "DELETE",
          
        })
      }
    };
    
  };