'use strict';

nbox.factory('SocialService', ['$http', '$q', '$rootScope', 'SessionService', 'API_URL_BASE', function($http, $q, $rootScope, SessionService, API_URL_BASE){

    // Variables definition
    /**
     *  Service object
     */
    var service;

    /**
     *
     * @param msg
     * @param data
     */
    var configTwitter = function(coupon) {
        a2a_config.linkname = "N-Box";
        a2a_config.linkurl = "www.n-box.com.mx";

        var twitterTemplate = "Golpea a tu ritmo con N Box http://www.n-box.com.mx";
        if(coupon) {
            twitterTemplate = "¡Te invito a vivir la experiencia N Box utilizando este cupón: " + coupon + "! Agrégalo al pagar en http://www.n-box.com.mx";
        }

        a2a_config.templates = {
            twitter: twitterTemplate
        };

    };

    var shareFB = function(coupon) {
        if(coupon){
            FB.ui({
                method: 'share',
                href: 'http://n-box.com.mx',
                quote: '¡Te invito a vivir la experiencia N box utilizando este cupón: ' + coupon + '! ¡Agrégalo al hacer tu siguiente compra y golpea a tu ritmo!',
                caption: 'Obtén un descuento usando este cupón',
                hashtag: "#golpeaaturitmo"
            }, function (response) {
            });
        } else {
            FB.ui({
                method: 'share',
                href: 'http://n-box.com.mx',
                quote: '¡Golpea a tu ritmo con N Box!',
                caption: 'http://n-box.com.mx'
            }, function (response) {
            });
        }

    };

    service = {
        configTwitter: configTwitter,
        shareFB: shareFB
    };

    return service;

}]);

