define([ 'jQuery', 'Underscore', 'Backbone', 'home/view/home' ], function($, _, Backbone, homeView) {
    var Router = Backbone.Router.extend({
        routes : {
            '' : 'home'
        },
        home : function(actions) {
            $('#page').html(homeView.render().el);
        }        
    });

    return new Router();
});