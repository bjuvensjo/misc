define([ 'jQuery', 'Underscore', 'Backbone', 'loan/model/loan' ], function($, _, Backbone, loan) {
    // “model” indicates the nature of the collection. “url” provides the endpoint
    // for the RESTFul API. This is all that’s needed to retrieve, create, update,
    // and delete loans with Backbone’s simple Model API.
    var Collection = Backbone.Collection.extend({
        model : loan,
        url : "api/loan",
        comparator : function(loan) {
            return loan.get('name');
        }
    });

    return Collection;
});