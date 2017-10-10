'use strict';

nbox.factory('DashboardService', ['$http', '$q', 'SessionService', 'API_URL_BASE', function($http, $q, SessionService, API_URL_BASE){

    var sendMail = function(sharing){
        var sharingServiceURL = API_URL_BASE + '/users/' + SessionService.get().getId() + '/send_coupon_by_email';
        return $http.post(sharingServiceURL, {
                    utf8: 'V',
                    email: sharing.email
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

    return {
        sendMail: sendMail
    }

}]);
