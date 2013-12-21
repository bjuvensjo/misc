define(function() {
    var getDate = function(day) {
        var date = new Date(), today, delta = 0;
        today = date.getDay();
        if (today === day) {
            delta = 0;
        } else {
            delta = today < day ? day - today : 7 - today + day;
        }
        date.setDate(date.getDate() + delta);
        return date;
    };
    
    return {
        today : function() {
            return getDate(new Date().getDay() + 0);
        },
        tomorrow : function() {
            return getDate(new Date().getDay() + 1);
        },
        sunday: function() {
            return getDate(0);
        },        
        monday: function() {
            return getDate(1);
        },
        tuesday: function() {
            return getDate(2);
        },        
        wednesday: function() {
            return getDate(3);
        },        
        thursday: function() {
            return getDate(4);
        },        
        friday: function() {
            return getDate(5);
        },        
        saturday: function() {
            return getDate(6);
        }
    };
});
