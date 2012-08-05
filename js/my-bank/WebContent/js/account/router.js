define([ 'jQuery', 'Underscore', 'Backbone', 'account/model/accountCollection', 'account/view/list', 'account/view/chart' ], function($, _,
        Backbone, AccountCollection, ListView, ChartView) {
    var accountCollection = null;

    var Router = Backbone.Router.extend({
        routes : {
            'account' : 'list',
        },
        list : function() {
            var render = function() {
                var listView = new ListView({
                    collection : accountCollection
                });
                $('#page').html(listView.render().el);
                var chartView = new ChartView({
                    collection : accountCollection,
                    container: 'chart'
                });
                chartView.render();
            };
            if (!accountCollection) {
                accountCollection = new AccountCollection();
                // render();
            }
            // As now implemented the accountCollection is updated for each navigation.
            accountCollection.fetch({
                success : function() {
                    render();
                }
            });
        }
    });

    return new Router();
});