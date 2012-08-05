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
        var actual, cells, expected;
        assert('generate' in generator);

        // Test generate
        cells = generator.generate();
        actual = validation.isAllValid(cells);
        expected = true;
        assert.strictEqual(actual, expected);
    });
});