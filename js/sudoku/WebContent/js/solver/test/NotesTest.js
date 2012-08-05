require([ 'assert', '../Notes', '../../util/BitSet' ], function(assert, Notes, Set) {

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
        var actual, cells, expected, notes;
        
        cells = [8, 5, 6, 1, 7, 4, 2, 9, 3, 9, 7, 1, 2, 8, 3, 5, 6, 4, 4, 2, 3, 6, 5, 9, 8, 7, 1, 7, 4, 5, 3, 1, 6, 9, 2, 8, 1, 3, 2, 5, 9, 8, 7, 4, 6, 6, 8, 9, 4, 2, 7, 3, 1, 5, 3, 9, 8, 7, 4, 1, 6, 5, 2, 5, 6, 4, 9, 3, 2, 1, 8, 7, 2, 1, 7, 8, 6, 5, 4, 3, 9];
        notes = new Notes(cells);
        actual = notes.getValues([0]);
        expected = [null];
        assert.deepEqual(actual, expected);
        
        cells = [0, 5, 6, 1, 7, 4, 2, 9, 3, 9, 7, 1, 2, 8, 3, 5, 6, 4, 4, 2, 3, 6, 5, 9, 8, 7, 1, 7, 4, 5, 3, 1, 6, 9, 2, 8, 1, 3, 2, 5, 9, 8, 7, 4, 6, 6, 8, 9, 4, 2, 7, 3, 1, 5, 3, 9, 8, 7, 4, 1, 6, 5, 2, 5, 6, 4, 9, 3, 2, 1, 8, 7, 2, 1, 7, 8, 6, 5, 4, 3, 9];
        notes = new Notes(cells);
        actual = notes.getValues([0]);
        expected = [new Set([8])];
        assert.deepEqual(actual, expected);
        
        actual = notes.getValue(0);
        expected = new Set([8]);
        assert.deepEqual(actual, expected);
        
        notes.update(0, 8);
        actual = notes.getValues([0]);
        expected = [null];
        assert.deepEqual(actual, expected);
        
        actual = notes.getSize();
        expected = 81;
        assert.deepEqual(actual, expected);
    });
});