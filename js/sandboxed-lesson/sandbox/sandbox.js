var Sandbox = function(callback) {
	// To make a real array out of arguments
	var args = Array.prototype.slice.call(arguments),
	// The last argument is the callback
	callback = args.pop(),
	// Arguments can be passed as an array or as individual parameters
	modules = (args[0] && typeof args[0] === 'string') ? args : args[0], i = undefined;

	if (!(this instanceof Sandbox)) {
		return new Sandbox(callback);
	}

	// Now add modules
	// No modules or '*' mean 'use all modules'
	if (!modules || modules === '*') {
		modules = [];
		for (i in Sandbox.modules) {
			if (Sandbox.modules.hasOwnProperty(i)) {
				modules.push(i);
			}
		}
	}

	// Initialize the required modules
	for (i = 0; i < modules.length; i += 1) {
		Sandbox.modules[modules[i]](this);
	}

	// Call the callback
	callback(this);
};

Sandbox.prototype = (function() {
	var name = 'sandboxed-lesson', version = '1.0';
	return {
		getName : function() {
			return name;
		},
		getVersion : function() {
			return version;
		}
	};
})();

Sandbox.modules = {};