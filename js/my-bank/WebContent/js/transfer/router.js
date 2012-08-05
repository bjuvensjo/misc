define([ 'jQuery', 'Underscore', 'Backbone', 'transfer/model/transferCollection', 'transfer/view/list' ], function($,
        _, Backbone, TransferCollection, ListView) {
    var transferCollection = null;

    var Router = Backbone.Router.extend({
        routes : {
            'transfer' : 'list',
        },
        list : function() {
            var render = function() {
                var listView = new ListView({
                    collection : transferCollection
                });
                $('#page').html(listView.render().el);
            };
            if (transferCollection) {
                // As now implemented the transferCollection is updated for each navigation.
                // If that's not wanted, toggle the what's commented and not below.
                transferCollection.fetch({
                    success : function() {
                        render();
                    }
                });
                //render();
            } else {
                transferCollection = new TransferCollection();                
                transferCollection.fetch({
                    success : function() {
                        render();
                    }
                });
            }
        }
    });
    
    return new Router();
});