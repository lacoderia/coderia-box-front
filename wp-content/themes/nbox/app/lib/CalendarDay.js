'use strict';

function CalendarDay(date, boxClasses) {

    // Private variables
    var _date = undefined;
    var _boxClasses = [];

    /**
     *
     * @param id
     * @param instructor
     * @param date
     */
    this.constructor = function(date, boxClasses) {
        this.setDate(date);
        this.setBoxClasses(boxClasses);
    };

    /**
     *
     * @param date
     */
    this.setDate = function(date) {
        _date = date;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getDate = function() {
        return _date;
    };

    /**
     *
     * @param boxClasses
     */
    this.setBoxClasses = function(boxClasses) {
        _boxClasses = boxClasses;
    };

    /**
     *
     * @returns {Array}
     */
    this.getBoxClasses = function() {
        return _boxClasses;
    };

    /**
     *
     * @param boxClass
     */
    this.addBoxClass = function(boxClass) {
        _boxClasses.push(boxClass);
    };

    this.constructor(date, _boxClasses);

};