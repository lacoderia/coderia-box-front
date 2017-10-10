'use strict';

nbox.factory('InstructorService', ['$http', '$q', 'LoggerService', function($http, $q, LoggerService){

    // Variables definition
    /**
     *  Service object
     */
    var service;

    /**
     * Array with the instructors list
     * @type {Array}
     */
    this.instructors = [];

    var transformToObject = function(array){
        var list = [];

        try{
            for(var i=0; i<array.length; i++) {
                var item = array[i];
                list.push(new Instructor(item.id, item.first_name, item.bio, item.quote, item.picture, item.picture_2));
            }
        } catch(error){
            LoggerService.$logger().error(error);
        }

        return list;
    };

    /**
     * Return an array with the instructors list
     * @returns {*|Array}
     */
    var getInstructors = function() {
        return angular.copy(this.instructors);
    };

    /**
     * Set the instructors list as an array
     * @param instructors
     */
    var setInstructors = function(instructors) {
        if(instructors){
            this.instructors = transformToObject(instructors);
        }
    };

    /**
     *
     * @param instructorId
     * @returns {undefined}
     */
    var getInstructorById = function(instructorId) {
        var instructor = undefined;
        for(var i=0; i<this.instructors.length; i++){
            var currentInstructor = this.instructors[i];
            if(currentInstructor.getId() == instructorId) {
                instructor = currentInstructor;
                break;
            }
        }
        return instructor;
    };

    /**
     *
     * @type {{getInstructors: getInstructors, setInstructors: setInstructors, getInstructorById: getInstructorById}}
     */
    service = {
        "getInstructors": getInstructors,
        "setInstructors": setInstructors,
        "getInstructorById": getInstructorById
    };

    /**
     * return service
     */
    return service;

}]);