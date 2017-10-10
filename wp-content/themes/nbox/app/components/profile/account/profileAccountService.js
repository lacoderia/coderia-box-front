'use strict';

nbox.factory('AccountService', ['$http', '$q', 'SessionService', 'API_URL_BASE', function($http, $q, SessionService, API_URL_BASE){

    var updateUser = function(data){
        var resetServiceURL = API_URL_BASE + '/users/' + SessionService.get().getId();
        return $http.put(resetServiceURL, {
            user: data
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

    return {
        updateUser: updateUser
    };

}]);

