define([ './Set' ], function(Set) {
	
	describe("combination", function() {

        it("constructor", function() {	
            var set = new Set([1, 2, 3]);
            expect(set.containsAll([1, 2, 3])).toBe(true);
		});
        
        it("add", function() {	
            var set = new Set();
            set.add(1);
            expect(set.contains(1)).toBe(true);
		});
                
        it("addAll", function() {	
            var set = new Set();
            set.addAll([1, 2, 3]);
            expect(set.asArray().length).toBe(3);
            expect(set.containsAll([1, 2, 3])).toBe(true);
		});
        
        it("containsAll", function() {	
            var set1 = new Set([1, 2, 3]);
            var set2 = new Set([1, 2]);
            
            expect(set1.containsAll(set2)).toBe(true);
            expect(set2.containsAll(set1)).toBe(false);
		});
        
	});
});