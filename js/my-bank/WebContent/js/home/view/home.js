define([ 'jQuery', 'Underscore', 'Backbone', 'text!template/home/view/home.html' ], function($, _, Backbone,
        homeTemplate) {
    var HomeView = Backbone.View.extend({
        render : function(eventName) {
            $(this.el).html(homeTemplate);
            return this;
        }
    });
    return new HomeView();
});