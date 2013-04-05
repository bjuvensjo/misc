self.onmessage = function (e) {
    importScripts('lib/require/require.js');
    require({
        baseUrl : './'
    }, [ 'view/Model' ], function (Model) {
        var model = new Model();
        model.initialize();
        self.postMessage(model);
    });
};
