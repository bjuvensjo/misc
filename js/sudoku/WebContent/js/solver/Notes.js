define(['../util/index', '../util/BitSet'], function(indexUtil, Set) {
    var Notes = null;
    Notes = function(cells) {
        var index, cellNotes, getCellValues;
        if (!(this instanceof Notes)) {
            return new Notes();
        }
        
        getCellValues = function(cells, indexes) {
            var values = [], value, i;        
            for (i = 0; i < indexes.length; i++) {
                value = cells[indexes[i]];
                values.push(value);
            }
            return values;
        };
        
        this.values = [];
        this.count = 0;
        for (index = 0; index < cells.length; index++) {
            cellNotes = null;
            if (cells[index] === 0) {
                cellNotes = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                cellNotes.removeAll(getCellValues(cells, indexUtil.getBoxIndexes(index)));
                cellNotes.removeAll(getCellValues(cells, indexUtil.getColumnIndexes(index)));
                cellNotes.removeAll(getCellValues(cells, indexUtil.getRowIndexes(index)));
                this.count++;
            }
            this.values.push(cellNotes);
        }
    };
    Notes.prototype.getCount = function() {
        return this.count;
    };      
    Notes.prototype.getSize = function() {
        return this.values.length;
    };    
    Notes.prototype.getAllValues = function() {
        return this.values;
    };
    Notes.prototype.getValue = function(index) {
        return this.values[index];
    };    
    Notes.prototype.getValues = function(indexes) {
        var i, values;
        values = [];
        for (i = 0; i < indexes.length; i++) {
            values.push(this.values[indexes[i]]);
        }
        return values;
    };
    Notes.prototype.update = function(changedIndex, changedValue) {
        var i, index, indexes;
        if (this.values[changedIndex]) {
            this.count--;
        }
        this.values[changedIndex] = null;
        indexes = indexUtil.getBoxIndexes(changedIndex).concat(indexUtil.getColumnIndexes(changedIndex), indexUtil.getRowIndexes(changedIndex));
        for (i = 0; i < indexes.length; i++) {
            index = indexes[i];
            if (this.values[index]) {
                this.values[index].remove(changedValue);
            }
        }
    };    
    return Notes;
});