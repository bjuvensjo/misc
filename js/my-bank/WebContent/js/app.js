define([ 'Backbone', 'navigation/view/navigation', 'account/router', 'home/router', 'loan/router', 'overview/router',
        'transfer/router' ], function(Backbone, navigationView, accountRouter) {
    var initialize = function() {
        $('#menu').html(navigationView.render().el);
        Backbone.history.start();
    };
    
    accountRouter.on('all', function(eventName) {
        console.log('all: ' + eventName);
    });

    return {
        initialize : initialize
    };
});