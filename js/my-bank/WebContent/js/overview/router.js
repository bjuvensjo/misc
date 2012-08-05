define([ 'jQuery', 'Underscore', 'Backbone', 'overview/model/overview', 'account/model/accountCollection',
        'loan/model/loanCollection', 'overview/view/list' ], function($, _, Backbone, Overview, AccountCollection,
        LoanCollection, ListView) {
    var accountCollection = null;
    var loanCollection = null;

    var Router = Backbone.Router.extend({
        routes : {
            'overview' : 'list',
        },
        list : function() {
            // For understanding of Deferred (when), see http://msdn.microsoft.com/en-us/magazine/gg723713.aspx
            var render = function() {
                var listView = new ListView({
                    model : new Overview({
                        accountCollection : accountCollection,
                        loanCollection : loanCollection
                    })
                });
                $('#page').html(listView.render().el);
            };
            var prepareAccountCollection = function() {
                if (!accountCollection) {
                    accountCollection = new AccountCollection();
                }
                // Fetch always                
                // Fetch seem to return a Deferred
                return accountCollection.fetch();
            };
            var prepareLoanCollection = function() {
                if (!loanCollection) {
                    loanCollection = new LoanCollection();
                    // Fetch only first time
                    // Fetch seem to return a Deferred
                    return loanCollection.fetch();
                }
                return;
            };
            $.when(prepareAccountCollection(), prepareLoanCollection()).then(function() {
                render();
            }).fail(function() {
                console.log('something went wrong!');
            });
        }
    });

    return new Router();
});