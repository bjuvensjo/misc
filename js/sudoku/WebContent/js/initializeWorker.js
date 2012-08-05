self.onmessage = function(e) {
	importScripts('lib/require/require.js');
	require({
	        baseUrl: './'
	    },
	    ['view/Model'],
	    function(Model) {
	    	var createNew, model = new Model();
	    	createNew = e.data === 'new'; 
	    	model.initialize(createNew);
	        self.postMessage(model);
	    }
	);	
};
