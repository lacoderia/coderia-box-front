nbox.filter('classByInstructor', function(){
    /**
     * Filter box class list by instructor
     * @return _boxClasses
     */
    return function(boxClasses, instructor) {

        var _boxClasses = [];
        if(instructor) {
            for(var i=0; i<boxClasses.length; i++) {
                if(boxClasses[i].getInstructorId() == instructor.getId()){
                    _boxClasses.push(boxClasses[i]);
                }
            }

        } else {
            _boxClasses = boxClasses;
        }

        return _boxClasses;

    }
});