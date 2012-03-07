Sandbox.modules.reuse = function(box) {
    
    // Inheritance by (shallow) copying properties
	box.extend = function(parent, child) {
	    var i;
	    child = child || {};
	    for (i in parent) {
	        if (parent.hasOwnProperty(i)) {
	            child[i] = parent[i];
	        }
	    }
	    return child;
	};
};
