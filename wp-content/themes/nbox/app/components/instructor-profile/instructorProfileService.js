'use strict';

nbox.factory('InstructorProfileService', ['$http', '$q', '$rootScope', 'LoggerService', 'DEFAULT_VALUES', function($http, $q, $rootScope, LoggerService, DEFAULT_VALUES){

    /**
     * Array with the instructors list
     * @type {Array}
     */
    var _instructorProfile;

    /**
     *
     * @param msg
     * @param data
     */
    var broadcast = function(msg, data) {
        $rootScope.$broadcast(msg, data);
    };

    /**
     * Return an array with the instructors list
     * @returns {*|Array}
     */
    var getInstructorProfile = function() {
        return angular.copy(_instructorProfile);
    };

    /**
     * Set the instructors list as an array
     * @param instructorProfile
     */
    var setInstructorProfile = function(instructorProfile) {
        if(instructorProfile){
            _instructorProfile = transformToObject(instructorProfile);
        }
    };

    var transformToObject = function(instructorProfile){

        try {
            var boxClasses = [];
            var weeklySchedules = instructorProfile.weekly_schedules.schedules;
            for (var i = 0; i < weeklySchedules.length; i++) {
                var item = weeklySchedules[i];
                var boxClass = new BoxClass(item.id, instructorProfile.id, instructorProfile.first_name, item.room.id, item.datetime, item.available_seats, item.description, item.free, item.opening, new ScheduleType(item.schedule_type.id, item.schedule_type.description));
                boxClasses.push(boxClass);
            }

            var weekCalendar = [];
            for(var i=0; i<DEFAULT_VALUES.WEEK_LENGTH; i++) {
                var day = moment(instructorProfile.weekly_schedules.start_day).add({'days': i});
                var calendarDay = new CalendarDay(day, []);

                for(var j=0; j<boxClasses.length; j++) {
                    if(boxClasses[j].getDate().isSame(calendarDay.getDate(), 'day')) {
                        calendarDay.addBoxClass(boxClasses[j]);
                    }
                }

                weekCalendar.push(calendarDay);
            }

            instructorProfile.week = weekCalendar;

        } catch(error){
            LoggerService.$logger().error(error);
        }

        return instructorProfile;
    };

    /**
     *
     * @param day
     * @returns {number}
     */
    var getDayOfWeek = function(day) {
        return (day>=0 && day<=7)? DEFAULT_VALUES.DAYS_OF_WEEK[day]: -1;
    };

    return {
        "broadcast": broadcast,
        "getInstructorProfile": getInstructorProfile,
        "setInstructorProfile": setInstructorProfile,
        "getDayOfWeek": getDayOfWeek
    };

}]);