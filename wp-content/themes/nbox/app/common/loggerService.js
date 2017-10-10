'use strict';

nbox.factory('LoggerService', ['$log', 'ENVIRONMENT', function($log, ENVIRONMENT){

    // Static variables
    var NORMAL_LOGGER = 'Normal';
    var MUTED_LOGGER = 'Muted';

    // Private variables
    /**
     *
     * @type {undefined}
     */
    var logger = $log.getInstance(NORMAL_LOGGER);

    /**
     *
     * @returns {undefined}
     */
    var $logger = function() {
        return logger;
    };

    /**
     *
     * @returns {*}
     */
    var init = function() {

        if(ENVIRONMENT.CURRENT === ENVIRONMENT.PRO) {
            $log.logLevels[MUTED_LOGGER] = $log.LEVEL.OFF;
            logger =  $log.getInstance(MUTED_LOGGER);
        }
    };

    init();

    return {
        '$logger': $logger
    }

}]);
