define([ 'jQuery', 'Underscore', 'Backbone', 'i18n!nls/bundle', 'i18n!nls/format', 'view/component/chart' ], function(
        $, _, Backbone, bundle, format, ChartView) {

    var View = Backbone.View.extend({
        render : function(eventName) { 
            var container = this.options.container;
            var categories = [];
            var data = [];
            var title = bundle.loan;
            _.each(this.collection.models, function(loan) {
                categories.push(loan.get('name'));
                data.push(loan.get('balance'));
            });
            var chartView = new ChartView({
                container : container,
                categories : categories,
                data : data,
                title : title
            });
            chartView.render();
            return this;
        }
    });

    return View;
});