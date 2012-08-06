define([], function() {
    var Index = null;
    Index = function() {
        if (!(this instanceof Index)) {
            return new Index();
        }
    };
    Index.prototype.getBoxIndexes = function(index) {
        var indexes = [], boxIndex = Math.floor(index / 27) * 27 + Math.floor((index % 9) / 3) * 3, i;
        for (i = 0; i < 9; i++) {
            indexes.push(boxIndex);
            boxIndex++;
            if (boxIndex % 3 === 0) {
                boxIndex += 6;
            }
        }
        return indexes;        
    };    
    Index.prototype.getColumnIndexes = function(index) {
        var indexes = [], columnIndex = index % 9, i;
        for (i = 0; i < 9; i++) {
            indexes.push(columnIndex);
            columnIndex += 9;
        }
        return indexes;        
    };
    Index.prototype.getRowIndexes = function(index) {
        var indexes = [], rowIndex = Math.floor(index / 9) * 9, i;
        for (i = 0; i < 9; i++) {
            indexes.push(rowIndex);
            rowIndex++;
        }
        return indexes;
    };    
    return new Index();    
});
