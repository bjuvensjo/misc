require([ 'assert', '../generator', '../../util/validation' ], function(assert, generator, validation) {

    var test = function(callback) {
        var msg = null;
        try {
            callback();
        } catch (e) {
            msg = 'Failed: expected "' + e.expected + '" but got "' + e.actual + '" instead. Message: ' + e.message + '.';
        }
        if (!msg) {
            msg = 'Passed';
        }
        console.log(msg);
    };

    test(function() {
        var actual, cells, expected, sudoku, time;
        assert('generate' in generator);

        // Test generate
        time = new Date().getTime();
        cells = generator.generate();
        time = new Date().getTime() - time;
        console.log('time generate: ' + time);
        actual = validation.isAllValid(cells);
        expected = true;
        assert.strictEqual(actual, expected);
        
        time = new Date().getTime();
        sudoku = generator.generateSudoku(cells);
        //TODO Add some assertion(s) of sudoku 
        time = new Date().getTime() - time;
        console.log('time generateSudoku: ' + time);
    });
});