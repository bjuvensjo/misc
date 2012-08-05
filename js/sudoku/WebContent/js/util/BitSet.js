define([], function() {
    var BitSet = null;
    BitSet = function(values) {
        // values could be a BitSet or an Array
        if (!(this instanceof BitSet)) {
            return new BitSet(values);
        }
        this.value = 0;
        if (values) {
            if (Object.prototype.toString.apply(values) === '[object Array]') {
            	this.addAll(values);
            } else {
                this.value = values;
            }
        }
    };
    BitSet.prototype.add = function(value) {
        this.value |= 1 << value;
    };
    BitSet.prototype.addAll = function(values) {
        // values could be a BitSet or an Array
        var i;
        if (Object.prototype.toString.apply(values) === '[object Array]') {
            for (i = 0; i < values.length; i++) {
                this.add(values[i]);
            }
        } else {
            this.value |= values.getValue();
        }
    };    
    BitSet.prototype.asArray = function() {
        var i, theArray, x;  
        i = 0;
        theArray = [];
        x = this.value;
        while (x) {
            if (x & 1) {
                theArray.push(i);
            }
            i++;
            x = x >>> 1;
        }
        return theArray;
    };        
    BitSet.prototype.clear = function() {
        this.value = 0;
    };
    BitSet.prototype.contains = function(value) {
        return !!(this.value & 1 << value);
    };
    BitSet.prototype.containsAll = function(values) {
        // values could be a BitSet or an Array
        var i;
        if (Object.prototype.toString.apply(values) === '[object Array]') {
            for (i = 0; i < values.length; i++) {
                if (!this.contains(values[i])) {
                    return false;
                }
            }
            return true;            
        } else {
            return (values.getValue() | this.value) === this.value;
        }
    };
    BitSet.prototype.getValue = function() {
        return this.value;
    };
    BitSet.prototype.getSize = function() {
        var size, x;        
        size = 0;
        x = this.value;
        while (x) {
            size += x & 1;
            x = x >>> 1;
        }
        return size;
    };
    BitSet.prototype.isEmpty = function() {
        return this.getSize() === 0;
    };    
    BitSet.prototype.remove = function(value) {
        var oldValue = this.value;
        this.value &= ~(1 << value);
        return oldValue === this.value ? 0 : 1;
    };
    BitSet.prototype.removeAll = function(values) {
        // values could be a BitSet or an Array
        var i, oldValue;
        oldValue = this.value;
        if (Object.prototype.toString.apply(values) === '[object Array]') {
            for (i = 0; i < values.length; i++) {
                this.remove(values[i]);
            }
        } else {
            this.value &= ~(values.getValue());
        }
        return oldValue === this.value ? 0 : 1;
    };
    return BitSet;
});