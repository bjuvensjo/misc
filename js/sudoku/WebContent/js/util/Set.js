define([], function() {
    var Set = null;
    Set = function(values) {
        // values could be a Set or an Array
        if (!(this instanceof Set)) {
            return new Set(values);
        }
        this.content = {};
        this.size = 0;
        this.values = null;
        if (values) {
            this.addAll(values);
        }
    };
    Set.prototype.add = function(value) {
        if (!(this.content.hasOwnProperty(value))) {
            this.content[value] = value;
            this.values = null;
            this.size++;
        }
    };
    Set.prototype.addAll = function(values) {
        // values could be a Set or an Array
        var theValues, i;
        if (Object.prototype.toString.apply(values) === '[object Array]') {
            theValues = values;
        } else {
            theValues = values.asArray();
        }
        for (i = 0; i < theValues.length; i++) {
            this.add(theValues[i]);
        }
    };
    Set.prototype.clear = function() {
        this.content = {};
        this.values = null;
        this.size = 0;
    };
    Set.prototype.remove = function(value) {
        if (this.content.hasOwnProperty(value)) {
            delete this.content[value];
            this.values = null;
            this.size--;
            return true;
        }
        return false;
    };
    Set.prototype.removeAll = function(values) {
        // values could be a Set or an Array
        var theValues, i, count;
        count = 0;
        if (Object.prototype.toString.apply(values) === '[object Array]') {
            theValues = values;
        } else {
            theValues = values.asArray();
        }
        for (i = 0; i < theValues.length; i++) {
            if (this.remove(theValues[i])) {
                count++;
            }
        }
        return count;
    };
    Set.prototype.contains = function(value) {
        //return this.content.hasOwnProperty(value);
        return !!this.content[value];
    };
    Set.prototype.containsAll = function(values) {
        // values could be a Set or an Array
        var theValues, i;
        if ('asArray' in values) {
            theValues = values.asArray();
        } else {
            theValues = values;
        }
        /*
        if (Object.prototype.toString.apply(values) === '[object Array]') {
            theValues = values;
        } else {
            theValues = values.asArray();
        }
        */
        for (i = 0; i < theValues.length; i++) {
            if (!this.contains(theValues[i])) {
                return false;
            }
        }
        return true;
    };
    Set.prototype.getSize = function() {
        return this.size;
    };
    Set.prototype.isEmpty = function() {
        return this.size === 0;
    };    
    Set.prototype.asArray = function() {
        if (this.values) {
            return this.values;
        }
        this.values = [];
        var value = null;
        for (value in this.content) {
            if (this.content.hasOwnProperty(value)) {
                this.values.push(this.content[value]);
            }
        }
        return this.values;
    };
    return Set;
});