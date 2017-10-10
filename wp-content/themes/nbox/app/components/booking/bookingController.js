'use strict';

nbox.controller('BookingController', ['$scope', '$timeout', '$document', 'SessionService', 'BookingService', 'ClassroomService', 'InstructorService', 'UtilsService', 'LoggerService', 'localStorageService', 'usSpinnerService', function($scope, $timeout, $document, SessionService, BookingService, ClassroomService, InstructorService, UtilsService, LoggerService, localStorageService, usSpinnerService){

    // Private variables
    /**
     *
     */
    var bookingCtrl = this;

    /**
     * Determines if the booking container is shown
     * @type {boolean}
     */
    var showBooking = false;

    // Listeners
    /**
     * Listens for 'close classroom' event
     */
    $scope.$on('closeClassroom', function($event){
        BookingService.resetBooking();
        setShowBooking(false);
    });

    /**
     * Listens for 'station updated' event
     */
    $scope.$on('stationUpdated', function($event){
        BookingService.resetBooking();
        setShowBooking(false);
    });

    /**
     *
     */
    $scope.$on('boxClassSelected', function($event, boxClass, appointment) {
        appointment = appointment || undefined;
        BookingService.setClassroom(boxClass);
        BookingService.setAppointment(appointment);
        BookingService.broadcast('boxClassBooked');
    });

    /**
     *
     */
    $scope.$on('stationSelected', function($event, station) {
        BookingService.setStation(station);
        setShowBooking(true);
        $timeout(function(){
            var bookingContainer = angular.element(document.getElementById('booking'));
            $document.scrollToElement(bookingContainer,120, 800);
        }, 0);
    });

    /**
     *
     */
    $scope.$on('stationDeselected', function($event) {
        setShowBooking(false);
        BookingService.unsetStation();
    });

    /**
     *
     */
    $scope.$on('book', function() {
        bookingCtrl.book();
    });

    /**
     *
     */
    $scope.$on('closePacksView', function(){
        setShowBooking(true);
    });

    /**
     * Listens for 'userBoughtClasses' event
     */
    $scope.$on('userBoughtClasses', function(){
        setShowBooking(true);
        $timeout(function(){
            var bookingContainer = angular.element(document.getElementById('booking'));
            $document.scrollToElement(bookingContainer, 120, 800);
        }, 0);
    });

    /**
     * Listens for 'userNeedsClasses' event
     */
    $scope.$on('userNeedsClasses', function($event, args) {
        setShowBooking(false);
    });

    /**
     * Determines if the booking container is shown
     * @returns {boolean}
     */
    bookingCtrl.isVisible = function() {
        return showBooking;
    };

    /**
     *
     * @param show
     */
    var setShowBooking = function(show) {
        showBooking = show;
    };

    /**
     * Gets the current booking
     * @returns {{classId: undefined, classroomId: undefined, date: undefined, station: undefined, instructorId: undefined}}
     */
    bookingCtrl.getBooking = function() {
        return BookingService.getBooking();
    };

    /**
     * Gets the instructor's name
     * @returns {*}
     */
    bookingCtrl.getInstructorName = function (){
        return (BookingService.getBooking().instructorId ? InstructorService.getInstructorById(BookingService.getBooking().instructorId).getName() : '');
    };

    /**
     * Books the class
     */
    bookingCtrl.book = function() {
        if(SessionService.isAuthenticated()) {
            if( BookingService.getBooking().isFree || BookingService.getBooking().isOpening || SessionService.get().getClassesLeft()){

                usSpinnerService.spin('full-spinner');

                BookingService.bookClass()
                    .then(function(data) {
                        if(data.appointment) {

                            if(!data.appointment.schedule.free) {
                                SessionService.get().setClassesLeft(SessionService.get().getClassesLeft() - 1);
                            }

                            var bookingResume = {
                                'stationNumber': data.appointment.station_number,
                                'date': data.appointment.schedule.datetime,
                                'instructor': data.appointment.schedule.instructor.first_name,
                                'scheduleType': data.appointment.schedule.schedule_type.description
                            };
                            localStorageService.set('nbx-booking', bookingResume);

                            window.location.href = UtilsService.getHomeUrl() + 'reserva-success';
                        }
                    }, function(error) {
                        if(error && error.errors){
                            var errorMessage = "<strong>¡Oops!</strong> " + error.errors[0].title;
                            alertify.log(errorMessage, 'error', 5000);
                        } else {
                            var errorMessage = '<strong>¡Oops! Error al reservar el entrenamiento</strong>, por favor intenta de nuevo';
                            alertify.log(errorMessage, 'error', 5000);
                        }
                        LoggerService.$logger().error(error);
                        usSpinnerService.stop('full-spinner');
                    });

            } else {
                BookingService.broadcast('userNeedsClasses');
                usSpinnerService.spin('full-spinner');
            }
        } else {
            BookingService.broadcast('showLogin', 'book');
        }
    };

    bookingCtrl.editBook = function() {
        if(SessionService.isAuthenticated()) {

            usSpinnerService.spin('full-spinner');

            BookingService.editClass()
                .then(function(data) {
                    if(data.appointment) {
                        var successMessage = "<strong>¡Listo!</strong> Tu estación fue cambiada correctamente";
                        alertify.log(successMessage, 'success', 5000);
                        BookingService.broadcast('stationUpdated', data.appointment);
                        usSpinnerService.stop('full-spinner');
                    }
                }, function(error) {
                    if(error && error.errors){
                        var errorMessage = "<strong>¡Oops!</strong> " + error.errors[0].title;
                        alertify.log(errorMessage, 'error', 5000);
                    } else {
                        var errorMessage = '<strong>¡Oops! Error al reservar el entrenamiento</strong>, por favor intenta de nuevo';
                        alertify.log(errorMessage, 'error', 5000);
                    }
                    LoggerService.$logger().error(error);
                    usSpinnerService.stop('full-spinner');
                });
            ;
        }
    }

    /**
     *
     * @returns {Station}
     */
    bookingCtrl.getMyStation = function () {
        return ClassroomService.getMyStation();
    };
}]);