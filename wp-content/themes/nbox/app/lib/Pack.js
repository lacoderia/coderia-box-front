'use strict';

function Pack(id, description, classes, price, specialPrice, forceSpecialPrice, expiration) {

    // Private variables
    var _id = undefined;
    var _description = undefined;
    var _classes = undefined;
    var _price = undefined;
    var _specialPrice = undefined;
    var _forceSpecialPrice = undefined;
    var _expiration = undefined;

    /**
     *
     * @param id
     * @param description
     * @param classes
     * @param price
     * @param specialPrice
     * @param forceSpecialPrice
     * @param expiration
     */
    this.constructor = function(id, description, classes, price, specialPrice, forceSpecialPrice, expiration) {
        this.setId(id);
        this.setDescription(description);
        this.setClasses(classes);
        this.setPrice(price);
        this.setSpecialPrice(specialPrice);
        this.setForceSpecialPrice(forceSpecialPrice);
        this.setExpiration(expiration);
    };

    /**
     *
     * @param number
     */
    this.setId = function(id) {
        _id = id;
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
     * @param description
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
     * @param classes
     */
    this.setClasses = function(classes) {
        _classes = classes;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getClasses = function() {
        return _classes;
    };

    /**
     *
     * @param price
     */
    this.setPrice = function(price) {
        _price = price;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getPrice = function() {
        return _price;
    };

    /**
     *
     * @param specialPrice
     */
    this.setSpecialPrice = function(specialPrice) {
        _specialPrice = specialPrice;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getSpecialPrice = function() {
        return _specialPrice;
    };

    /**
     *
     * @param forceSpecialPrice
     */
    this.setForceSpecialPrice = function(forceSpecialPrice) {
        _forceSpecialPrice = forceSpecialPrice;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getForceSpecialPrice = function() {
        return _forceSpecialPrice;
    };

    /**
     *
     * @param expiration
     */
    this.setExpiration = function(expiration) {
        _expiration = expiration;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getExpiration = function() {
        return _expiration;
    };

    this.constructor(id, description, classes, price, specialPrice, forceSpecialPrice, expiration);

};