'use strict';

nbox.controller('InstructorProfileController', ['$scope', '$timeout', '$document', 'InstructorProfileService', 'usSpinnerService', 'DEFAULT_VALUES', function($scope, $timeout, $document, InstructorProfileService, usSpinnerService, DEFAULT_VALUES){

    var instructorProfileCtrl = this;

    /**
     * Determines if the calendar container is shown
     * @type {boolean}
     */
    var showCalendar = true;

    /**
     *
     * @type {CalendarDay}
     */
    var boxClassInfo = undefined;

    // Scope variables
    /**
     *
     * @type {Array}
     */
    instructorProfileCtrl.instructorProfile = undefined;

    /**
     * Determines if the classroom container is shown
     * @returns {boolean}
     */
    instructorProfileCtrl.isVisible = function() {
        return showCalendar;
    };

    /**
     *
     * @param show
     */
    var setShowCalendar = function(show) {
        showCalendar = show;
    };

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
     *
     * @param day
     * @returns {number}
     */
    instructorProfileCtrl.getDayOfWeek = function(day){
        return InstructorProfileService.getDayOfWeek(day);
    };

    /**
     *
     * @param boxClass
     * @returns {boolean}
     */
    instructorProfileCtrl.isClassEnabled = function(boxClass) {
        var now = moment();
        return (boxClass.getDate().diff(now, 'hours') >= 1) && (boxClass.getAvailableSeats() > 0);
    };

    /**
     *
     * @param boxClass
     * @returns {boolean}
     */
    instructorProfileCtrl.isClassSelectable = function(boxClass) {
        var now = moment();
        return (boxClass.getDate().diff(now, 'minutes') >= 1) && (boxClass.getInstructorId());
    };

    /**
     *
     * @param day
     * @returns {boolean}
     */
    instructorProfileCtrl.hasClassesAvailable = function(day) {
        return (day.getBoxClasses().length > 0);
    };


    /**
     *
     * @returns {string}
     */
    instructorProfileCtrl.getWeekLabel = function() {
        var firstDay = instructorProfileCtrl.instructorProfile.week[0].getDate();
        var lastDay = instructorProfileCtrl.instructorProfile.week[6].getDate();

        return (firstDay.month() != lastDay.month())? 'Semana del ' + firstDay.date() + ' de ' + DEFAULT_VALUES.LABEL_MONTHS[firstDay.month()]  + ' al ' + lastDay.date() + ' de ' + DEFAULT_VALUES.LABEL_MONTHS[lastDay.month()] : 'Semana del ' + firstDay.date() + ' al ' + lastDay.date() + ' de ' + DEFAULT_VALUES.LABEL_MONTHS[firstDay.month()];
    };

    /**
     *
     * @param boxClass
     */
    instructorProfileCtrl.selectBoxClass = function(boxClass) {
        if (instructorProfileCtrl.isClassSelectable(boxClass)) {
            setShowCalendar(false);
            $timeout(function(){
                InstructorProfileService.broadcast('boxClassSelected', boxClass);
            }, 500);
            usSpinnerService.spin('full-spinner');
        }
    };

    /**
     *
     * @param boxClass
     */
    instructorProfileCtrl.showBoxClassInfo = function(boxClass) {
        boxClassInfo = boxClass;
    };

    /**
     *
     * @param boxClass
     */
    instructorProfileCtrl.isBoxClassInfoShown = function(boxClass) {
        return boxClassInfo == boxClass;
    };

    /**
     * Initialize controller
     * @param instructors
     */
    instructorProfileCtrl.init = function(instructor) {
        InstructorProfileService.setInstructorProfile(instructor);
        instructorProfileCtrl.instructorProfile = InstructorProfileService.getInstructorProfile();
    };

}]);