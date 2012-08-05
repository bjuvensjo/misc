define(['./index'], function(indexUtil) {
    var Validation = null;
    Validation = function() {
        if (!(this instanceof Validation)) {
            return new Validation();
        }
    };
    Validation.prototype.isAllValid = function(cells) {
        var index;
        for (index = 0; index < cells.length; index++) {
            if (cells[index] === 0 || !this.isValid(cells, index)) {
                return false;
            }
        }
        return true;
    };
    Validation.prototype.isValid = function(cells, index) {
        var hasDuplicate;
        hasDuplicate = function(cells, indexes) {
            var values = {}, value, i;        
            for (i = 0; i < indexes.length; i++) {
                value = cells[indexes[i]];
                if (value) {
                    if (values[value]) {
                        return true;
                    } else {
                        values[value] = value;
                    };
                };
            }
            return false;        
        };    
        return !(hasDuplicate(cells, indexUtil.getBoxIndexes(index)) || hasDuplicate(cells, indexUtil.getColumnIndexes(index)) || hasDuplicate(cells, indexUtil.getRowIndexes(index)));
    };
    return new Validation();    
});
