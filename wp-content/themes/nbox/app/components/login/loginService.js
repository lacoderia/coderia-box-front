'use strict';

nbox.factory('LoginService', ['$http', '$q', 'SessionService', 'API_URL_BASE', function($http, $q, SessionService, API_URL_BASE){

    var login = function(user){
        var loginServiceURL = API_URL_BASE + '/users/sign_in';
        return $http.post(loginServiceURL, { user: user })
            .then(function(response) {
                var data = response.data;
                if (typeof data === 'object') {

                    if(data.user){

                        var headers = {
                            'accessToken' : response.headers('access-token'),
                            'expiry': response.headers('expiry'),
                            'tokenType': response.headers('token-type'),
                            'uid': response.headers('uid'),
                            'client': response.headers('client')
                        };

                        SessionService.setHttpHeaders(headers);

                        var user = data.user;
                        SessionService.createSession(user);
                    }

                    return data;
                } else {
                    return $q.reject(data);
                }

            }, function(error){
                return $q.reject(error.data);
            });
    };

    var signUp = function(user){
        var registerServiceURL = API_URL_BASE + '/users/sign_up';
        return $http.post(registerServiceURL, { user: user })
            .then(function(response) {
                var data = response.data;
                if (typeof data === 'object') {

                    if(data.user){
                        var headers = {
                            'accessToken' : response.headers('access-token'),
                            'expiry': response.headers('expiry'),
                            'tokenType': response.headers('token-type'),
                            'uid': response.headers('uid'),
                            'client': response.headers('client')
                        };

                        SessionService.setHttpHeaders(headers);

                        var user = data.user;
                        SessionService.createSession(user);
                    }

                    return data;
                } else {
                    return $q.reject(data);
                }

            }, function(error){
                return $q.reject(error.data);
            });
    };

    var recoverPassword = function(forgot){
        var forgotServiceURL = API_URL_BASE + '/users/password';
        return $http.post(forgotServiceURL, {
                    utf8: 'V',
                    user: forgot
                })
            .then(function(response) {
                var data = response.data;
                if (typeof data === 'object') {
                    return data;
                } else {
                    return $q.reject(data);
                }

            }, function(error){
                return $q.reject(error.data);
            });
    };

    var resetPassword = function(reset){
        var resetServiceURL = API_URL_BASE + '/auth/password';
        return $http.put(resetServiceURL, {
                    utf8: 'V',
                    user: reset
                })
            .then(function(response) {
                var data = response.data;
                if (typeof data === 'object') {
                    if(data.user){
                        var user = data.user;
                        SessionService.createSession(user);
                    }
                    return data;
                } else {
                    return $q.reject(data);
                }

            }, function(error){
                return $q.reject(error.data);
            });
    };

    var logout = function(){
        var logoutServiceURL = API_URL_BASE + '/logout.json';
        return $http.get(logoutServiceURL)
            .then(function(response) {
                var data = response.data;

                SessionService.destroySession();
                SessionService.unsetHttpHeaders();

                return data;

            }, function(error){
                return $q.reject(error.data);
            });
    };

    var getCurrentSession = function(){
        var sessionServiceURL = API_URL_BASE + '/session';
        return $http.get(sessionServiceURL, {})
            .then(function(response){
                var data = response.data;
                if (typeof data === 'object') {

                    if(data.user){
                        var headers = {
                            'accessToken' : response.headers('access-token'),
                            'expiry': response.headers('expiry'),
                            'tokenType': response.headers('token-type'),
                            'uid': response.headers('uid'),
                            'client': response.headers('client')
                        };

                        SessionService.setHttpHeaders(headers);

                        var user = data.user;
                        SessionService.createSession(user);
                    }

                    return data;
                } else {
                    return $q.reject(data);
                }
            },
            function(error){
                return $q.reject(error.data);
            });
    };

    return {
        login: login,
        signUp: signUp,
        logout: logout,
        recoverPassword: recoverPassword,
        resetPassword: resetPassword,
        getCurrentSession: getCurrentSession
    }

}]);
