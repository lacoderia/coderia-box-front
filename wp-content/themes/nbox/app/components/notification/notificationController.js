'use strict';

nbox.controller('NotificationController', ['UtilsService', 'SocialService', 'localStorageService', 'DEFAULT_VALUES', function(UtilsService, SocialService, localStorageService, DEFAULT_VALUES){

    // Private variables
    /**
     *
     */
    var notificationCtrl = this;

    notificationCtrl.homeUrl;
    notificationCtrl.purchaseMessage;
    notificationCtrl.bookingMessage;
    notificationCtrl.bookingStationNumber;

    /**
     *
     */
    notificationCtrl.shareFB = function() {
        SocialService.shareFB();
    };

    notificationCtrl.init = function() {
        notificationCtrl.homeUrl = UtilsService.getHomeUrl();

        // Purchase notification
        var purchase = localStorageService.get('nbx-purchase');

        if (purchase && purchase.classes) {
            notificationCtrl.purchaseMessage = purchase.classes;

            if (purchase.classes > 1) {
                notificationCtrl.purchaseMessage += ' entrenamientos - ';
            } else {
                notificationCtrl.purchaseMessage += ' entrenamiento - ';
            }

            notificationCtrl.purchaseMessage += '$' + purchase.price + '.00';
        }
        localStorageService.remove('nbx-purchase');

        // Booking notification
        var booking = localStorageService.get('nbx-booking');

        if (booking && booking.stationNumber) {
            var date = moment(booking.date);
            notificationCtrl.bookingMessage = booking.instructor + ' te espera el día ' + date.date() + ' de ' + DEFAULT_VALUES.LABEL_MONTHS[date.month()] + ' a las ' + date.format('H:mm') + ' hrs.';
            notificationCtrl.bookingStationNumber = 'Tu entrenamiento es de ' + booking.scheduleType + ' y tu estación inicial es la número ' + booking.stationNumber;
        }
        localStorageService.remove('nbx-booking');

        SocialService.configTwitter();

    }

}]);