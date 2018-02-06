'use strict';

function BoxClass(id, instructorId, instructorName, classroomId, date, availableSeats, description, isFree, isOpening, scheduleType, alternateInstructor) {

    // Private variables
    var _id = undefined;
    var _instructorId = undefined;
    var _instructorName = undefined;
    var _classroomId = undefined;
    var _date = undefined;
    var _availableSeats = undefined;
    var _description = undefined;
    var _isFree = undefined;
    var _isOpening = undefined;
    var _scheduleType = undefined;
    var _alternateInstructor = undefined;


    /**
     *
     * @param id
     * @param instructorId
     * @param instructorName
     * @param classroomId
     * @param date
     * @param availableSeats
     * @param description
     * @param isFree
     * @param isOpening
     * @param scheduleType
     * @param alternateInstructor
     */
    this.constructor = function(id, instructorId, instructorName, classroomId, date, availableSeats, description, isFree, isOpening, scheduleType, alternateInstructor) {
        this.setId(id);
        this.setInstructorId(instructorId);
        this.setInstructorName(instructorName);
        this.setClassroomId(classroomId);
        this.setDate(date);
        this.setAvailableSeats(availableSeats);
        this.setDescription(description);
        this.setIsFree(isFree);
        this.setIsOpening(isOpening);
        this.setScheduleType(scheduleType);
        this.setAlternateInstructor(alternateInstructor);
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
    this.getInstructorId = function() {
        return _instructorId;
    };

    /**
     *
     * @param instructorId
     */
    this.setInstructorId = function(instructorId) {
        _instructorId = instructorId;
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
    this.getClassroomId = function() {
        return _classroomId;
    };

    /**
     *
     * @param classroomId
     */
    this.setClassroomId = function(classroomId) {
        _classroomId = classroomId;
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
    this.getAvailableSeats = function() {
        return _availableSeats
    };

    /**
     * 
     * @param availableSeats
     */
    this.setAvailableSeats = function(availableSeats) {
        _availableSeats = availableSeats;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getDescription = function () {
        return _description;
    };

    /**
     *
     * @param description
     */
    this.setDescription = function (description) {
         _description = description;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getIsFree = function () {
        return _isFree;
    };

    /**
     *
     * @param isFree
     */
    this.setIsFree = function (isFree) {
        _isFree = isFree;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getIsOpening = function () {
        return _isOpening;
    };

    /**
     *
     * @param isOpening
     */
    this.setIsOpening = function (isOpening) {
        _isOpening = isOpening;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getScheduleType = function () {
        return _scheduleType;
    };

    /**
     *
     * @param scheduleType
     */
    this.setScheduleType = function (scheduleType) {
        _scheduleType = scheduleType;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getAlternateInstructor = function () {
        return _alternateInstructor;
    };

    /**
     *
     * @param alternateInstructor
     */
    this.setAlternateInstructor = function (alternateInstructor) {
        _alternateInstructor = alternateInstructor;
    };

    /**
     *
     * @returns {string}
     */
    this.getAvailableSeatsMessage = function (showAll) {

        var message = '';

        if(_availableSeats > 15 && showAll){
            message = 'Aparta un lugar';
        } else if(_availableSeats > 10 && _availableSeats <= 15 && showAll){
            message = '¡A sudar!';
        } else if(_availableSeats <= 10 && _availableSeats > 0 && showAll) {
            message = '¡' + _availableSeats + ' lugares!';
        } else if(_availableSeats == 0 && _instructorId) {
            message = 'LLeno';
        } else if(_availableSeats == 0 && !_instructorId) {
            message = 'Cerrado';
        }

        return message;
    };

    this.constructor(id, instructorId, instructorName, classroomId, date, availableSeats, description, isFree, isOpening, scheduleType, alternateInstructor);

};