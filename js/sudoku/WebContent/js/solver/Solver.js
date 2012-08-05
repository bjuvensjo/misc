define(['./Notes', '../util/validation'], function(Notes, validation) {
    var Solver = null;
    Solver = function(strategies) {
        if (!(this instanceof Solver)) {
            return new Solver();
        }
        this.strategies = strategies;
    };
    Solver.prototype.solve = function(cells) {
        var i, notes, totalProgress, strategyProgress;
        notes = new Notes(cells);
        
        totalProgress = 1;
        while (notes.getCount() > 0 && totalProgress > 0) {
            totalProgress = 0;
            for (i = 0; notes.getCount() > 0 && i < this.strategies.length; i++) {
                strategyProgress = this.strategies[i].apply(cells, notes);
                //console.log(i + ' strategyProgress: ' + strategyProgress);
                totalProgress += strategyProgress.length;
            }
        }            

        return {
            valid: validation.isAllValid(cells),
            cells: cells
        };
    };
    return Solver;
});
