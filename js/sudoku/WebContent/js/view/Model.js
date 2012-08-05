define(['../generator/generator', '../util/index', '../solver/Notes', '../util/BitSet', '../util/Persistence'], function(generator, indexUtil, Notes, Set, Persistence) {
    var Model = null;
    //TODO Use Notes class!!!
    Model = function() {
        if (!(this instanceof Model)) {
            return new Model();
        }
        this.cells = null;
        this.sudoku = null;
        this.notes = null;
        this.remaining = -1;
        this.persistence = new Persistence();
    };
    Model.prototype.getNotes = function() {
        return this.notes;
    };  
    Model.prototype.getSolution = function() {
        return this.cells;
    };  
    Model.prototype.getSudoku = function() {
        return this.sudoku;
    };
    Model.prototype.initialize = function(createNew) {
    	var i;
    	if (createNew) {
            this.cells = generator.generate();
            //var time = new Date().getTime();
            this.sudoku = generator.generateSudoku(this.cells);
            //time = new Date().getTime() - time;
            //console.log('time: ' + time + ' ms.');   
            this.notes = [];
            this.notes.length = 81;
            this.remaining = 0;
            for (i = 0; i < this.sudoku.length; i++) {
    			if (this.sudoku[i] === 0) {
    				this.remaining++;
    			}
    		}
            //this.save();            		
    	} else {
    		//this.load();
    	}
    };
    Model.prototype.isSolved = function() {
        return this.remaining === 0;
    };     
    Model.prototype.createNotes = function() {
        this.notes = new Notes(this.sudoku).getAllValues();
        this.save();
        return this.notes;
    }; 
    Model.prototype.removeNotes = function(index, value) {
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
        this.save();
        return indexes;
    }; 
    Model.prototype.load = function() {
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
    	}
    };    
    Model.prototype.save = function() {
        var modelString = JSON.stringify(this);
        this.persistence.putString('model', modelString);
    };    
    Model.prototype.updateNote = function(index, note) {
        var set;
        if (!this.notes[index]) {
            set = new Set([note]);
            this.notes[index] = set;
        } else {
            set = this.notes[index];
            if (set.contains(note)) {
                set.remove(note);
            } else {
                set.add(note);
            }
        }
        this.save();
        return set;
    };
    Model.prototype.updateSudoku = function(index, value) {
        if (value !== this.cells[index]) {
            return false;
        } else {
            this.sudoku[index] = value;
            this.remaining--;
            this.save();
            return true;
        }
    };
    return Model;
});

