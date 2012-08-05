require(['assert', '../Set'], function(assert, Set) {

    var test = function(callback) {
        var msg = null;
        try {
            callback();
        } catch (e) {
            msg = 'Failed: expected "' + e.expected + 
                  '" but got "' + e.actual + '" instead. Message: ' + e.message + '.';
        }
        if (!msg) {
            msg = 'Passed';
        }
        console.log(msg);
    };

    // Test constructor
    test(function() {
        var set = null;
        set = new Set();
        assert(set, 'constructor');
        set = new Set([1, 2, 3]);
        assert(set.containsAll([1, 2, 3]), 'constructor');
    });

    // Test add
    test(function() {
        var set = null;
        set = new Set();
        set.add(1);
        assert(set.contains(1), 'add');
    });
    
    // Test addAll
    test(function() {
        var set = null;
        set = new Set();
        set.addAll([1, 2, 3]);
        assert.equal(set.asArray().length, 3, 'addAll');
        assert(set.containsAll([1, 2, 3]), 'addAll');
    });    
    
    // Test containsAll
    test(function() {
        var set1, set2;
        set1 = new Set([1, 2, 3]);
        set2 = new Set([1, 2]);
        assert.equal(set1.containsAll(set2), true);
        assert.equal(set2.containsAll(set1), false);
    });
});