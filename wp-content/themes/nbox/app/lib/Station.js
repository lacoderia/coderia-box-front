'use strict';

function Station(position, number, status, description, style) {

    // Private variables
    var _position = undefined;
    var _number = undefined;
    var _status = undefined;
    var _description = undefined;
    var _style = undefined;

    /**
     *
     * @param position
     * @param number
     * @param status
     * @param description
     * @param style
     */
    this.constructor = function(position, number, status, description, style) {
        this.setPosition(position);
        this.setNumber(number);
        this.setStatus(status);
        this.setDescription(description);
        this.setStyle(style);
    };

    /**
     *
     * @param number
     */
    this.setPosition = function(position) {
        _position = position;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getPosition = function() {
        return _position;
    };

    /**
     *
     * @param number
     */
    this.setNumber = function(number) {
        _number = number;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getNumber = function() {
        return _number;
    };

    /**
     *
     * @param string
     */
    this.setStatus = function(status) {
        _status = status;
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
     * @param string
     */
    this.setDescription = function(description) {
        _description = description;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getDescription = function() {
        return _description;
    };

    /**
     *
     * @param boolean
     */
    this.setStyle = function(style) {
        _style = style;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getStyle = function() {
        return _style;
    };

    /**
     * 
     * @returns {string}
     */
    this.toString = function() {
        return 'Station: {' +
            ' position: ' + this.getPosition() +
            ', number: ' + this.getNumber() +
            ', status: ' + this.getStatus() +
            ', description: ' + this.getDescription() +
            ', style: ' + this.getStyle() +
        '}';
    }

    this.constructor(position, number, status, description, style);

};