'use strict';

nbox.factory('ProfilePaymentService', ['$http', '$q', 'LoggerService', 'API_URL_BASE', function($http, $q, LoggerService, API_URL_BASE){

    // Variables definition
    /**
     *  Service object
     */
    var service;

    var cards = undefined;

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

    var transformToObject = function(cards){
        var list = [];

        try {
            for (var i=0; i<cards.length; i++) {
                var item = cards[i];
                var card = new Card(item.active, item.brand, undefined, item.exp_month, item.exp_year, item.last4, item.name, item.phone, item.primary, false, item.uid);

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
                if (card.getActive()){
                    list.push(card);
                }
            }

        } catch(error){
            LoggerService.$logger().error(error);
        }

        return list;
    };

    var addCard = function(card) {
        try {
            cards.push(transformToCard(card));
        } catch(error) {
            LoggerService.$logger().error(error);
        }
    };

    var refreshPrimaryCard = function(card) {
        for(var i=0; i<cards.length; i++) {
            if(card.uid == cards[i].getUid()){
                cards[i].setPrimary(true);
            } else {
                cards[i].setPrimary(false);
            }
        }
    };

    /**
     *
     * @returns {Array}
     */
    var getCards = function() {
        return angular.copy(cards);
    };

    /**
     *
     * @param cardsList
     */
    var setCards = function(cardsList) {
        try {
            cards = transformToObject(cardsList);
        } catch(error) {
            LoggerService.$logger().error(error);
        }
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
            if(card){
                primaryCard = transformToCard(card);
            }
        } catch(error) {
            LoggerService.$logger().error(error);
        }
    };

    var changePrimaryCard = function(cardUid){

        var cardsServiceURL = API_URL_BASE + '/cards/set_primary_for_user';

        return $http.post(cardsServiceURL, {'card_uid': cardUid})
            .then(function(response) {
                var data = response.data;
                if (typeof data === 'object') {
                    if(data.card){
                        refreshPrimaryCard(data.card);
                    }

                    return data;
                } else {
                    return $q.reject(data);
                }

            }, function(error){
                return $q.reject(error.data);
            });

    };

    var saveCard = function(token, phoneNumber){

        var cardsServiceURL = API_URL_BASE + '/cards/register_for_user';
        return $http.post(cardsServiceURL, {token: token, phone: phoneNumber})
            .then(function(response) {
                var data = response.data;
                if (typeof data === 'object') {
                    if(data.card){
                        addCard(data.card);
                    }

                    return data;
                } else {
                    return $q.reject(data);
                }

            }, function(error){
                return $q.reject(error.data);
            });

    };

    var deleteCard = function(cardUid){

        var cardsServiceURL = API_URL_BASE + '/cards/delete_for_user';

        return $http.post(cardsServiceURL, {'card_uid': cardUid})
            .then(function(response) {
                var data = response.data;
                if (typeof data === 'object') {
                    if(data.cards){
                        setCards(data.cards);
                    }

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
        getCards: getCards,
        setCards: setCards,
        getPrimaryCard: getPrimaryCard,
        setPrimaryCard: setPrimaryCard,
        changePrimaryCard: changePrimaryCard,
        saveCard: saveCard,
        deleteCard: deleteCard
    };

    return service;

}]);

