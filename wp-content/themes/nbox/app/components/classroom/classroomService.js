'use strict';

nbox.factory('ClassroomService', ['$http', '$q', '$rootScope', 'LoggerService', 'API_URL_BASE', function($http, $q, $rootScope, LoggerService, API_URL_BASE){

    // Variables definition
    /**
     *  Service object
     */
    var service;

    /**
     * Class distribution object
     */

    var distribution = {};

    /**
     * Current booked station object
     * @type {Station}
     */
    var myStation = undefined;

    // Functions definition

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
     * @param array
     * @returns {Array}
     */
    var transformToObject = function(data){
        var height = data.height;
        var width = data.width;
        var stations = data.active_seats;
        var list, row;
        var paintedStations = eval(data.painted_seat_positions);

        function getStation(position) {
            var station = undefined;

            for(var i=0; i<stations.length; i++) {
                if(stations[i].position == position){
                    station = stations[i];
                }
            }

            return station;
        }

        list = [];
        row = [];

        try {
            for(var i=1; i<=(height*width); i++) {
                var station = new Station();
                station.setPosition(i);

                var seat = getStation(i);
                if(seat){
                    station.setStatus('active');
                    station.setNumber(seat.number);
                    station.setDescription(seat.description);
                } else {
                    station.setStatus('inactive');
                    station.setNumber(0);
                    station.setDescription('');
                }

                for(var j=0; j<paintedStations.length; j++){
                    if(paintedStations[j].position == i){
                        station.setStyle(paintedStations[j].style);
                    }
                }

                row.push(station);

                if(i%width == 0){
                    list.push(row);
                    row = [];
                }
            }


        } catch(error){
            LoggerService.$logger().error(error);
        }

        return list;
    };

    /**
     *
     * @returns {*}
     */
    var getDistribution = function() {
        return angular.copy(distribution);
    };

    /**
     *
     * @param seatDistribution
     */
    var setDistribution = function(seatDistribution) {
        if(seatDistribution){
            distribution = transformToObject(seatDistribution);
        }
    };

    /**
     *
     * @param id
     * @returns {*}
     */
    var callDistributionByClassroomId = function(id) {
        var distributionServiceURL = API_URL_BASE + '/distributions/by_room_id?room_id=' + id;
        return $http.get(distributionServiceURL)
            .then(function(response) {
                var data = response.data;
                if (typeof data === 'object') {
                    if(data.distribution){
                        setDistribution(data.distribution);
                    }
                    return data;
                } else {
                    return $q.reject(data);
                }

            }, function(error){
                return $q.reject(error.data);
            });
    };

    /**
     *
     * @param id
     * @returns {*}
     */
    var callBookedSeatsByClassId = function(id, stationNumber) {
        var distributionServiceURL = API_URL_BASE + '/schedules/' + id + '/bookings';
        return $http.get(distributionServiceURL)
            .then(function(response) {
                var data = response.data;
                if (typeof data === 'object') {
                    if(data.bookings){
                        updateBookedSeats(data.bookings.booked_seats, stationNumber);
                    }
                    return data;
                } else {
                    return $q.reject(data);
                }

            }, function(error){
                return $q.reject(error.data);
            });
    };

    /**
     *
     * @param bookings
     * @returns {{}}
     */
    var updateBookedSeats = function(bookedSeats, stationNumber) {
        var array = angular.copy(bookedSeats);

        function isBooked(position) {
            var station = undefined;

            for(var i=0; i<array.length; i++) {
                if(array[i].position == position){
                    station = array[i];
                }
            }

            return station;
        }

        try {
            myStation = undefined;
            for(var i=0; i<distribution.length; i++) {
                for(var j=0; j<distribution[i].length; j++) {
                    if(isBooked(distribution[i][j].getPosition())){
                        distribution[i][j].setStatus('booked');
                        if(stationNumber &&  distribution[i][j].getNumber() == stationNumber){
                            myStation = distribution[i][j];
                        }
                    }
                }
            }
        } catch(error){
            LoggerService.$logger().error(error);
        }

    };

    /**
     * Returns current booked user's station
     * @returns {Station}
     */
    var getMyStation = function () {
        return myStation;
    };


    /**
     * 
     * @type {{broadcast: broadcast, getDistribution: getDistribution, callDistributionByClassroomId: callDistributionByClassroomId, callBookedSeatsByClassId: callBookedSeatsByClassId}}
     */
    service = {
        broadcast: broadcast,
        getDistribution: getDistribution,
        callDistributionByClassroomId: callDistributionByClassroomId,
        callBookedSeatsByClassId: callBookedSeatsByClassId,
        updateBookedSeats: updateBookedSeats,
        getMyStation: getMyStation
    };

    return service;

}]);
