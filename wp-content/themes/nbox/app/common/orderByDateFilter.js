nbox.filter('orderByDate', function(){
    /**
     * Order box class list by date
     * @return _boxClasses
     */
    return function(boxClasses, reverse) {

        var filtered = [];

        angular.forEach(boxClasses, function(item) {
            filtered.push(item);
        });

        filtered.sort(function (a, b) {
            return (a.getDate() > b.getDate() ? 1 : -1);
        });

        if(reverse) filtered.reverse();

        return filtered;
    }
});