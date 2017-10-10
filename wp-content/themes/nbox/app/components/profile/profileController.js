'use strict';

nbox.controller('ProfileController', ['$scope', 'DEFAULT_VALUES', function($scope, DEFAULT_VALUES){

    var profileCtrl = this;

    /**
     * Determines if mobile version is shown
     * @type {boolean}
     */
    var isMobile = false;

    // Constant variables
    profileCtrl.MODULES = DEFAULT_VALUES.PROFILE_MODULES;

    // Private variables

    /**
     *
     * @type {MODULES.DASHBOARD|{code, name}}
     */
    profileCtrl.selectedModule = profileCtrl.MODULES.DASHBOARD;


    /**
     * Listens for window resize
     */
    $scope.$on('setWindowSize', function($event, windowSize) {
        var footer = angular.element('#main-footer')[0];
        if(windowSize == DEFAULT_VALUES.BREAKPOINTS.extra_small.code) {
            jQuery(footer).css('margin-bottom', '70px');
        } else{
            jQuery(footer).css('margin-bottom', '0px');
        }
    });

    /**
     *
     * @param module
     * @returns {boolean}
     */
    profileCtrl.isModuleVisible = function (module) {
        return (profileCtrl.selectedModule.code == module.code);
    };

    /**
     *
     * @returns {boolean}
     */
    profileCtrl.isDashboardVisible = function () {
        return (profileCtrl.selectedModule.code == profileCtrl.MODULES.DASHBOARD.code);
    };

    /**
     *
     * @param code
     */
    var selectModuleByCode = function(code) {
        for(var module in profileCtrl.MODULES){
            if (code == profileCtrl.MODULES[module].code) {
                selectModule(profileCtrl.MODULES[module]);
            }
        }
    };

    /**
     *
     * @param module
     */
    var selectModule = function (module) {
        profileCtrl.selectedModule = module;
        window.location.hash = module.code;
    };

    profileCtrl.events = {
        selectModule: selectModule
    };

    profileCtrl.init = function() {
        var code = window.location.hash.substring(1);

        if (code) {
            selectModuleByCode(code);
        }

    };

    angular.element(document).ready(function() {
        var footer = angular.element('#main-footer')[0];
        jQuery(footer).css('margin-bottom', '70px');
    });

}]);