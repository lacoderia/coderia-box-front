'use strict';

nbox.controller('InstructorController', ['$scope', 'InstructorService', 'UtilsService', 'DEFAULT_VALUES', function($scope, InstructorService, UtilsService, DEFAULT_VALUES){

    var instructorCtrl = this;

    // Scope variables
    /**
     *
     * @type {Array}
     */
    var _instructors = [];

    /**
     *
     * @type {string}
     * @private
     */
    var _instructorQuote = "";

    /**
     * Determines if mobile version is shown
     * @type {boolean}
     */
    var isMobile = false;

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
    instructorCtrl.isMobile = function() {
        return isMobile;
    };

    /**
     *
     * @returns {Array}
     */
    instructorCtrl.getInstructors = function() {
        return _instructors;
    };

    /**
     *
     * @returns {Array}
     */
    var getInstructorBySlideId = function(slideId) {
        return _instructors[slideId];
    };

    /**
     *
     * @returns {string}
     */
    instructorCtrl.getInstructorQuote = function() {
        return _instructorQuote;
    };

    /**
     *
     * @param instructor
     */
    instructorCtrl.changeQuote = function(instructor) {
        _instructorQuote = "";
        if(instructor){
            _instructorQuote = instructor.getQuote();
        }
    };

    /**
     *
     * @param id
     */
    instructorCtrl.showInstructorProfile = function(id) {
        window.location.href = UtilsService.getHomeUrl() + 'instructor?id=' + id;
    };

    instructorCtrl.slickConfig = {
        event: {
            init: function() {
                if(_instructors.length){
                    instructorCtrl.changeQuote(_instructors[0]);
                }
            },
            beforeChange: function (event, slick, currentSlide, nextSlide) {
            },
            afterChange: function (event, slick, currentSlide, nextSlide) {
                var instructor = getInstructorBySlideId(currentSlide);
                instructorCtrl.changeQuote(instructor);
            }
        }
    };

    /**
     * Initialize controller
     * @param instructors
     */
    instructorCtrl.init = function(instructors) {
        InstructorService.setInstructors(instructors);
        _instructors = InstructorService.getInstructors();
    };

}]);