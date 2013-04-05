define([ '../util/index', '../util/validation', '../solver/Solver', '../solver/strategy/compellingStrategy',
        '../solver/strategy/completeStrategy', '../solver/strategy/partnershipStrategy' ], function (indexUtil, validation, Solver,
        compellingStrategy, completeStrategy, partnershipStrategy) {
    var Generator = null, getRandomizedRange;
    getRandomizedRange = function (start, end) {
        var randomizedRange, range, i;
        randomizedRange = [];
        range = [];
        for (i = start; i <= end; i++) {
            range.push(i);
        }
        while (range.length !== 0) {
            i = Math.floor(Math.random() * range.length);
            randomizedRange.push(range[i]);
            range.splice(i, 1);
        }
        return randomizedRange;
    };
    Generator = function () {
        if (!(this instanceof Generator)) {
            return new Generator();
        }
    };
    Generator.prototype.generate = function () {
        var cells, generateCell;
        cells = [];
        generateCell = function (cells, index) {
            var candidates, i, numberOfCells;
            candidates = getRandomizedRange(1, 9);
            numberOfCells = 81;
            for (i = 0; i < candidates.length; i++) {
                cells[index] = candidates[i];
                if (validation.isValid(cells, index) && (index + 1 === numberOfCells || generateCell(cells, index + 1))) {
                    return true;
                }
            }
            cells[index] = 0;
            return false;
        };
        generateCell(cells, 0);
        return cells;
    };
    Generator.prototype.generateSudoku = function (cells) {
        var i, indexes, solvable, solver, sudoku, sudokuClone;
        sudoku = cells.slice(0);
        solver = new Solver([ completeStrategy, compellingStrategy, partnershipStrategy ]);
        indexes = getRandomizedRange(0, 80);
        for (i = 0; i < indexes.length; i++) {
            sudoku[indexes[i]] = 0;
            sudokuClone = sudoku.slice(0);
            solvable = solver.solve(sudokuClone).valid;
            if (!solvable) {
                sudoku[indexes[i]] = cells[indexes[i]];
            }
        }
        return sudoku;
    };
    return new Generator();
});