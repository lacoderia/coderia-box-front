'use strict';

nbox.factory('BookingService', ['$http', '$q', '$rootScope', 'API_URL_BASE', function($http, $q, $rootScope, API_URL_BASE){

    var booking = {
        classId: undefined,
        classroomId: undefined,
        date: undefined,
        station: undefined,
        instructorId: undefined,
        isFree: undefined,
        isOpening: undefined,
        scheduleType: undefined,
        description: undefined
    };

    var _appointment = undefined;

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
    var broadcast = function(msg, data) {
        $rootScope.$broadcast(msg, data);
    };

    /**
     *
     * @param boxClass
     */
    var setClassroom = function(boxClass) {
        booking.classId = boxClass.getId();
        booking.classroomId = boxClass.getClassroomId();
        booking.date = boxClass.getDate();
        booking.instructorId = boxClass.getInstructorId();
        booking.isFree = boxClass.getIsFree();
        booking.isOpening = boxClass.getIsOpening();
        booking.scheduleType = boxClass.getScheduleType().getDescription();
        booking.description = boxClass.getDescription();
    };

    /**
     *
     * @param station
     */
    var setStation = function(station) {
        booking.station = station;
    };

    /**
     *
     * @param station
     */
    var unsetStation = function() {
        booking.station = undefined;
    };

    /**
     *
     * @returns {{classId: undefined, classroomId: undefined, date: undefined, station: undefined, instructorId: undefined, isFree: undefined, isOpening: undefined, scheduleType: undefined}}
     */
    var getBooking = function() {
        return angular.copy(booking);
    };

    /**
     * Resets default values for booking object
     */
    var resetBooking = function() {
        booking = {
            classId: undefined,
            classroomId: undefined,
            date: undefined,
            station: undefined,
            instructorId: undefined,
            isFree: undefined,
            isOpening: undefined,
            scheduleType: undefined,
            description: undefined
        };
    };

    var setAppointment = function (appointment) {
        _appointment = appointment;
    };

    /**
     *
     * @returns {*}
     */
    var bookClass = function() {

        var bookingServiceURL = API_URL_BASE + '/appointments/book';
        return $http.post(bookingServiceURL, { schedule_id: booking.classId, station_number: booking.station.getNumber() })
            .then(function(response) {
                var data = response.data;
                if (typeof data === 'object') {
                    return data;
                } else {
                    return $q.reject(data);
                }
            }, function(error){
                return $q.reject(error.data);
            });
    };

    var editClass = function () {

        var editBookingServiceURL = API_URL_BASE + '/appointments/' + _appointment.getId() + '/edit_station_number';

        return $http.post(editBookingServiceURL, { station_number: booking.station.getNumber() })
            .then(function(response) {
                var data = response.data;
                if (typeof data === 'object') {
                    return data;
                } else {
                    return $q.reject(data);
                }
            }, function(error){
                return $q.reject(error.data);
            });
    };

    service = {
        broadcast: broadcast,
        getBooking: getBooking,
        setClassroom: setClassroom,
        setStation: setStation,
        unsetStation: unsetStation,
        resetBooking: resetBooking,
        bookClass: bookClass,
        setAppointment: setAppointment,
        editClass: editClass
    };

    return service;

}]);
