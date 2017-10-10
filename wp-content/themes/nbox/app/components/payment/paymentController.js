'use strict';

nbox.controller('PaymentController', ['$rootScope', '$scope', '$timeout', '$document', '$location', 'PaymentService', 'PackService', 'SessionService', 'LoggerService', 'UtilsService', 'localStorageService', 'usSpinnerService', 'DEFAULT_VALUES', function($rootScope, $scope, $timeout, $document, $location, PaymentService, PackService, SessionService, LoggerService, UtilsService, localStorageService, usSpinnerService, DEFAULT_VALUES){

    var paymentCtrl = this;

    paymentCtrl.MONTHS = DEFAULT_VALUES.MONTHS;
    paymentCtrl.PROFILE_MODULES = DEFAULT_VALUES.PROFILE_MODULES;

    paymentCtrl.availableYears;
    paymentCtrl.primaryCard;

    paymentCtrl.processingPayment = false;

    /**
     *
     * @type {boolean}
     */
    var _isNewCardActive = false;

    paymentCtrl.newCard = {
        debitCardHolder: '',
        debitCardNumber : '',
        expirationMonth : undefined,
        expirationYear: undefined,
        debitCardValidationNumber: undefined
    };

    // Private variables

    var originalNewCard = angular.copy(paymentCtrl.newCard);

    /**
     * Determines if the payment container is shown
     * @type {boolean}
     */
    var showPayment = false;

    /**
     * Determines if the user is only buying (not booking)
     * @type {boolean}
     */
    var onlyBuying = false;

    /**
     * Holds the purchase total and purchase discount based on coupon or balance
     */

    var purchase = {
        discount: {
            type: '',
            amount: 0,
            coupon: ''
        },
        total: undefined
    };

    paymentCtrl.coupon = {
        coupon: ''
    };

    var showCouponForm = '';

    paymentCtrl.formErrorMessage = '';

    /**
     * Holds the original purchase object
     */
    var originalPurchase = angular.copy(purchase);

    /**
     * Holds the original coupon object
     */
    var originalCoupon = angular.copy(paymentCtrl.coupon);

    // Listeners

    $scope.$on('sessionCreated', function($event, args) {
        setPrimaryCard();
    });

    $scope.$on('packSelected', function($event, args) {
        setShowPayment(true);
        paymentCtrl.cancelDiscount();
    });

    $scope.$on('userBoughtClasses', function($event, args) {
        setShowPayment(false);
    });

    /**
     * Listens for 'closePacksView' event
     */
    $scope.$on('closePacksView', function(){
        setShowPayment(false);
    });

    // Function definition

    /**
     * Determines if the payment container is shown
     * @returns {boolean}
     */
    paymentCtrl.isVisible = function() {
        return showPayment;
    };

    /**
     *
     * @param show
     */
    var setShowPayment = function(show) {
        showPayment = show;
        if(show){
            $timeout(function (){
                var paymentContainer = angular.element(document.getElementById('payment'));
                $document.scrollToElement(paymentContainer, 100, 800);
            },0);
        }
    };

    var setPrimaryCard = function() {
        PaymentService.callPrimaryCard()
            .then(function(data) {
                if (data.card) {
                    paymentCtrl.primaryCard = PaymentService.getPrimaryCard();
                }
            }, function(error) {
                if(error && error.errors){
                    var errorMessage = '<strong>¡Oops! Hubo un error al obtener tu tarjeta principal</strong>, por favor intenta de nuevo';
                    alertify.log(errorMessage, 'error', 5000);
                } else {
                    var errorMessage = '<strong>¡Oops! Hubo un error al cambiar tu tarjeta principal</strong>, por favor intenta de nuevo';
                    alertify.log(errorMessage, 'error', 5000);
                }
                LoggerService.$logger().error(error);
            });
    };

    paymentCtrl.hasPrimaryCard = function() {
        return paymentCtrl.primaryCard && paymentCtrl.primaryCard.getUid();
    };

    /**
     * Determines if the packs container is shown
     * @returns {boolean}
     */
    var isOnlyBuying = function() {
        return !document.getElementsByClassName('booking-component').length;
    };

    /**
     *
     * @returns {*}
     */
    paymentCtrl.getSelectedPack = function() {
        return PackService.getSelectedPack();
    };

    paymentCtrl.getUserBalance = function() {
        return (SessionService.get())? SessionService.get().getBalance(): 0;
    };

    paymentCtrl.showCouponForm = function() {
        showCouponForm = true;
    };

    paymentCtrl.hideCouponForm = function() {
        showCouponForm = false;
    };

    paymentCtrl.isCouponFormVisible = function() {
        return showCouponForm;
    };

    paymentCtrl.cancelDiscount = function() {
        purchase = angular.copy(originalPurchase);
        paymentCtrl.coupon = angular.copy(originalCoupon);
        paymentCtrl.hideCouponForm();
        paymentCtrl.formErrorMessage = '';
    };

    paymentCtrl.applyDiscount = function(type) {
        var pack = PackService.getSelectedPack();
        var coupon = paymentCtrl.coupon.coupon;

        paymentCtrl.formErrorMessage = '';
        usSpinnerService.spin('discount-spinner');

        PaymentService.applyDiscount(pack.getId(), coupon)
            .then(function(data) {
                usSpinnerService.stop('discount-spinner');
                if (data.discount) {

                    if (data.discount.coupon) {
                        purchase.discount.amount = data.discount.discount;
                        purchase.discount.coupon = data.discount.coupon;
                    } else {
                        purchase.discount.amount = data.discount.initial_credits - data.discount.final_credits;
                    }

                    purchase.discount.type = type;
                    purchase.total = data.discount.final_price;
                    paymentCtrl.hideCouponForm();
                }
            }, function(error) {
                if(error && error.errors){
                    paymentCtrl.formErrorMessage = error.errors[0].title;
                    LoggerService.$logger().error(error.errors[0].title);
                } else {
                    LoggerService.$logger().error(error);
                }
                LoggerService.$logger().error(error);
                usSpinnerService.stop('discount-spinner');
            });
    };

    paymentCtrl.getDiscountType = function() {
        return purchase.discount.type;
    };

    paymentCtrl.getDiscountAmount = function() {
        return purchase.discount.amount;
    };

    paymentCtrl.getPurchaseTotal = function() {
        return (purchase.total !== undefined) ? purchase.total: PackService.getSelectedPackPrice();
    };

    paymentCtrl.processPayment = function(){

        if(paymentCtrl.hasPrimaryCard()) {

            chargePayment();

        } else if (paymentCtrl.newCardForm.$valid) {

            var card = {
                "card": {
                    "number": paymentCtrl.newCard.debitCardNumber,
                    "name": paymentCtrl.newCard.debitCardHolder,
                    "exp_year": paymentCtrl.newCard.expirationYear,
                    "exp_month": paymentCtrl.newCard.expirationMonth,
                    "cvc": paymentCtrl.newCard.debitCardValidationNumber
                }
            };

            usSpinnerService.spin('full-spinner');
            paymentCtrl.processingPayment = true;

            Conekta.token.create(
                card,
                function(token){
                    PaymentService.saveCard(token.id, paymentCtrl.newCard.phoneNumber)
                        .then(function(data) {
                            usSpinnerService.stop('full-spinner');
                            paymentCtrl.processingPayment = false;
                            if (data.card) {
                                chargePayment();
                            }
                        }, function(error) {
                            if(error && error.errors){
                                var errorMessage = '<strong>¡Oops! Hubo un error al registrar la tarjeta</strong>, por favor intenta de nuevo';
                                alertify.log(errorMessage, 'error', 5000);
                            } else {
                                var errorMessage = '<strong>¡Oops! Hubo un error al registrar la tarjeta</strong>, por favor intenta de nuevo';
                                alertify.log(errorMessage, 'error', 5000);
                            }
                            LoggerService.$logger().error(error);
                            usSpinnerService.stop('full-spinner');
                            paymentCtrl.processingPayment = false;
                        });
                },
                function(error){
                    var errorMessage = '<strong>¡Oops! Hubo un error al registrar la tarjeta</strong>, por favor, intenta nuevamente';
                    alertify.log(errorMessage, 'error', 5000);
                    LoggerService.$logger().error(error.message_to_purchaser);
                    usSpinnerService.stop('full-spinner');
                    paymentCtrl.processingPayment = false;
                });
        }
    };

    var chargePayment = function() {
        var pack = PackService.getSelectedPack();
        var price = paymentCtrl.getPurchaseTotal();

        usSpinnerService.spin('full-spinner');
        paymentCtrl.processingPayment = true;

        PaymentService.processPayment(pack.getId(), price, purchase.discount)
            .then(function(data) {
                if (data.purchase) {

                    if (isOnlyBuying()){
                        var purchaseResume = {
                            'price': price,
                            'classes': pack.getClasses()
                        };
                        localStorageService.set('nbx-purchase', purchaseResume);
                        window.location.href = UtilsService.getHomeUrl() + 'compra-success';
                    } else {
                        SessionService.createSession(data.purchase.user);
                        paymentCtrl.primaryCard = PaymentService.getPrimaryCard();
                        PaymentService.broadcast('userBoughtClasses');

                        var successMessage = '<strong>¡Enhorabuena! Se registró correctamente el pago</strong>, ya puedes reservar un entrenamiento';
                        alertify.log(successMessage, 'success', 5000);

                        usSpinnerService.stop('full-spinner');
                        paymentCtrl.processingPayment = false;
                    }
                }
            }, function(error) {
                if(error && error.errors){
                    var errorMessage = '<strong>¡Oops! Hubo un error al procesar el pago</strong>, ' + error.errors[0].title;
                    alertify.log(errorMessage, 'error', 5000);
                } else {
                    var errorMessage = '<strong>¡Oops! Hubo un error al procesar el pago</strong>, por favor intenta de nuevo';
                    alertify.log(errorMessage, 'error', 5000);
                }
                LoggerService.$logger().error(error);
                usSpinnerService.stop('full-spinner');
                paymentCtrl.processingPayment = false;
            });
    };

    var getAvailableYears = function(){
        paymentCtrl.availableYears = [];
        var currentYear = new Date().getYear() + DEFAULT_VALUES.START_YEAR;
        for(var i=0; i<=16; i++){
            paymentCtrl.availableYears.push(currentYear);
            currentYear++;
        }
    };

    paymentCtrl.isNewCardActive = function() {
        return _isNewCardActive;
    };

    paymentCtrl.setNewCardFormStatus = function(isNewCardActive) {
        _isNewCardActive = isNewCardActive;
    };

    paymentCtrl.redirectProfilePayment = function() {
        window.location.href = UtilsService.getHomeUrl() + 'mi-cuenta/#' + paymentCtrl.PROFILE_MODULES.PAYMENTS.code;
    };

    paymentCtrl.init = function(conekta){
        Conekta.setPublishableKey(conekta);
        getAvailableYears();
    };

}]);
