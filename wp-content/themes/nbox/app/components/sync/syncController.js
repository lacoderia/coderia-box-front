'use strict';

nbox.controller('SyncController', ['$scope', '$document', '$timeout', 'SessionService', 'SyncService', 'LoggerService', 'UtilsService', 'usSpinnerService', function($scope, $document, $timeout, SessionService, SyncService, LoggerService, UtilsService, usSpinnerService){

    var syncCtrl = this;

    // Scope variables

    syncCtrl.formErrorMessage = '';

    /**
     * Object that holds the username and password values
     */
    syncCtrl.credentials = {
        email: '',
        password: undefined
    };

    /**
     * Object that holds the username and password values
     */
    syncCtrl.newCredentials = {
        email: '',
        password: '',
        passwordConfirmation: ''
    };

    // Private variables

    var step = 0;

    var syncUser = undefined;
    var availableEmails = [];

    // Listeners

    /**
     * Listens for 'setCurrentPack' event
     */
    $scope.$on('goToSyncPage', function(){
        window.location.href = UtilsService.getHomeUrl() + 'sincroniza';
    });

    // Function definition

    /**
     * Determines if a user has linked accounts
     * @returns {boolean}
     */
    syncCtrl.userIsSynced = function() {
        return SessionService.isAuthenticated() && SessionService.get().getLinked();
    };

    /**
     * Determines if a user is logged before being redirected
     * @returns {boolean}
     */
    syncCtrl.goToSyncPage = function() {
        if(SessionService.isAuthenticated()) {
            window.location.href = UtilsService.getHomeUrl() + 'sincroniza';
        } else {
            SyncService.broadcast('showLogin', 'goToSyncPage');
        }
    };

    /**
     * Determines if a step should be visible
     * @returns {boolean}
     */
    syncCtrl.showStep = function(x) {
        return step == x;
    };

    /**
     * Processses step data
     */
    syncCtrl.setNewEmail = function(email){
        syncCtrl.newCredentials.email = email;
        step++;
    };


    /**
     * Authenticates user on remote server
     */
    syncCtrl.remoteLogin = function() {
        syncCtrl.formErrorMessage = '';

        if(syncCtrl.loginForm.$valid) {
            usSpinnerService.spin('step-spinner');

            SyncService.remoteLogin(syncCtrl.credentials)
                .then(function(data) {
                    usSpinnerService.stop('step-spinner');
                    syncUser = SyncService.getSyncUser();

                    var localEmail = SessionService.get().getEmail();
                    var remoteEmail = syncUser.email;

                    availableEmails = [];
                    availableEmails.push(localEmail);

                    if(localEmail != remoteEmail) {
                        availableEmails.push(remoteEmail);
                    }
                    step++;
                }, function(error) {
                    if(error && error.errors){
                        syncCtrl.formErrorMessage = error.errors[0].title;
                        LoggerService.$logger().error(error.errors[0].title);
                    } else {
                        LoggerService.$logger().error(error);
                    }
                    usSpinnerService.stop('step-spinner');
                });
        }

    };

    syncCtrl.synchronizeUser = function() {
        syncCtrl.formErrorMessage = '';

        var user = {
            email: syncCtrl.newCredentials.email,
            password: syncCtrl.newCredentials.password
        };

        if(syncCtrl.passwordForm.$valid) {
            usSpinnerService.spin('step-spinner');

            SyncService.synchronizeUser(user)
                .then(function(data) {
                    SyncService.migrateUser()
                        .then(function(data) {
                            usSpinnerService.stop('step-spinner');
                            step++;
                        }, function(error) {
                            if(error && error.errors){
                                syncCtrl.formErrorMessage = error.errors[0].title;
                                LoggerService.$logger().error(error.errors[0].title);
                            } else {
                                LoggerService.$logger().error(error);
                            }
                            usSpinnerService.stop('step-spinner');
                        });
                }, function(error) {
                    if(error && error.errors){
                        syncCtrl.formErrorMessage = error.errors[0].title;
                        LoggerService.$logger().error(error.errors[0].title);
                    } else {
                        LoggerService.$logger().error(error);
                    }
                    usSpinnerService.stop('step-spinner');
                });
        }
    };

    /**
     * Returns available emails to choose as username
     */
    syncCtrl.getAvailableEmails = function() {
        return availableEmails;
    };

    /**
     * Inits the controller
     */
    syncCtrl.init = function() {
    };

}]);