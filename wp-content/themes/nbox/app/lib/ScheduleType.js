'use strict';

function ScheduleType(id, description) {

    // Private variables
    var _id = undefined;
    var _description = undefined;

    /**
     *
     * @param id
     * @param description
     */
    this.constructor = function(id, description) {
        this.setId(id);
        this.setDescription(description);
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


    // Calls constructor function
    this.constructor(id, description);

};
