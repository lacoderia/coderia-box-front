'use strict';

function User(id, firstName, lastName, email, classesLeft, lastClassPurchased, active, coupon, couponValue, balance, isTestUser) {

    // Private attributes
    var _id = undefined;
    var _firstName = undefined;
    var _lastName = undefined;
    var _email = undefined;
    var _classesLeft = undefined;
    var _lastClassPurchased = undefined;
    var _active = false;
    var _coupon = undefined;
    var _couponValue = undefined;
    var _balance = 0;
    var _isTestUser = false;

    /**
     *
     * @param id
     * @param firstName
     * @param lastName
     * @param email
     * @param classesLeft
     * @param lastClassPurchased
     * @param active
     * @param balance
     * @param coupon
     * @param couponValue
     * @param isTestUser
     */

    this.constructor = function(id, firstName, lastName, email, classesLeft, lastClassPurchased, active, coupon, couponValue, balance, isTestUser) {
        this.setId(id);
        this.setFirstName(firstName);
        this.setLastName(lastName);
        this.setEmail(email);
        this.setClassesLeft(classesLeft);
        this.setLastClassPurchased(lastClassPurchased);
        this.setActive(active);
        this.setCoupon(coupon);
        this.setCouponValue(couponValue);
        this.setBalance(balance);
        this.setIsTestUser(isTestUser)
    };

    /**
     *
     * @returns {undefined}
     */
    this.getId = function(){
        return _id;
    };

    /**
     *
     * @param id
     */
    this.setId = function(id){
        _id = id;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getFirstName = function(){
        return _firstName;
    };

    /**
     *
     * @param firstName
     */
    this.setFirstName = function(firstName){
        _firstName = firstName;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getLastName = function(){
        return _lastName;
    };

    /**
     *
     * @param lastName
     */
    this.setLastName = function(lastName){
        _lastName = lastName;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getEmail = function(){
        return _email;
    };

    /**
     *
     * @param email
     */
    this.setEmail = function(email){
        _email = email;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getClassesLeft = function(){
        return _classesLeft;
    };

    /**
     *
     * @param classesLeft
     */
    this.setClassesLeft = function(classesLeft){
        if (classesLeft) {
            _classesLeft = classesLeft;
        } else {
            _classesLeft = 0;
        }

    };

    /**
     *
     * @returns {undefined}
     */
    this.getLastClassPurchased = function(){
        return _lastClassPurchased;
    };

    /**
     *
     * @param credits
     */
    this.setLastClassPurchased = function(lastClassPurchased){
        _lastClassPurchased = lastClassPurchased;
    };

    /**
     *
     * @returns {boolean}
     */
    this.getActive = function(){
        return _active;
    };

    /**
     *
     * @param active
     */
    this.setActive = function(active){
        _active = active;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getCoupon = function(){
        return _coupon;
    };

    /**
     *
     * @param coupon
     */
    this.setCoupon = function(coupon){
        _coupon = coupon;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getCouponValue = function(){
        return _couponValue;
    };

    /**
     *
     * @param coupon
     */
    this.setCouponValue = function(couponValue){
        _couponValue = couponValue;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getBalance = function(){
        return _balance;
    };

    /**
     *
     * @param balance
     */
    this.setBalance = function(balance){
        _balance = balance;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getIsTestUser = function(){
        return _isTestUser;
    };

    /**
     *
     * @param isTestUser
     */
    this.setIsTestUser = function(isTestUser){
        _isTestUser = isTestUser;
    };

    this.constructor(id, firstName, lastName, email, classesLeft, lastClassPurchased, active, coupon, couponValue, balance, isTestUser);

};