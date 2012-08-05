define([ 'jQuery', 'Underscore', 'Backbone', 'account/model/account' ], function($, _, Backbone, account) {
    // “model” indicates the nature of the collection. “url” provides the endpoint
    // for the RESTFul API. This is all that’s needed to retrieve, create, update,
    // and delete accounts with Backbone’s simple Model API.
    var Collection = Backbone.Collection.extend({
        model : account,
        url : "api/account",
        comparator : function(account) {
            return account.get('name');
        }
    });

    return Collection;
});