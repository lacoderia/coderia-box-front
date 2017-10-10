'use strict';

nbox.controller('LoginController', ['$rootScope', '$scope', '$timeout', 'SessionService', 'LoginService', 'LoggerService', 'UtilsService', 'usSpinnerService', function($rootScope, $scope, $timeout, SessionService, LoginService, LoggerService, UtilsService, usSpinnerService){

    var loginCtrl = this;

    var showModal = false;
    var currentView;
    var callbackBroadcastName;

    // Object that holds all possible views
    loginCtrl.VIEWS = {
        LOGIN: 'login',
        SIGNUP: 'signup',
        FORGOT: 'forgot',
        RESET: 'reset'
    };

    // Object that holds the username and password values
    loginCtrl.credentials = {
        email: '',
        password: undefined
    };

    // Object that holds new user parameters
    loginCtrl.newUser = {
        firstName: undefined,
        lastName: undefined,
        email: '',
        password: '',
        passwordConfirmation: ''
    };

    // Object that holds the recover password data
    loginCtrl.forgot = {
        email: ''
    };

    // Object that holds the recover password data
    loginCtrl.reset = {
        password: undefined,
        passwordConfirmation: undefined
    };

    var resetToken = undefined;

    loginCtrl.formErrorMessage = '';

    // Private variables
    var originalCredentials = angular.copy(loginCtrl.credentials);
    var originalNewUser = angular.copy(loginCtrl.newUser);
    var originalForgot = angular.copy(loginCtrl.forgot);
    var originalReset = angular.copy(loginCtrl.reset);

    // Broadcast listeners
    $scope.$on('showLogin', function(event, callback){
        callbackBroadcastName = callback;
        loginCtrl.showView(loginCtrl.VIEWS.LOGIN);
    });

    $scope.$on('hideLogin', function(){
        loginCtrl.hideModal();
    });

    loginCtrl.isModalVisible = function(){
        return showModal;
    };

    loginCtrl.hideModal = function(){
        showModal = false;
        callbackBroadcastName = undefined;
    };

    // Function that returns if the parameter view is the current view
    loginCtrl.isCurrentView = function(view){
        return (view == currentView);
    };

    // Function that toggles to login view
    loginCtrl.showView = function(view){
        resetViewForm(view);
        currentView = view;
        showModal = true;
    };

    // Function to reset forms
    var resetViewForm = function(formName){

        loginCtrl.formErrorMessage = '';

        switch(formName){
            case 'login':
                loginCtrl.credentials = angular.copy(originalCredentials);
                loginCtrl.loginForm.$setPristine();
                loginCtrl.loginForm.$setUntouched();
                break;
            case 'signup':
                loginCtrl.newUser = angular.copy(originalNewUser);
                loginCtrl.signupForm.$setPristine();
                loginCtrl.signupForm.$setUntouched();
                break;
            case 'forgot':
                loginCtrl.forgot = angular.copy(originalForgot);
                loginCtrl.forgotForm.$setPristine();
                loginCtrl.forgotForm.$setUntouched();
                break;
            case 'reset':
                loginCtrl.reset = angular.copy(originalReset);
                loginCtrl.resetForm.$setPristine();
                loginCtrl.resetForm.$setUntouched();
                break;
            default:
                break;
        }
    };

    // Function to authenticate a user
    loginCtrl.login = function() {
        loginCtrl.formErrorMessage = '';

        if(loginCtrl.loginForm.$valid) {
            usSpinnerService.spin('login-spinner');

            LoginService.login(loginCtrl.credentials)
                .then(function(data) {
                    if(callbackBroadcastName) {
                        $rootScope.$broadcast(callbackBroadcastName);
                    }
                    loginCtrl.hideModal();
                    usSpinnerService.stop('login-spinner');
                    alertify.log('¡Bienvenido ' + SessionService.get().getFirstName() + '!', 'success', 5000);
                }, function(error) {
                    if(error && error.errors){
                        loginCtrl.formErrorMessage = error.errors[0].title;
                        LoggerService.$logger().error(error.errors[0].title);
                    } else {
                        LoggerService.$logger().error(error);
                    }
                    usSpinnerService.stop('login-spinner');
                });
        }

    };

    // Function to register a new user
    loginCtrl.signUp = function() {

        loginCtrl.formErrorMessage = '';

        var user = {
            first_name: loginCtrl.newUser.firstName,
            last_name: loginCtrl.newUser.lastName,
            email: loginCtrl.newUser.email,
            password: loginCtrl.newUser.password,
            password_confirmation: loginCtrl.newUser.passwordConfirmation
        };

        if(loginCtrl.signupForm.$valid) {
            usSpinnerService.spin('login-spinner');

            LoginService.signUp(user)
                .then(function(data) {
                    if(callbackBroadcastName) {
                        $rootScope.$broadcast(callbackBroadcastName);
                    }
                    loginCtrl.hideModal();
                    usSpinnerService.stop('login-spinner');
                }, function(error) {
                    if(error && error.errors){
                        loginCtrl.formErrorMessage = error.errors[0].title;
                        LoggerService.$logger().error(error.errors[0].title);
                    } else {
                        LoggerService.$logger().error(error);
                    }
                    usSpinnerService.stop('login-spinner');
                });
        }
    };

    // Function to recover user password
    loginCtrl.recoverPassword = function() {

        loginCtrl.formErrorMessage = '';

        if(loginCtrl.forgotForm.$valid) {
            usSpinnerService.spin('login-spinner');

            LoginService.recoverPassword(loginCtrl.forgot)
                .then(function(data) {
                    loginCtrl.hideModal();

                    var successMessage = 'Se enviaron instrucciones de recuperación a tu correo electrónico';
                    alertify.log(successMessage, 'success', 5000);

                    usSpinnerService.stop('login-spinner');
                }, function(error) {
                    if(error && error.errors){
                        loginCtrl.formErrorMessage = error.errors[0].title;
                        LoggerService.$logger().error(error.errors[0].title);
                    } else {
                        LoggerService.$logger().error(error);
                    }
                    usSpinnerService.stop('login-spinner');
                });
        }
    };

    // Function to reset user password
    loginCtrl.resetPassword = function() {

        loginCtrl.formErrorMessage = '';

        var reset = {
            reset_password_token: resetToken,
            password: loginCtrl.reset.password,
            password_confirmation: loginCtrl.reset.passwordConfirmation
        };

        if(loginCtrl.resetForm.$valid) {
            usSpinnerService.spin('login-spinner');

            LoginService.resetPassword(reset)
                .then(function(data) {
                    loginCtrl.hideModal();

                    var successMessage = '<strong>¡Tu contraseña ha sido actualizada!</strong>, ya puedes iniciar sesión con tu nueva contraseña';
                    alertify.log(successMessage, 'success', 5000);

                    usSpinnerService.stop('login-spinner');
                }, function(error) {
                    if(error && error.errors){
                        loginCtrl.formErrorMessage = error.errors[0].title;
                        LoggerService.$logger().error(error.errors[0].title);
                    } else {
                        LoggerService.$logger().error(error);
                    }
                    usSpinnerService.stop('login-spinner');
                });
        }
    };

    loginCtrl.init = function(){
        resetToken = UtilsService.getParam('reset_password_token');
        $timeout(function(){
            if (resetToken) {
                loginCtrl.showView(loginCtrl.VIEWS.RESET);
            }
        }, 0);

    };

}]);