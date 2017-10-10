'use strict';

nbox.controller('AccountController', ['$scope', '$filter', 'SessionService', 'AccountService', 'HistoryService', 'LoggerService', 'usSpinnerService', function($scope, $filter, SessionService, AccountService, HistoryService, LoggerService, usSpinnerService){

    var accountCtrl = this;

    var nextAppointment = undefined;

    accountCtrl.user = {
        firstName: '',
        lastName: '',
        password: '',
        passwordConfirmation: ''
    };

    var originalUser = angular.copy(accountCtrl.user);

    $scope.$on('sessionCreated', function($event, args) {
        accountCtrl.user.firstName = SessionService.get().getFirstName();
        accountCtrl.user.lastName = SessionService.get().getLastName();
    });

    $scope.$on('updateFutureAppointments', function($event, args) {
        setNextAppointment();
    });

    /**
     *
     * @returns {string}
     */
    accountCtrl.getUserName = function () {
        return (SessionService.get())? SessionService.get().getFirstName() + ' ' + SessionService.get().getLastName(): '';
    };

    /**
     *
     * @returns {string}
     */
    accountCtrl.getUserEmail = function () {
        return (SessionService.get())? SessionService.get().getEmail(): '';
    };

    /**
     *
     * @returns {string}
     */
    accountCtrl.getUserBalance = function () {
        return (SessionService.get())? SessionService.get().getBalance(): '';
    };

    /**
     *
     * @returns {*}
     */
    accountCtrl.getUserClassesLeft = function() {
        return (SessionService.get())? SessionService.get().getClassesLeft(): '';
    };

    /**
     *
     * @returns {Appointment}
     */
    accountCtrl.getNextAppointment = function () {
        return nextAppointment;
    };

    var setNextAppointment = function () {
        var futureAppointments = $filter('filterByStatus')($filter('orderByDate')(HistoryService.getFutureAppointments()), 'BOOKED');
        if (futureAppointments.length){
            nextAppointment = futureAppointments[0];
        } else {
            nextAppointment = undefined;
        }
    };

    var resetInfo = function() {
        accountCtrl.user.firstName = SessionService.get().getFirstName();
        accountCtrl.user.lastName = SessionService.get().getLastName();
        accountCtrl.infoForm.$setPristine();
        accountCtrl.infoForm.$setUntouched();
    };

    var resetPassword = function() {
        accountCtrl.user.password = originalUser.password;
        accountCtrl.user.passwordConfirmation = originalUser.passwordConfirmation;
        accountCtrl.resetForm.$setPristine();
        accountCtrl.resetForm.$setUntouched();
    };

    accountCtrl.updateInfo = function() {
        var user = {
            first_name: accountCtrl.user.firstName,
            last_name: accountCtrl.user.lastName
        };

        if(accountCtrl.infoForm.$valid) {

            // Blur any input to avoid validation errors shown after submit
            if ("activeElement" in document)
                document.activeElement.blur();

            usSpinnerService.spin('account-spinner');

            AccountService.updateUser(user)
                .then(function(data) {
                    if (data.user) {
                        var successMessage = '<strong>¡Enhorabuena! Se actualizaron correctamente tus datos</strong>';
                        alertify.log(successMessage, 'success', 5000);

                        resetInfo();
                    }
                    usSpinnerService.stop('account-spinner');
                }, function(error) {
                    if(error && error.errors){
                        var errorMessage = '<strong>¡Oops!</strong> Hubo un error al actualizar tus datos';
                        alertify.log(errorMessage, 'error', 5000);
                    } else {
                        var errorMessage = '<strong>¡Oops!</strong> Hubo un error al actualizar tus datos';
                        alertify.log(errorMessage, 'error', 5000);
                    }
                    LoggerService.$logger().error(error);
                    usSpinnerService.stop('account-spinner');
                });
        }
    };

    accountCtrl.updatePassword = function() {
        var reset = {
            password: accountCtrl.user.password,
            password_confirmation: accountCtrl.user.passwordConfirmation
        };

        if(accountCtrl.resetForm.$valid) {

            // Blur any input to avoid validation errors shown after submit
            if ("activeElement" in document)
                document.activeElement.blur();

            usSpinnerService.spin('account-spinner');

            AccountService.updateUser(reset)
                .then(function(data) {
                    if (data.user) {
                        var successMessage = '<strong>¡Tu contraseña ha sido actualizada!</strong>';
                        alertify.log(successMessage, 'success', 5000);

                        resetPassword();
                    }
                    usSpinnerService.stop('account-spinner');
                }, function(error) {
                    if(error && error.errors){
                        var errorMessage = '<strong>¡Oops!</strong> Hubo un error al actualizar tus datos';
                        alertify.log(errorMessage, 'error', 5000);
                    } else {
                        var errorMessage = '<strong>¡Oops!</strong> Hubo un error al actualizar tus datos';
                        alertify.log(errorMessage, 'error', 5000);
                    }
                    LoggerService.$logger().error(error);
                    usSpinnerService.stop('account-spinner');
                });
        }
    };

}]);