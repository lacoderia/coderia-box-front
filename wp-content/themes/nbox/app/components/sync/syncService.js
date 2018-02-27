'use strict';

nbox.factory('SyncService', ['$http', '$q', '$rootScope', 'SessionService', 'API_URL_BASE', function($http, $q, $rootScope, SessionService, API_URL_BASE){

    /**
     *
     */
    var syncUser = undefined;

    // Service API Definition
    /**
     *
     * @param msg
     * @param data
     */
    var broadcast = function(msg, data) {
        $rootScope.$broadcast(msg, data);
    };

    /**
     * Returns the syncUser
     * @returns {*[]}
     */
    var getSyncUser = function() {
        return angular.copy(syncUser);
    };

    /**
     *  Authenticates user on remote server
     */
    var remoteLogin = function(user){
        var serviceURL = API_URL_BASE + '/users/remote_authenticate';
        return $http.post(serviceURL, { email: user.email, password: user.password })
            .then(function(response) {
                var data = response.data;
                if (typeof data === 'object') {

                    if(data.user){
                        syncUser = user;
                    }

                    return data;
                } else {
                    return $q.reject(data);
                }

            }, function(error){
                return $q.reject(error.data);
            });
    };

    /**
     *  Synchronizes user's credentials on remote server
     */
    var synchronizeUser = function(user){
        var serviceURL = API_URL_BASE + '/users/synchronize_accounts';
        return $http.post(serviceURL, { email: user.email, password: user.password })
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
                    }

                    return data;
                } else {
                    return $q.reject(data);
                }

            }, function(error){
                return $q.reject(error.data);
            });
    };

    /**
     *  Migrates user's data on remote server
     */
    var migrateUser = function(){
        var serviceURL = API_URL_BASE + '/users/migrate_accounts';
        return $http.post(serviceURL, {})
            .then(function(response) {
                var data = response.data;
                if (typeof data === 'object') {

                    if(data.user) {
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

    return {
        broadcast: broadcast,
        getSyncUser: getSyncUser,
        remoteLogin: remoteLogin,
        synchronizeUser: synchronizeUser,
        migrateUser: migrateUser
    }

}]);
