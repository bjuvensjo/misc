define([ 'jQuery', 'Underscore', 'Backbone', 'transfer/model/transfer' ], function($, _, Backbone, transfer) {
    // “model” indicates the nature of the collection. “url” provides the endpoint
    // for the RESTFul API. This is all that’s needed to retrieve, create, update,
    // and delete transfers with Backbone’s simple Model API.
    var Collection = Backbone.Collection.extend({
        model : transfer,
        url : "api/transfer",
        comparator : function(transfer) {
            return transfer.get('date');
        }
    });

    return Collection;
});