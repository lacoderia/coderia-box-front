'use strict';

function Card(active, brand, brandClass, expMonth, expYear, lastNumbers, name, phone, primary, showInfo, uid) {

    // Private attributes
    var _active = undefined;
    var _brand = undefined;
    var _brandClass = undefined;
    var _expMonth = undefined;
    var _expYear = undefined;
    var _lastNumbers = undefined;
    var _name = undefined;
    var _phone = undefined;
    var _primary = undefined;
    var _showInfo = false;
    var _uid = undefined;

    /**
     *
     * @param active
     * @param brand
     * @param brandClass
     * @param expMonth
     * @param expYear
     * @param lastNumbers
     * @param name
     * @param phone
     * @param primary
     * @param showInfo
     * @param uid
     */

    this.constructor = function(active, brand, brandClass, expMonth, expYear, lastNumbers, name, phone, primary, showInfo, uid) {
        this.setActive(active);
        this.setBrand(brand);
        this.setBrandClass(brandClass);
        this.setExpMonth(expMonth);
        this.setExpYear(expYear);
        this.setLastNumbers(lastNumbers);
        this.setName(name);
        this.setPhone(phone);
        this.setPrimary(primary);
        this.setShowInfo(showInfo);
        this.setUid(uid);
    };

    /**
     *
     * @returns {undefined}
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
    this.getBrand = function(){
        return _brand;
    };

    /**
     *
     * @param brand
     */
    this.setBrand = function(brand){
        _brand = brand;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getBrandClass = function(){
        return _brandClass;
    };

    /**
     *
     * @param brandClass
     */
    this.setBrandClass = function(brandClass){
        _brandClass = brandClass;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getExpMonth = function(){
        return _expMonth;
    };

    /**
     *
     * @param expMonth
     */
    this.setExpMonth = function(expMonth){
        _expMonth = expMonth;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getExpYear = function(){
        return _expYear;
    };

    /**
     *
     * @param expYear
     */
    this.setExpYear = function(expYear){
        _expYear = expYear;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getLastNumbers = function(){
        return _lastNumbers;
    };

    /**
     *
     * @param lastNumbers
     */
    this.setLastNumbers = function(lastNumbers){
        _lastNumbers = lastNumbers;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getName = function(){
        return _name;
    };

    /**
     *
     * @param name
     */
    this.setName = function(name){
        _name = name;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getPhone = function(){
        return _phone;
    };

    /**
     *
     * @param phone
     */
    this.setPhone = function(phone){
        _phone = phone;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getPrimary = function(){
        return _primary;
    };

    /**
     *
     * @param primary
     */
    this.setPrimary = function(primary){
        _primary = primary;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getShowInfo = function(){
        return _showInfo;
    };

    /**
     *
     * @param showInfo
     */
    this.setShowInfo = function(showInfo){
        _showInfo = showInfo;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getUid = function(){
        return _uid;
    };

    /**
     *
     * @param uid
     */
    this.setUid = function(uid){
        _uid = uid;
    };

    this.constructor(active, brand, brandClass, expMonth, expYear, lastNumbers, name, phone, primary, showInfo, uid);

};