'use strict';

nbox.factory('CalendarService', ['$rootScope', 'LoggerService', 'DEFAULT_VALUES', function($rootScope,  LoggerService, DEFAULT_VALUES){

    // Variables definition
    /**
     *  Service object
     */
    var service;

    /**
     * Array with the schedule types list
     * @type {Array}
     */
    this.scheduleTypes = [];

    /**
     *
     * @type {Array}
     */
    var weekCalendar = [];

    /**
     *
     *
     */
    var dayClasses = [];

    // Functions definition

    /**
     *
     * @param msg
     * @param data
     */
    var broadcast = function(msg, data) {
        $rootScope.$broadcast(msg, data);
    };

    var transformScheduleTypes = function(array){
        var list = [];

        try{
            for(var i=0; i<array.length; i++) {
                var item = array[i];
                list.push(new ScheduleType(item.id, item.description));
            }
        } catch(error){
            LoggerService.$logger().error(error);
        }

        return list;
    };

    /**
     * Return an array with the schedule types list
     * @returns {*|Array}
     */
    var getScheduleTypes = function() {
        return angular.copy(this.scheduleTypes);
    };

    /**
     * Set the schedule types list as an array
     * @param scheduleTypes
     */
    var setScheduleTypes = function(scheduleTypes) {
        if(scheduleTypes){
            this.scheduleTypes = transformScheduleTypes(scheduleTypes);
        }
    };

    var transformToObject = function(array){
        var list = [];

        try {
            for (var i = 0; i < array.length; i++) {
                var item = array[i];
                var instructor = new Instructor();

                if(item.instructor){
                    instructor.setId(item.instructor.id);
                    instructor.setName(item.instructor.first_name);
                }

                var boxClass = new BoxClass(item.id, instructor.getId(), instructor.getName(), item.room.id, item.datetime, item.available_seats, item.description, item.free, item.opening, new ScheduleType(item.schedule_type.id, item.schedule_type.description), (item.alternate_instructor ? item.alternate_instructor.first_name : '') );
                list.push(boxClass);
            }
        } catch(error){
            LoggerService.$logger().error(error);
        }

        return list;
    };

    /**
     *
     * @param classes
     */
    var setBoxClasses = function(classes) {
        if(classes){
            dayClasses = transformToObject(classes);
        }
    };

    /**
     *
     * @param boxClass
     * @param calendarDay
     * @returns {boolean|*}
     */
    var isSameDay = function(boxClass, calendarDay) {
        return  (boxClass.getDate().date() == calendarDay.getDate().date()) &&
                (boxClass.getDate().month() == calendarDay.getDate().month());
    };
    

    /**
     *
     * @param calendarDay
     * @returns {*}
     */
    var getBoxClasses = function(calendarDay) {
        for(var dayIndex=0; dayIndex<dayClasses.length; dayIndex++) {
            var boxClass = dayClasses[dayIndex];
            if(isSameDay(boxClass, calendarDay)) {
                calendarDay.getBoxClasses().push(boxClass);
            }
        }

        calendarDay.setBoxClasses(calendarDay.getBoxClasses());

        return calendarDay;
    };

    /**
     *
     * @returns {*|Map.<K, V>|Map.<string, V>}
     */
    var getWeek = function(weeklySchedule) {

        setBoxClasses(weeklySchedule.schedules);

        for(var i=0; i<DEFAULT_VALUES.WEEK_LENGTH; i++) {
            var day = moment(weeklySchedule.start_day).add({'days': i});
            var calendarDay = new CalendarDay(day, []);
            weekCalendar.push(getBoxClasses(calendarDay));
        }
        return weekCalendar;
    };

    /**
     *
     * @param day
     * @returns {number}
     */
    var getDayOfWeek = function(day) {
        return (day>=0 && day<=7)? DEFAULT_VALUES.DAYS_OF_WEEK[day]: -1;
    };


    service = {
        broadcast: broadcast,
        getScheduleTypes: getScheduleTypes,
        setScheduleTypes: setScheduleTypes,
        getWeek: getWeek,
        getDayOfWeek: getDayOfWeek
    };

    return service;

}]);
