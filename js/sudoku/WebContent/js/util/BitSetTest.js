define([ './BitSet' ], function(BitSet) {
	
	describe("combination", function() {

        it("constructor", function() {	
            var set = new BitSet([1, 2, 3, 3]);
            expect(set.containsAll([1, 2, 3])).toBe(true);
		});
        
        it("add", function() {	
            var set = new BitSet();
            set.add(1);
            set.add(2);
            set.add(3);
            expect(set.contains(1)).toBe(true);
            expect(set.contains(2)).toBe(true);
            expect(set.contains(3)).toBe(true);
		});
                
        it("addAll", function() {	
            var set = new BitSet([1, 2, 3]);
            set.addAll([4, 5, 6]);
            set.addAll(new BitSet([4, 5, 6, 7, 8, 9]));
            expect(set.asArray().length).toBe(9);
            expect(set.containsAll([1, 2, 3])).toBe(true);
		});
        
        it("containsAll", function() {	
            var set1 = new BitSet([1, 2, 3]);
            var set2 = new BitSet([1, 2]);
            expect(set1.containsAll(set2)).toBe(true);
            expect(set2.containsAll(set1)).toBe(false);
		});

        it("asArray", function() {	
            var set = new BitSet([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
            expect(set.asArray().length).toBe(10);
            expect(set.asArray()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
		});

        it("contains", function() {
            var i;
            var set = new BitSet([1, 2, 3]);
            set.addAll([4, 5, 6]);
            set.addAll(new BitSet([7, 8]));
            set.add(9);
            for (i = 1; i < 10; i++) {
                expect(set.contains(i)).toBe(true);
            }
            expect(set.contains(0)).toBe(false);
            expect(set.contains(10)).toBe(false);
		});

        it("getSize", function() {
            var set = new BitSet([1, 2, 3, 4, 5]);
            set.removeAll([1, 2]);
            set.remove(3);
            expect(set.getSize()).toBe(2);
		});
        
        it("isEmpty", function() {
            var set = new BitSet([1, 2, 3, 4, 5]);
            set.removeAll([1, 2]);
            set.remove(3);
            expect(set.isEmpty()).toBe(false);
            
            set = new BitSet();
            expect(set.isEmpty()).toBe(true);
		});

        it("remove", function() {
            var set = new BitSet();
            set.add(1);
            set.add(2);
            set.add(3);
            set.remove(1);
            set.remove(2);
            expect(set.contains(1)).toBe(false);
            expect(set.contains(2)).toBe(false);
            expect(set.contains(3)).toBe(true);
		});

        it("removeAll", function() {
            var set = new BitSet([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            set.removeAll([4, 5, 6]);
            expect(set.getSize()).toBe(6);
            expect(set.containsAll([1, 2, 3, 7, 8, 9])).toBe(true);
            expect(set.contains(4)).toBe(false);
            expect(set.contains(5)).toBe(false);
            expect(set.contains(6)).toBe(false);
		});
        
	});
});