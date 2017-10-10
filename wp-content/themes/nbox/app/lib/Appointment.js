'use strict';

function Appointment(id, instructorName, status, stationNumber, date, boxClass) {

    // Private variables
    var _id = undefined;
    var _instructorName = undefined;
    var _status = undefined;
    var _stationNumber = undefined;
    var _date = undefined;
    var _boxClass = undefined;

    /**
     *
     * @param id
     * @param instructorName
     * @param status
     * @param stationNumber
     * @param date
     */
    this.constructor = function(id, instructorName, status, stationNumber, date, boxClass) {
        this.setId(id);
        this.setInstructorName(instructorName);
        this.setStatus(status);
        this.setStationNumber(stationNumber);
        this.setDate(date);
        this.setBoxClass(boxClass);
    };

    /**
     *
     * @returns {undefined}
     */
    this.getId = function() {
        return _id;
    };

    /**
     *
     * @param id
     */
    this.setId = function(id) {
        _id = id;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getInstructorName = function() {
        return _instructorName;
    };

    /**
     *
     * @param instructorName
     */
    this.setInstructorName = function(instructorName) {
        _instructorName = instructorName;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getStatus = function() {
        return _status;
    };

    /**
     *
     * @param status
     */
    this.setStatus = function(status) {
        _status = status;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getStationNumber = function() {
        return _stationNumber;
    };

    /**
     *
     * @param stationNumber
     */
    this.setStationNumber = function(stationNumber) {
        _stationNumber = stationNumber;
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
     * @param date
     */
    this.setDate = function(date) {
        _date = (date)? moment(date) : undefined;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getBoxClass = function() {
        return _boxClass;
    };

    /**
     *
     * @param boxClass
     */
    this.setBoxClass = function(boxClass) {
        _boxClass = boxClass;
    };

    /**
     * Prints object string
     * @returns {string}
     */
    this.toString = function() {
       return 'Appointment: {' +
           ' id: ' + this.getId() +
           ', instructor_name: ' + this.getInstructorName() +
           ', status: ' + this.getStatus() +
           ', station_number: ' + this.getStationNumber() +
           ', date: ' + this.getDate() +
           ', box_class: ' + this.getBoxClass().toString() +
        '}';
    };

    this.constructor(id, instructorName, status, stationNumber, date, boxClass);

};