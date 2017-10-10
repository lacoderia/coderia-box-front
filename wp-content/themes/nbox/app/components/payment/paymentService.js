'use strict';

nbox.factory('PaymentService', ['$http', '$q', '$rootScope', 'SessionService', 'LoggerService', 'API_URL_BASE', function($http, $q, $rootScope, SessionService, LoggerService, API_URL_BASE){

    // Variables definition
    /**
     *  Service object
     */
    var service;

    var primaryCard = undefined;

    /**
     *
     * @param msg
     * @param data
     */
    var broadcast = function(msg, data) {
        $rootScope.$broadcast(msg, data);
    };

    var transformToCard = function(item) {
        var card = undefined;

        try {
            card = new Card(item.active, item.brand, undefined, item.exp_month, item.exp_year, item.last4, item.name, item.phone, item.primary, false, item.uid);

            switch (item.brand){
                case 'VISA':
                    card.setBrandClass('icon-cc-visa');
                    break;
                case 'MC':
                    card.setBrandClass('icon-cc-mastercard');
                    break;
                case 'AMERICAN_EXPRESS':
                    card.setBrandClass('icon-cc-amex');
                    break;
            }

        } catch(error){
            LoggerService.$logger().error(error);
        }

        return card;
    };

    var callPrimaryCard = function() {
        var cardsServiceURL = API_URL_BASE + '/cards/get_primary_for_user';
        return $http.get(cardsServiceURL)
            .then(function(response) {
                var data = response.data;
                if (typeof data === 'object') {
                    if(data.card){
                        setPrimaryCard(data.card);
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
     *
     * @returns {Card}
     */
    var getPrimaryCard = function() {
        return angular.copy(primaryCard);
    };

    var setPrimaryCard = function(card) {
        try {
            primaryCard = transformToCard(card);
        } catch(error) {
            LoggerService.$logger().error(error);
        }
    };

    var saveCard = function(token, phoneNumber){

        var cardsServiceURL = API_URL_BASE + '/cards/register_for_user';
        return $http.post(cardsServiceURL, {token: token, phone: phoneNumber})
            .then(function(response) {
                var data = response.data;
                if (typeof data === 'object') {
                    if(data.card){
                        setPrimaryCard(data.card);
                    }

                    return data;
                } else {
                    return $q.reject(data);
                }

            }, function(error){
                return $q.reject(error.data);
            });

    };

    var applyDiscount = function(packId, coupon) {
        var discountServiceURL = '';
        if(coupon){
            discountServiceURL = API_URL_BASE + '/discounts/validate_with_coupon';
        } else {
            discountServiceURL = API_URL_BASE + '/discounts/validate_with_credits';
        }

        return $http.post(discountServiceURL, {
            pack_id: packId,
            coupon: coupon
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

    var processPayment = function(packId, price, discount) {
        var cardsServiceURL = API_URL_BASE + '/purchases/charge';

        var params = {
            pack_id: packId,
            uid: primaryCard.getUid(),
            price: price
        };

        if (discount.type){
            if (discount.coupon) {
                params.coupon = discount.coupon;
            } else {
                params.credits = SessionService.get().getBalance();
            }
        }

        return $http.post(cardsServiceURL, params)
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

    service = {
        broadcast: broadcast,
        callPrimaryCard: callPrimaryCard,
        getPrimaryCard: getPrimaryCard,
        setPrimaryCard: setPrimaryCard,
        saveCard: saveCard,
        applyDiscount: applyDiscount,
        processPayment: processPayment
    };

    return service;

}]);

