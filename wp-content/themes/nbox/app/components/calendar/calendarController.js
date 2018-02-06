'use strict';

nbox.controller('CalendarController', ['$scope', '$document', '$timeout', 'CalendarService', 'InstructorService', 'usSpinnerService', 'DEFAULT_VALUES', function($scope, $document, $timeout, CalendarService, InstructorService, usSpinnerService, DEFAULT_VALUES){

    // Private variables
    /**
     *
     */
    var calendarCtrl = this;

    /**
     * Determines if the classroom container is shown
     * @type {boolean}
     */
    var showCalendar = true;


    /**
     * Determines if mobile version is shown
     * @type {boolean}
     */
    var isMobile = false;

    /**
     *
     * @type {CalendarDay}
     */
    var selectedDay = undefined;

    /**
     *
     * @type {BoxClass}
     */
    var boxClassInfo = undefined;

    // Scope variables

    /**
     * Instructors list
     * @type {Array}
     */
    calendarCtrl.instructors = [];

    /**
     *
     * @type {undefined}
     * @private
     */
    calendarCtrl.selectedInstructor = undefined;

    /**
     * Schedule Type list
     * @type {Array}
     */
    calendarCtrl.scheduleTypes = [];

    /**
     *
     * @type {undefined}
     * @private
     */
    calendarCtrl.selectedScheduleType = undefined;

    /**
     *
     */
    calendarCtrl.week = [];

    // Listeners
    /**
     * Listens for 'close classroom' event
     */
    $scope.$on('closeClassroom', function($event){
        setShowCalendar(true);
        $timeout(function(){
            var calendarContainer = angular.element(document.getElementById('calendar'));
            $document.scrollToElement(calendarContainer, 130, 800);
        }, 500);
    });

    /**
     * Listens for 'userNeedsClasses' event
     */
    $scope.$on('userNeedsClasses', function($event, args) {
        setShowCalendar(false);
    });

    /**
     * Listens for window resize
     */
    $scope.$on('setWindowSize', function($event, windowSize) {
        if(windowSize == DEFAULT_VALUES.BREAKPOINTS.extra_small.code) {
            setMobileMode(true);
        } else{
            setMobileMode(false);
        }
    });

    // Function definition

    /**
     * Sets the mobile mode of the view
     */
    var setMobileMode = function(isMobileMode) {
        isMobile = isMobileMode;
    };

    /**
     * Returns if view is on mobile mode
     * @returns {boolean}
     */
    calendarCtrl.isMobile = function() {
        return isMobile;
    };

    /**
     * Determines if the classroom container is shown
     * @returns {boolean}
     */
    calendarCtrl.isVisible = function() {
        return showCalendar;
    };

    /**
     *
     * @param show
     */
    var setShowCalendar = function(show) {
        showCalendar = show;
    };

    /**
     *
     * @param day
     * @returns {number}
     */
    calendarCtrl.getDayOfWeek = function(day){
        return CalendarService.getDayOfWeek(day);
    };

    /**
     *
     * @param boxClass
     * @returns {boolean}
     */
    calendarCtrl.isClassEnabled = function(boxClass) {
        var now = moment();
        return (boxClass.getDate().diff(now, 'minutes') >= 1) && (boxClass.getAvailableSeats() > 0);
    };

    /**
     *
     * @param boxClass
     * @returns {boolean}
     */
    calendarCtrl.isClassSelectable = function(boxClass) {
        var now = moment();
        return (boxClass.getDate().diff(now, 'minutes') >= 1) && (boxClass.getInstructorId());
    };

    /**
     *
     * @returns {string}
     */
    calendarCtrl.getWeekLabel = function() {
        var firstDay = calendarCtrl.week[0].getDate();
        var lastDay = calendarCtrl.week[6].getDate();

        return (firstDay.month() != lastDay.month())? 'Semana del ' + firstDay.date() + ' de ' + DEFAULT_VALUES.LABEL_MONTHS[firstDay.month()]  + ' al ' + lastDay.date() + ' de ' + DEFAULT_VALUES.LABEL_MONTHS[lastDay.month()] : 'Semana del ' + firstDay.date() + ' al ' + lastDay.date() + ' de ' + DEFAULT_VALUES.LABEL_MONTHS[firstDay.month()];
    };

    /**
     * Set the selected day
     * @param day
     */
    calendarCtrl.setSelectedDay = function(day) {
        calendarCtrl.selectedDay = day;
    };

    /**
     * Determines if selected day and parameter day is the same object
     * @param day
     * @param selectedDay
     * @returns {boolean}
     */
    calendarCtrl.isSameDay = function(day, selectedDay) {
        return (day === selectedDay);
    };

    /**
     *
     * @param boxClass
     */
    calendarCtrl.selectBoxClass = function(boxClass) {
        if (calendarCtrl.isClassSelectable(boxClass)) {
            setShowCalendar(false);
            $timeout(function(){
                CalendarService.broadcast('boxClassSelected', boxClass);
            }, 500);
            usSpinnerService.spin('full-spinner');
        }
    };

    /**
     *
     * @param boxClass
     */
    calendarCtrl.showBoxClassInfo = function(boxClass) {
        boxClassInfo = boxClass;
    };

    /**
     *
     * @param boxClass
     */
    calendarCtrl.isBoxClassInfoShown = function(boxClass) {
        return boxClassInfo == boxClass;
    };

    /**
     *
     * @param instructors
     * @param classes
     */
    calendarCtrl.init = function(scheduleTypes, instructors, weeklySchedule) {
        // Setting the instructors catalog
        InstructorService.setInstructors(instructors);

        // Getting the instructors array
        calendarCtrl.instructors = InstructorService.getInstructors();

        // Setting the instructors catalog
        CalendarService.setScheduleTypes(scheduleTypes);

        // Getting the instructors array
        calendarCtrl.scheduleTypes = CalendarService.getScheduleTypes();

        // Getting the current calendar week
        calendarCtrl.week = CalendarService.getWeek(weeklySchedule);

        // Setting the default day (for mobile mode view)
        if(calendarCtrl.week.length > 0){
            calendarCtrl.selectedDay = calendarCtrl.week[0];
        }
    };

}]);