define([ '../../util/index' ], function (indexUtil) {
    var CompellingStrategy = null;
    CompellingStrategy = function () {
        if (!(this instanceof CompellingStrategy)) {
            return new CompellingStrategy();
        }
    };
    CompellingStrategy.prototype.apply = function (cells, notes) {
        var cellNotes, i, isNoteUnique, j, notesValue, updated;
        updated = [];
        isNoteUnique = function (note, index, indexes, notes) {
            var i;
            for (i = 0; i < indexes.length; i++) {
                if (indexes[i] !== index) {
                    if (notes.getValue(indexes[i]) && notes.getValue(indexes[i]).contains(note)) {
                        return false;
                    }
                }
            }
            return true;
        };
        for (i = 0; i < notes.getSize(); i++) {
            notesValue = notes.getValue(i);
            if (notesValue) {
                cellNotes = notesValue.asArray();
                for (j = 0; j < cellNotes.length; j++) {
                    if (isNoteUnique(cellNotes[j], i, indexUtil.getBoxIndexes(i), notes)
                            || isNoteUnique(cellNotes[j], i, indexUtil.getColumnIndexes(i), notes)
                            || isNoteUnique(cellNotes[j], i, indexUtil.getRowIndexes(i), notes)) {
                        cells[i] = cellNotes[j];
                        notes.update(i, cells[i]);
                        updated.push(i);
                        break;
                    }
                }
            }
        }
        return updated;
    };
    return new CompellingStrategy();
});
