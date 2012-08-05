require([ 'assert', '../combination', '../Set' ], function(assert, combination, Set) {

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
        var actual, expected, values;
        assert(combination);
        assert('getCombinations' in combination);
        values = [ 1, 2, 3, 4 ];
        assert(values);

        // Test combinations of length 1
        actual = combination.getCombinations(values, 1);
        expected = [ [ 1 ], [ 2 ], [ 3 ], [ 4 ] ];
        assert.equal(actual.length, expected.length);
        assert.deepEqual(actual, expected);

        // Test combinations of length 2
        actual = combination.getCombinations(values, 2);
        expected = [ [ 2, 1 ], [ 3, 1 ], [ 4, 1 ], [ 3, 2 ], [ 4, 2 ], [ 4, 3 ] ];
        assert.equal(actual.length, expected.length);
        assert.deepEqual(actual, expected);

        // Test combinations of length 3
        actual = combination.getCombinations(values, 3);
        expected = [ [ 3, 2, 1 ], [ 4, 2, 1 ], [ 4, 3, 1 ], [ 4, 3, 2 ] ];
        assert.equal(actual.length, expected.length);
        assert.deepEqual(actual, expected);

        // Test combinations of length 4
        actual = combination.getCombinations(values, 4);
        expected = [ [ 4, 3, 2, 1 ] ];
        assert.equal(actual.length, expected.length);
        assert.deepEqual(actual, expected);
    });
});