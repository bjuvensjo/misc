require([ 'assert', '../index' ], function(assert, index) {

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
        var actual, expected;
        assert('getBoxIndexes' in index);
        assert('getColumnIndexes' in index);
        assert('getRowIndexes' in index);

        // Test box indexes
        actual = index.getBoxIndexes(40);
        expected = [ 30, 31, 32, 39, 40, 41, 48, 49, 50 ];
        assert.deepEqual(actual, expected);
        
        // Test column indexes
        actual = index.getColumnIndexes(16);
        expected = [ 7, 16, 25, 34, 43, 52, 61, 70, 79 ];
        assert.deepEqual(actual, expected);
        
        // Test row indexes
        actual = index.getRowIndexes(65);
        expected = [ 63, 64, 65, 66, 67, 68, 69, 70, 71 ];
        assert.deepEqual(actual, expected);        
    });
});