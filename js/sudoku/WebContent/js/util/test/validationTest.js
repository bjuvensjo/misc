require([ 'assert', '../validation' ], function(assert, validation) {

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
        var actual, expected, cells;
        assert('isAllValid' in validation);
        assert('isValid' in validation);

        // Test isAllValid with valid cells
        cells = [ 8, 5, 6, 1, 7, 4, 2, 9, 3, 9, 7, 1, 2, 8, 3, 5, 6, 4, 4, 2, 3, 6, 5, 9, 8, 7, 1, 7, 4, 5, 3, 1, 6, 9, 2, 8, 1, 3, 2, 5, 9, 8, 7, 4, 6, 6, 8, 9, 4, 2, 7, 3, 1, 5, 3, 9, 8, 7, 4, 1, 6, 5, 2, 5, 6, 4, 9, 3, 2, 1, 8, 7, 2, 1, 7, 8, 6, 5, 4, 3, 9 ];
        actual = validation.isAllValid(cells);
        expected = true;
        assert.strictEqual(actual, expected);
        
        // Test isAllValid with not valid cells
        cells = [ 5, 5, 6, 1, 7, 4, 2, 9, 3, 9, 7, 1, 2, 8, 3, 5, 6, 4, 4, 2, 3, 6, 5, 9, 8, 7, 1, 7, 4, 5, 3, 1, 6, 9, 2, 8, 1, 3, 2, 5, 9, 8, 7, 4, 6, 6, 8, 9, 4, 2, 7, 3, 1, 5, 3, 9, 8, 7, 4, 1, 6, 5, 2, 5, 6, 4, 9, 3, 2, 1, 8, 7, 2, 1, 7, 8, 6, 5, 4, 3, 9 ];
        actual = validation.isAllValid(cells);
        expected = false;
        assert.strictEqual(actual, expected);   
        
        // Test isValid with valid cells
        cells = [ 8, 5, 6, 1, 7, 4, 2, 9, 3, 9, 7, 1, 2, 8, 3, 5, 6, 4, 4, 2, 3, 6, 5, 9, 8, 7, 1, 7, 4, 5, 3, 1, 6, 9, 2, 8, 1, 3, 2, 5, 9, 8, 7, 4, 6, 6, 8, 9, 4, 2, 7, 3, 1, 5, 3, 9, 8, 7, 4, 1, 6, 5, 2, 5, 6, 4, 9, 3, 2, 1, 8, 7, 2, 1, 7, 8, 6, 5, 4, 3, 9 ];
        actual = validation.isValid(cells, 40);
        expected = true;
        assert.strictEqual(actual, expected);   
        
        // Test isValid with not valid cells
        cells = [ 5, 5, 6, 1, 7, 4, 2, 9, 3, 9, 7, 1, 2, 8, 3, 5, 6, 4, 4, 2, 3, 6, 5, 9, 8, 7, 1, 7, 4, 5, 3, 1, 6, 9, 2, 8, 1, 3, 2, 5, 9, 8, 7, 4, 6, 6, 8, 9, 4, 2, 7, 3, 1, 5, 3, 9, 8, 7, 4, 1, 6, 5, 2, 5, 6, 4, 9, 3, 2, 1, 8, 7, 2, 1, 7, 8, 6, 5, 4, 3, 9 ];
        actual = validation.isValid(cells, 10);
        expected = false;
        assert.strictEqual(actual, expected);           
    });
});