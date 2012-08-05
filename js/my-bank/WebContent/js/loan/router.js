define([ 'jQuery', 'Underscore', 'Backbone', 'loan/model/loanCollection', 'loan/view/list', 'loan/view/chart' ], function($,
        _, Backbone, LoanCollection, ListView, ChartView) {
    var loanCollection = null;

    var Router = Backbone.Router.extend({
        routes : {
            'loan' : 'list',
        },
        list : function() {
            var render = function() {
                var listView = new ListView({
                    collection : loanCollection
                });
                $('#page').html(listView.render().el);
                var chartView = new ChartView({
                    collection : loanCollection,
                    container: 'chart'
                });
                chartView.render();                
            };
            if (loanCollection) {
                // As now implemented the loanCollection is not updated for each navigation, only first
                render();
            } else {
                loanCollection = new LoanCollection();                
                loanCollection.fetch({
                    success : function() {
                        render();
                    }
                });
            }
        }
    });
    
    return new Router();
});