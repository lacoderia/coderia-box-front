'use strict';

nbox.controller('ClassroomController', ['$rootScope', '$scope', '$timeout', '$document', 'ClassroomService', 'BookingService', 'InstructorService', 'LoggerService', 'usSpinnerService', 'DEFAULT_VALUES', function($rootScope, $scope, $timeout, $document, ClassroomService, BookingService, InstructorService, LoggerService, usSpinnerService, DEFAULT_VALUES){

    var classroomCtrl = this;

    // Scope variables

    classroomCtrl.distribution = {};

    // Private variables
    /**
     * Determines if the classroom container is shown
     * @type {boolean}
     */
    var showClassroom = false;

    /**
     *
     * @type {Station}
     */
    var myStation = undefined;

    // Listeners
    /**
     * Listens for 'boxClassBooked' event
     */
    $scope.$on('boxClassBooked', function($event, boxClass){
        if (BookingService.getBooking().isOpening){
            var errorMessage = "Esta clase tiene promoción por apertura. ¡Recuerda que la primera es gratis!";
            alertify.log(errorMessage, 'success', 0);
        }

        getClassroomDistribution();
    });

    /**
     * Listens for 'userNeedsClasses' event
     */
    $scope.$on('userNeedsClasses', function($event, args) {
        setShowClassroom(false);
    });

    /**
     * Listens for 'updateBookedSeats' event and update the booked seats array
     */
    $scope.$on('updateBookedSeats', function($event, bookedSeats) {
        ClassroomService.updateBookedSeats(bookedSeats);
        if(BookingService.getBooking().station) {
            ClassroomService.broadcast('stationDeselected', BookingService.getBooking().station);
        }
    });

    /**
     * Listens for 'changeStation' event and show the classroom
     */
    $scope.$on('changeStation', function($event, appointment) {
        setShowClassroom(true);
        BookingService.setAppointment(appointment);
        BookingService.setClassroom(appointment.getBoxClass());
        getClassroomDistribution(appointment.getStationNumber());
        usSpinnerService.spin('change-station-spinner');
    });

    /**
     * Listens for 'station updated' event
     */
    $scope.$on('stationUpdated', function($event){
        setShowClassroom(false);
    });

    /**
     * Listens for 'closePacksView' event
     */
    $scope.$on('closePacksView', function(){
       setShowClassroom(true);
    });

    /**
     * Listens for 'userBoughtClasses' event
     */
    $scope.$on('userBoughtClasses', function(){
        setShowClassroom(true);
    });

    // Function definition

    /**
     * Determines if the classroom container is shown
     * @returns {boolean}
     */
    classroomCtrl.isVisible = function() {
        return showClassroom;
    };

    /**
     * Closes the classroom view
     */
    classroomCtrl.closeClassroom = function (){
        setShowClassroom(false);
        $rootScope.$broadcast('closeClassroom');
    };

    /**
     *
     * @param show
     */
    var setShowClassroom = function(show) {
        showClassroom = show;
    };

    /**
     *
     */
    var getClassroomDistribution = function(stationNumber) {
        ClassroomService.callDistributionByClassroomId(BookingService.getBooking().classroomId)
            .then(function(data) {
                ClassroomService.callBookedSeatsByClassId(BookingService.getBooking().classId, stationNumber)
                    .then(function(data) {
                        classroomCtrl.distribution = ClassroomService.getDistribution();
                        setShowClassroom(true);
                        if(stationNumber){
                            myStation = ClassroomService.getMyStation();
                        }
                        $timeout(function(){
                            var calendarContainer = angular.element(document.getElementById('calendar'));
                            if(document.getElementById('calendar')) {
                                $document.scrollToElement(calendarContainer, 30, 800);
                            }
                        }, 500);

                        usSpinnerService.stop('full-spinner');
                        usSpinnerService.stop('change-station-spinner');
                    }, function(error) {
                        var errorMessage = "<strong>¡Oops! hubo un error al obtener el salón</strong>, por favor, intenta de nuevo";
                        alertify.log(errorMessage, 'error', 5000);
                        LoggerService.$logger().error(error);
                        usSpinnerService.stop('full-spinner');
                        usSpinnerService.stop('change-station-spinner');
                    });
            }, function(error) {
                var errorMessage = "<strong>¡Oops! hubo un error al obtener el salón</strong>, por favor, intenta de nuevo";
                alertify.log(errorMessage, 'error', 5000);
                LoggerService.$logger().error(error);
                usSpinnerService.stop('full-spinner');
                usSpinnerService.stop('change-station-spinner');
            });
    };

    /**
     *
     * @param station
     */
    classroomCtrl.selectStation = function(station) {
        if(BookingService.getBooking().station && station.getPosition() === BookingService.getBooking().station.getPosition()) {
            ClassroomService.broadcast('stationDeselected', station);
        } else {
            if (station.getStatus() == DEFAULT_VALUES.STATION_STATUS.ACTIVE) {
                ClassroomService.broadcast('stationSelected', station);
            }
        }
    };

    /**
     *
     * @param station
     * @returns {boolean}
     */
    classroomCtrl.isMyStation = function (station) {
        if(station) {
            return (myStation.getNumber() === station.getNumber());
        }
        return false;
    };

    /**
     *
     * @returns {Station}
     */
    classroomCtrl.getMyStation = function () {
        return myStation;
    };

    /**
     *
     * @param station
     * @returns {*}
     */
    classroomCtrl.getStationClass = function(station) {
        if(BookingService.getBooking().station){
            return (station && station.getPosition() === BookingService.getBooking().station.getPosition())? DEFAULT_VALUES.STATION_STATUS.SELECTED: station.getStatus();
        }
        return station.getStatus();
    };

    /**
     * Gets the instructor's name
     * @returns {*}
     */
    classroomCtrl.getInstructorName = function () {
        return (BookingService.getBooking().instructorId ? InstructorService.getInstructorById(BookingService.getBooking().instructorId).getName() : '');
    };

    /**
     * Gets the classroom description (dj)
     * @returns {*}
     */
    classroomCtrl.getBoxClassDescription = function () {
        return (BookingService.getBooking().description ? BookingService.getBooking().description : '');
    };

    /**
     *
     * @param instructors
     */
    classroomCtrl.init = function(instructors) {
        // Setting the instructors catalog
        InstructorService.setInstructors(instructors);
    };

}]);