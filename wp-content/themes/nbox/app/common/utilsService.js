'use strict';

nbox.factory('UtilsService', [function(){

    var service;

    var _homeUrl;

    var getHomeUrl = function() {
        return _homeUrl;
    };

    var setHomeUrl = function(homeUrl) {
        _homeUrl = homeUrl;
    };

    var getParam = function(param) {
        var vars = {};
        window.location.href.replace( location.hash, '' ).replace(
            /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
            function( m, key, value ) { // callback
                vars[key] = value !== undefined ? value : '';
            }
        );

        if ( param ) {
            return vars[param] ? vars[param] : null;
        }
        return vars;
    };

    service = {
        getHomeUrl: getHomeUrl,
        setHomeUrl: setHomeUrl,
        getParam: getParam
    };

    return service;

}]);
