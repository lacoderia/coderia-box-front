'use strict';

function Instructor(id, name, bio, quote, picture, pictureBio) {

    // Private variables
    var _id = undefined;
    var _name = undefined;
    var _bio = undefined;
    var _quote = undefined;
    var _picture = undefined;
    var _className = undefined;
    var _pictureBio = undefined;

    /**
     *
     * @param id
     * @param name
     * @param bio
     * @param quote
     * @param picture
     */
    this.constructor = function(id, name, bio, quote, picture, pictureBio) {
        this.setId(id);
        this.setName(name);
        this.setBio(bio);
        this.setQuote(quote);
        this.setPicture(picture);
        this.setPictureBio(pictureBio);
        this.setClassName((picture) ? {'background': 'url(' + picture + ') no-repeat'} : undefined);
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
    this.getId = function() {
        return _id;
    };

    /**
     *
     * @param name
     */
    this.setName = function(name) {
        _name = name;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getName = function() {
        return _name;
    };

    /**
     *
     * @param bio
     */
    this.setBio = function(bio) {
        _bio = bio;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getBio = function() {
        return _bio;
    };

    /**
     *
     * @param quote
     */
    this.setQuote = function(quote) {
        _quote = quote;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getQuote = function() {
        return _quote;
    };

    /**
     *
     * @param homePicture
     */
    this.setPicture = function(picture) {
        _picture = picture;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getPicture = function() {
      return _picture;
    };

    /**
     *
     * @param bioPicture
     */
    this.setPictureBio = function(pictureBio) {
        _pictureBio = pictureBio;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getPictureBio = function() {
        return _pictureBio;
    };

    /**
     *
     * @param className
     */
    this.setClassName = function(className) {
        _className = className
    };

    /**
     *
     * @returns {undefined}
     */
    this.getClassName = function() {
        return _className;
    };

    // Calls constructor function
    this.constructor(id, name, bio, quote, picture, pictureBio);

};
