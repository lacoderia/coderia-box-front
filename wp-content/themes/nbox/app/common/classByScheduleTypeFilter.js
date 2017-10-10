nbox.filter('classByScheduleType', function(){
    /**
     * Filter box class list by schedule type
     * @return _boxClasses
     */
    return function(boxClasses, scheduleType) {

        var _boxClasses = [];
        if(scheduleType) {
            for(var i=0; i<boxClasses.length; i++) {
                if(boxClasses[i].getScheduleType().getId() == scheduleType.getId()){
                    _boxClasses.push(boxClasses[i]);
                }
            }

        } else {
            _boxClasses = boxClasses;
        }

        return _boxClasses;

    }
});