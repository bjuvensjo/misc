require(['assert', '../BitSet'], function(assert, BitSet) {

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
        set = new BitSet();
        assert(set, 'constructor');
        set = new BitSet([1, 2, 3, 3]);
        assert(set.containsAll([1, 2, 3]), 'constructor');
    });

    // Test add
    test(function() {
        var set = null;
        set = new BitSet();
        set.add(1);
        set.add(2);
        set.add(3);
        assert(set.contains(1), 'add');
        assert(set.contains(2), 'add');
        assert(set.contains(3), 'add');
    });
    
    // Test addAll
    test(function() {
        var set = null;
        set = new BitSet([1, 2, 3]);
        set.addAll([4, 5, 6]);
        set.addAll(new BitSet([4, 5, 6, 7, 8, 9]));
        assert.equal(set.asArray().length, 9, 'addAll');
        assert(set.containsAll([1, 2, 3]), 'addAll');
    });
    
    // Test asArray
    test(function() {
        var set = null;
        set = new BitSet([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        assert.equal(set.asArray().length, 10, 'asArray');
        assert.deepEqual(set.asArray(), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 'asArray');
    });    
    
    // Test contains
    test(function() {
        var i, set;
        set = new BitSet([1, 2, 3]);
        set.addAll([4, 5, 6]);
        set.addAll(new BitSet([7, 8]));
        set.add(9);
        for (i = 1; i < 10; i++) {
            assert.equal(set.contains(i), true);
        }
        assert.equal(set.contains(0), false);
        assert.equal(set.contains(10), false);
    });    
    
    // Test containsAll
    test(function() {
        var set1, set2;
        set1 = new BitSet([1, 2, 3]);
        set2 = new BitSet([1, 2]);
        assert.equal(set1.containsAll(set2), true);
        assert.equal(set2.containsAll(set1), false);
    });
    
    // Test getSize and isEmpty
    test(function() {
        var set1, set2;
        set1 = new BitSet();
        set2 = new BitSet([1, 2, 3, 4, 5]);
        set2.removeAll([1, 2]);
        set2.remove(3);
        assert.equal(set1.isEmpty(), true);
        assert.equal(set2.getSize(), 2);
    });   
    
    // Test remove
    test(function() {
        var set = null;
        set = new BitSet();
        set.add(1);
        set.add(2);
        set.add(3);
        set.remove(1);
        set.remove(2);        
        assert(!set.contains(1), 'remove');
        assert(!set.contains(2), 'remove');
        assert(set.contains(3), 'remove');
    });
   
    // Test removeAll
    test(function() {
        var set = null;
        set = new BitSet([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        set.removeAll([4, 5, 6]);
        assert.equal(set.getSize(), 6, 'removeAll');
        assert(set.containsAll([1, 2, 3, 7, 8, 9]), 'removeAll');
        assert(!set.contains(4), 'removeAll');
        assert(!set.contains(5), 'removeAll');
        assert(!set.contains(6), 'removeAll');
        assert.equal(set.getSize(), 6, 'removeAll');
    });
});