/*
 *   App
 *   Description: Configuration app module
 * */
'use strict';

var ENVIRONMENT = {
    'DEV': 'DEV',
    'PRO': 'PRO',
    'CURRENT': 'DEV'
};

moment.tz.setDefault('America/Mexico_City');

var nbox = angular.module('nbox', ['angular-logger', 'duScroll', 'LocalStorageModule', 'ngAnimate', 'angularSpinner', 'slickCarousel', 'ngSanitize']);

nbox.config(['localStorageServiceProvider', function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('');
    //localStorageServiceProvider.setStorageCookie(45, 'http://n-box.com.mx/');
    localStorageServiceProvider.setStorageCookie(45, '/');
    localStorageServiceProvider.setStorageCookieDomain('');
}]);

nbox.constant('ENVIRONMENT', ENVIRONMENT);
nbox.constant('API_URL_BASE', 'https://servicios.coderia.mx');
//nbox.constant('API_URL_BASE', 'https://198.61.202.55:8082');

nbox.constant('DEFAULT_VALUES', {
    'DAYS_OF_WEEK': ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    'WEEK_LENGTH': 7,
    'START_YEAR': 1900,
    'MONTHS': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    'LABEL_MONTHS': ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    'APPOINTMENT_STATUS': {
        'BOOKED': { code: 'booked', name: 'Reservada', class: 'appointment-booked' },
        'CANCELLED': { code: 'cancelled', name: 'Cancelada', class: 'appointment-cancelled' },
        'FINALIZED': { code: 'finalized', name: 'Finalizada', class: 'appointment-finalized' },
        'IN_PROGRESS': { code: 'inprogress', name: 'En progreso', class: 'appointment-progress' }
    },
    'STATION_STATUS': {
        'ACTIVE': 'active',
        'INACTIVE': 'inactive',
        'BOOKED': 'booked',
        'SELECTED': 'selected'
    },
    'PAYMENT_METHODS_BUTTONS': {
        'MAIN_BUTTON': {
            'class': 'confirm-class',
            'action': 'change-main-account',
            'icon': 'icon-accept',
            'text': 'Usar como principal'
        },
        'DELETE_BUTTON': {
            'class': 'cancel-class',
            'action': 'delete-account',
            'icon': 'icon-close',
            'text': 'Eliminar'
        }
    },
    'PROFILE_MODULES' : {
        'DASHBOARD': { code: 'dashboard', name: 'Resumen', icon: 'icon-dashboard', class: 'dashboard' },
        'HISTORY': { code: 'history', name: 'Bitácora', icon: 'icon-icon-cycling', class: 'history' },
        'PERSONAL_INFO': { code: 'personal_info', name: 'Información personal', icon: 'icon-v-card', class: 'personal-info' },
        'PAYMENTS': { code: 'payments', name: 'Opciones de pago', icon: 'icon-credit-card-alt', class: 'payments' }
    },
    'BREAKPOINTS': {
        "extra_small": { "code": "XS", "size": 768 },
        "small": { "code": "SM", "size": 992 },
        "medium": { "code": "MD", "size": 1170 },
        "large": { "code": "LG", "size": 1200 }
    }
});

/*
 Filtros
 */

nbox.filter('filterByStatus', function(){
    /**
     * Order spinning class list by date
     * @return _boxClasses
     */
    return function(appointments, status) {

        var filtered = [];

        angular.forEach(appointments, function(item) {
            if (item.getStatus() == status){
                filtered.push(item);
            }
        });

        return filtered;
    }
});

/*
 Directivas menores
 */

nbox.directive('pwCheck', function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=pwCheck"
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.pwCheck = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
});

nbox.directive('onResize', ['$window', '$timeout', 'DEFAULT_VALUES', function ($window, $timeout, DEFAULT_VALUES) {
    return{
        link: function(scope) {

            var _windowWidth = 0;

            var setWindowSize = function (windowWidth) {
                var windowSize = DEFAULT_VALUES.BREAKPOINTS.large.code;
                $timeout(function () {

                    if(windowWidth <= DEFAULT_VALUES.BREAKPOINTS.extra_small.size) {
                        windowSize = DEFAULT_VALUES.BREAKPOINTS.extra_small.code;
                    } else if(windowWidth > DEFAULT_VALUES.BREAKPOINTS.extra_small.size && windowWidth <= DEFAULT_VALUES.BREAKPOINTS.small.size){
                        windowSize = DEFAULT_VALUES.BREAKPOINTS.small.code;
                    } else if(windowWidth > DEFAULT_VALUES.BREAKPOINTS.small.size && windowWidth <= DEFAULT_VALUES.BREAKPOINTS.medium.size){
                        windowSize = DEFAULT_VALUES.BREAKPOINTS.medium.code;
                    } else {
                        windowSize = DEFAULT_VALUES.BREAKPOINTS.large.code;
                    }

                    scope.$broadcast('setWindowSize', windowSize);

                },0);
            };

            angular.element(document).ready(function() {
                _windowWidth = $window.innerWidth;
                setWindowSize(_windowWidth);

            });

            angular.element($window).bind('resize', function () {
                _windowWidth = $window.innerWidth;
                setWindowSize(_windowWidth);
            });
        }
    }
}]);