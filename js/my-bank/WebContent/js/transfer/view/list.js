define([ 'jQuery', 'Underscore', 'Backbone', 'BootstrapTransition', 'i18n!nls/bundle', 'i18n!nls/format', 'text!template/transfer/view/list.html' ],
function($, _, Backbone, BootstrapTransition, bundle, format, listTemplate) {
    var toogleIcon = function(event) {
        var $icon = $('#icon-' + event.currentTarget.id);
        $icon.toggleClass('icon-chevron-down icon-chevron-right');
    };
    
    var createTemplateModel = function(models) {
        var that = {};
        _.each(models, function(element, index) {
            var from = element.get('from');
            if (!that[from.id]) {
                that[from.id] = [];
            }
            that[from.id].push(element);
        });
        return _.toArray(that);
    };
    
    var View = Backbone.View.extend({
        render : function(eventName) {
            var compiledTemplate = _.template(listTemplate, {
                froms : createTemplateModel(this.collection.models),
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