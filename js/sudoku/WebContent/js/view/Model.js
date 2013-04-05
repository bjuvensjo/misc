define([ '../generator/generator', '../util/index', '../solver/Notes', '../util/BitSet', '../util/Persistence' ], function (generator,
        indexUtil, Notes, Set, Persistence) {
    var Model = null;
    // TODO Use Notes class!!!
    Model = function () {
        if (!(this instanceof Model)) {
            return new Model();
        }
        this.cells = null;
        this.sudoku = null;
        this.notes = null;
        this.remaining = -1;
        this.errors = -1;
        this.persistence = new Persistence();
    };
    Model.prototype.getErrors = function () {
        return this.errors;
    };
    Model.prototype.getNotes = function () {
        return this.notes;
    };
    Model.prototype.getSolution = function () {
        return this.cells;
    };
    Model.prototype.getSudoku = function () {
        return this.sudoku;
    };
    Model.prototype.initialize = function () {
        var i;
        this.cells = generator.generate();
        this.sudoku = generator.generateSudoku(this.cells);
        this.notes = [];
        this.notes.length = 81;
        this.remaining = 0;
        this.errors = 0;
        for (i = 0; i < this.sudoku.length; i++) {
            if (this.sudoku[i] === 0) {
                this.remaining++;
            }
        }
    };
    Model.prototype.isSolved = function () {
        return this.remaining === 0;
    };
    Model.prototype.createNotes = function () {
        this.notes = new Notes(this.sudoku).getAllValues();
        return this.notes;
    };
    Model.prototype.removeNotes = function (index, value) {
        var cellIndexes, i, theIndex, indexes, theNotes;
        cellIndexes = indexUtil.getBoxIndexes(index).concat(indexUtil.getColumnIndexes(index), indexUtil.getRowIndexes(index));
        indexes = [];
        for (i = 0; i < cellIndexes.length; i++) {
            theIndex = cellIndexes[i];
            theNotes = this.notes[theIndex];
            if (theNotes && theNotes.remove(value)) {
                indexes.push(theIndex);
                if (theNotes.isEmpty()) {
                    this.notes[theIndex] = null;
                }
            }
        }
        return indexes;
    };
    Model.prototype.load = function () {
        var i, model, modelString;
        modelString = this.persistence.getString('model');
        if (modelString) {
            model = JSON.parse(modelString);
            this.cells = model.cells;
            this.sudoku = model.sudoku;
            this.notes = [];
            this.notes.length = model.notes.length;
            for (i = 0; i < model.notes.length; i++) {
                if (model.notes[i]) {
                    this.notes[i] = new Set(model.notes[i].value);
                } else {
                    this.notes[i] = null;
                }
            }
            this.remaining = model.remaining;
            this.errors = model.errors | 0;
        }
    };
    Model.prototype.save = function () {
        var modelString = JSON.stringify(this);
        this.persistence.putString('model', modelString);
    };
    Model.prototype.updateNote = function (index, note) {
        var set;
        if (!this.notes[index]) {
            set = new Set([ note ]);
            this.notes[index] = set;
        } else {
            set = this.notes[index];
            if (set.contains(note)) {
                set.remove(note);
            } else {
                set.add(note);
            }
        }
        return set;
    };
    Model.prototype.updateSudoku = function (index, value) {
        if (value !== this.cells[index]) {
            this.errors++;
            return false;
        } else {
            this.sudoku[index] = value;
            this.remaining--;
            return true;
        }
    };
    return Model;
});
