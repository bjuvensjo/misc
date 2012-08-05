define([ 'jQuery', 'Underscore', 'Backbone', 'BootstrapTransition', 'i18n!nls/bundle', 'i18n!nls/format', 'text!template/loan/view/list.html' ],
function($, _, Backbone, BootstrapTransition, bundle, format, listTemplate) {
    var toogleIcon = function(event) {
        var $icon = $('#icon-' + event.currentTarget.id);
        $icon.toggleClass('icon-chevron-down icon-chevron-right');
    };
    
    var createTemplateModel = function(models) {
        var that = models;
        return that;
    };
    
    var View = Backbone.View.extend({
        render : function(eventName) {
            var compiledTemplate = _.template(listTemplate, {
                loans : createTemplateModel(this.collection.models),
                bundle : bundle,
                format : format
            });
            
            $(this.el).html(compiledTemplate);
            return this;
        },
        events : {
            'hide .collapse' : toogleIcon,
            'show .collapse' : toogleIcon
        }
    });
    return View;
});