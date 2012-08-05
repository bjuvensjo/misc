define([ 'jQuery', 'Underscore', 'Backbone', 'i18n!nls/bundle', 'navigation/model/navigationCollection',
        'text!template/navigation/view/navigation.html', 'BootstrapCollapse' ], function($, _, Backbone, bundle,
        navigationCollection, navigationTemplate, BootstrapCollapse) {

    var NavigationView = Backbone.View.extend({
        render : function(eventName) {
            var data = {
                navigations : navigationCollection.models,
                _ : _,
                BootstrapCollapse : BootstrapCollapse,
                bundle : bundle
            };
            var compiledTemplate = _.template(navigationTemplate, data);
            $(this.el).html(compiledTemplate);
            return this;
        },
        events : {
            'click #back' : function() {
                console.log('history back');
                history.go(-1);
                return false;
            },
            'click .nav' : function() {
                console.log('nav');
                $navCollapse = $('.nav-collapse');
                $navCollapse.height(0); // a hack...
                $navCollapse.removeClass('in'); // a hack...
            }
        }        
    });
    return new NavigationView();
});