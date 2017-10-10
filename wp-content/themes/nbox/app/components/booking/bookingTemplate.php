<?php
    wp_enqueue_script( 'InstructorService' );
    wp_enqueue_script( 'BookingService' );
    wp_enqueue_script( 'BookingController' );
?>

<div id="booking" class="booking-component animate-visibility" ng-controller="BookingController as bookingCtrl" ng-show="bookingCtrl.isVisible()">
    <h2>Verifica tu reservación</h2>
    <div class="booking-info">
        <div><span class="booking-date">Fecha de reservación:</span> <span class="booking-label"><span ng-if="!bookingCtrl.getBooking().date">---</span>{{ bookingCtrl.getBooking().date.local('es').format('MMMM D, h:mm a') }}</span></div>
        <div><span class="booking-station">No. de estación:</span> <span class="booking-label"><span ng-if="!bookingCtrl.getBooking().station.getNumber()">---</span>{{ bookingCtrl.getBooking().station.getNumber() }}</span></div>
        <div><span class="booking-instructor">Tu instructor será:</span> <span class="booking-label"><span ng-if="!bookingCtrl.getInstructorName()">---</span>{{ bookingCtrl.getInstructorName() }}</span></div>
        <div><span class="booking-instructor">Tipo de entrenamiento:</span> <span class="booking-label"><span ng-if="!bookingCtrl.getBooking().scheduleType">---</span>{{ bookingCtrl.getBooking().scheduleType }}</span></div>
    </div>
    <button class="button-red" ng-disabled="bookingCtrl.getBooking().station === undefined" ng-click="bookingCtrl.book()">Reserva ahora</button>
</div>