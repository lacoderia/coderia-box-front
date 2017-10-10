'use strict';

nbox.controller('ProfilePaymentController',['ProfilePaymentService', 'LoggerService', 'usSpinnerService', 'UtilsService', 'DEFAULT_VALUES' ,function(ProfilePaymentService, LoggerService, usSpinnerService, UtilsService, DEFAULT_VALUES){

    var profilePaymentCtrl = this;

    profilePaymentCtrl.MONTHS = DEFAULT_VALUES.MONTHS;
    profilePaymentCtrl.PAYMENT_METHODS_BUTTONS = DEFAULT_VALUES.PAYMENT_METHODS_BUTTONS;

    profilePaymentCtrl.primaryCard = undefined;
    profilePaymentCtrl.cards = undefined;
    profilePaymentCtrl.paymentMessage = undefined;


    profilePaymentCtrl.newCard = {
        debitCardHolder: '',
        debitCardNumber : '',
        expirationMonth : undefined,
        expirationYear: undefined,
        debitCardValidationNumber: undefined
    };

    profilePaymentCtrl.availableYears = [];

    // Private variables

    var originalNewCard = angular.copy(profilePaymentCtrl.newCard);

    /**
     * Determines if the new card container is shown
     * @type {boolean}
     */
    var _showNewCard = false;

    /**
     *
     * @type {boolean}
     */
    var _isNewCardActive = false;

    // Function definition

    /**
     * Determines if the classroom container is shown
     * @returns {boolean}
     */
    profilePaymentCtrl.isNewCardVisible = function() {
        return _showNewCard;
    };

    /**
     *
     * @returns {boolean}
     */
    profilePaymentCtrl.isNewCardActive = function() {
        return _isNewCardActive;
    };

    /**
     *
     */
    profilePaymentCtrl.hideNewCard = function(){
        _showNewCard = false;
    };

    /**
     *
     */
    profilePaymentCtrl.showNewCard = function() {

        profilePaymentCtrl.newCard = angular.copy(originalNewCard);
        profilePaymentCtrl.paymentMessage = '';
        profilePaymentCtrl.newCardForm.$setPristine();
        profilePaymentCtrl.newCardForm.$setUntouched();

        _showNewCard = true;

    };

    profilePaymentCtrl.toggleCardInfo = function(cardItem){
        angular.forEach(profilePaymentCtrl.cards, function(card){
            if(cardItem.getUid() != card.getUid()){
                card.setShowInfo(false);
            }else{
                if(card.getShowInfo()){
                    card.setShowInfo(false);
                }else{
                    card.setShowInfo(true);
                }
            }
        });

    };

    profilePaymentCtrl.saveCard = function(){

        var card = {
            "card": {
                "number": profilePaymentCtrl.newCard.debitCardNumber,
                "name": profilePaymentCtrl.newCard.debitCardHolder,
                "exp_year": profilePaymentCtrl.newCard.expirationYear,
                "exp_month": profilePaymentCtrl.newCard.expirationMonth,
                "cvc": profilePaymentCtrl.newCard.debitCardValidationNumber
            }
        };

        if (profilePaymentCtrl.newCardForm.$valid) {

            profilePaymentCtrl.paymentMessage = '';
            usSpinnerService.spin('payments-spinner');

            Conekta.token.create(
                card,
                function(token){
                    ProfilePaymentService.saveCard(token.id, profilePaymentCtrl.newCard.phoneNumber)
                        .then(function(data) {
                            if (data.card) {
                                profilePaymentCtrl.cards = ProfilePaymentService.getCards();
                                profilePaymentCtrl.hideNewCard();
                            }
                            usSpinnerService.stop('payments-spinner');
                        }, function(error) {
                            if(error && error.errors){
                                var errorMessage = '<strong>¡Oops! Hubo un error al registrar la tarjeta</strong>, por favor intenta de nuevo';
                                alertify.log(errorMessage, 'error', 5000);
                            } else {
                                var errorMessage = '<strong>¡Oops! Hubo un error al registrar la tarjeta</strong>, por favor intenta de nuevo';
                                alertify.log(errorMessage, 'error', 5000);
                            }
                            LoggerService.$logger().error(error);
                            usSpinnerService.stop('payments-spinner');
                        });
                },
                function(error){
                    var errorMessage = '<strong>¡Oops! Hubo un error al registrar la tarjeta</strong>, por favor, intenta nuevamente';
                    alertify.log(errorMessage, 'error', 5000);
                    LoggerService.$logger().error(error.message_to_purchaser);
                    usSpinnerService.stop('payments-spinner');
                });

        }

    };

    profilePaymentCtrl.callButtonAction = function(action, card){
        switch (action){
            case 'change-main-account':
                usSpinnerService.spin('payments-spinner');
                ProfilePaymentService.changePrimaryCard(card.getUid())
                    .then(function(data) {
                        if (data.card) {
                            profilePaymentCtrl.cards = ProfilePaymentService.getCards();
                        }
                        usSpinnerService.stop('payments-spinner');
                    }, function(error) {
                        if(error && error.errors){
                            var errorMessage = '<strong>¡Oops! Hubo un error al cambiar la tarjeta principal</strong>, por favor intenta de nuevo';
                            alertify.log(errorMessage, 'error', 5000);
                        } else {
                            var errorMessage = '<strong>¡Oops! Hubo un error al cambiar la tarjeta principal</strong>, por favor intenta de nuevo';
                            alertify.log(errorMessage, 'error', 5000);
                        }
                        LoggerService.$logger().error(error);
                        usSpinnerService.stop('payments-spinner');
                    });
                break;
            case  'delete-account':
                usSpinnerService.spin('payments-spinner');
                ProfilePaymentService.deleteCard(card.getUid())
                    .then(function(data) {
                        if (data.cards) {
                            profilePaymentCtrl.cards = ProfilePaymentService.getCards();
                        }
                        usSpinnerService.stop('payments-spinner');
                    }, function(error) {
                        if(error && error.errors){
                            var errorMessage = '<strong>¡Oops!</strong>, ' + error.errors[0].title;
                            alertify.log(errorMessage, 'error', 5000);
                        } else {
                            var errorMessage = '<strong>¡Oops! Hubo un error al eliminar la tarjeta</strong>, por favor intenta de nuevo';
                            alertify.log(errorMessage, 'error', 5000);
                        }
                        LoggerService.$logger().error(error);
                        usSpinnerService.stop('payments-spinner');
                    });
                break;
        }
    };

    profilePaymentCtrl.hasPrimaryCard = function() {
        if(profilePaymentCtrl.primaryCard){
            if(Object.keys(profilePaymentCtrl.primaryCard).length != 0){
                return true;
            }
        }
        return false;
    };

    profilePaymentCtrl.showActionButtons = function(primary, action){
        var buttonVisibility = true;
        switch (action){
            case 'change-main-account':
                if (primary) {
                    buttonVisibility = false;
                }
                break;
            case  'delete-account':
                if (profilePaymentCtrl.cards.length <= 1) {
                    buttonVisibility =  false;
                }
                break;
        }

        return buttonVisibility;
    };

     var setAvailableYears = function(){
         profilePaymentCtrl.availableYears = [];
        var currentYear = new Date().getYear() + DEFAULT_VALUES.START_YEAR;
        for(var i=0; i<=16; i++){
            profilePaymentCtrl.availableYears.push(currentYear);
            currentYear++;
        }
    };

    /**
     *
     * @returns {boolean}
     */
    profilePaymentCtrl.hasCards = function () {
        if(profilePaymentCtrl.cards){
            if(profilePaymentCtrl.cards.length){
                return true;
            }
        }
        return false;
    };

    profilePaymentCtrl.setNewCardFormStatus = function(isNewCardActive) {
        _isNewCardActive = isNewCardActive;
    };

    profilePaymentCtrl.init = function(conekta, cards){
        setAvailableYears();

        Conekta.setPublishableKey(conekta);

        ProfilePaymentService.setCards(cards);
        profilePaymentCtrl.cards = ProfilePaymentService.getCards();

    };

    profilePaymentCtrl.initDashboard = function(card) {
        setAvailableYears();

        ProfilePaymentService.setPrimaryCard(card);
        profilePaymentCtrl.primaryCard = ProfilePaymentService.getPrimaryCard();
    }

}]);
