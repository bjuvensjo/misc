var App = Em.Application.create();

// *********************************
// ********** Views ****************
// *********************************
App.FromAccountsView = Em.View.extend({
	accountsBinding : 'App.fromAccountsController.content'
});
App.ToAccountsView = Em.View.extend({
    accountsBinding : 'App.toAccountsController.content'
});
App.UnsignedTransfersView = Em.View.extend({
    transfersBinding : 'App.unsignedTransfersController.content'
});


//*********************************
//********** Controllers **********
//*********************************
App.fromAccountsController = Em.ArrayController.create();
App.toAccountsController = Em.ArrayController.create();
App.unsignedTransfersController = Em.ArrayController.create();


//*********************************
//********** Initialization *******
//*********************************
(function() {
    $.getJSON('rest/payment', function(data) {
        App.fromAccountsController.set('content', data.fromAccounts);
        App.toAccountsController.set('content', data.toAccounts);
        App.unsignedTransfersController.set('content', data.unsignedTransfers);
    });
}());
console.log(5);
