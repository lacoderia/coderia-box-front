'use strict';

nbox.controller('DashboardController', ['$rootScope', '$scope', 'SessionService', 'SocialService', 'DashboardService', 'LoggerService', 'usSpinnerService', function($rootScope, $scope, SessionService, SocialService, DashboardService, LoggerService, usSpinnerService){

    var dashboardCtrl = this;
    var showMailForm = false;

    dashboardCtrl.social = {};

    // Object that holds the email sharing data

    dashboardCtrl.sharing = {
        email: ''
    };

    // Private variables

    var originalSharing = angular.copy(dashboardCtrl.sharing);

    // Listeners

    $scope.$on('sessionCreated', function($event, args) {
        dashboardCtrl.social = {
            coupon: SessionService.get().getCoupon(),
            couponValue: SessionService.get().getCouponValue(),
            credits: SessionService.get().getBalance()
        };

        SocialService.configTwitter(dashboardCtrl.social.coupon);
    });

    dashboardCtrl.getUserCoupon = function() {
        return dashboardCtrl.social.coupon;
    };

    dashboardCtrl.getUserCouponValue = function() {
        return dashboardCtrl.social.couponValue;
    };

    var resetViewForm = function(formName){

        dashboardCtrl.formErrorMessage = '';
        dashboardCtrl.sharing = angular.copy(originalSharing);
        dashboardCtrl.mailForm.$setPristine();
        dashboardCtrl.mailForm.$setUntouched();
    };

    dashboardCtrl.isMailFormVisible = function() {
        return showMailForm;
    };

    dashboardCtrl.showMailForm = function() {
        resetViewForm();
        showMailForm = true;
    };

    dashboardCtrl.hideMailForm = function() {
        showMailForm = false;
    };

    // Function to recover user password
    dashboardCtrl.sendMail = function() {

        dashboardCtrl.formErrorMessage = '';

        if(dashboardCtrl.mailForm.$valid) {
            usSpinnerService.spin('social-spinner');

            DashboardService.sendMail(dashboardCtrl.sharing)
                .then(function(data) {
                    var successMessage = 'Tu código fue compartido';
                    alertify.log(successMessage, 'success', 5000);

                    usSpinnerService.stop('social-spinner');

                    dashboardCtrl.hideMailForm();
                }, function(error) {
                    if(error && error.errors){
                        dashboardCtrl.formErrorMessage = error.errors[0].title;
                        LoggerService.$logger().error(error.errors[0].title);
                    } else {
                        LoggerService.$logger().error(error);
                    }
                    usSpinnerService.stop('social-spinner');
                });
        }
    };

    dashboardCtrl.shareFB = function() {
        SocialService.shareFB(dashboardCtrl.social.coupon);
    };
    

}]);
