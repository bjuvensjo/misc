define([ 'jQuery', 'Underscore', 'Backbone', 'BootstrapTransition', 'account/view/list', 'loan/view/list' ], function(
        $, _, Backbone, BootstrapTransition, AccountView, LoanView) {

    var View = Backbone.View.extend({
        render : function(eventName) {
            $(this.el).html(new AccountView({
                collection : this.model.get('accountCollection')
            }).render().el);
            $(this.el).append(new LoanView({
                collection : this.model.get('loanCollection')
            }).render().el);
            return this;
        }
    });
    return View;
});