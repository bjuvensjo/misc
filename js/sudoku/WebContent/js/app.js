require([ 'view/Model', 'view/View' ], function(Model, View) {
    var model, view;
    model = new Model();
    view = new View(model);
    view.initialize();   
});
