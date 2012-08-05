var App = Em.Application.create({
    VERSION : "0.1"
});

// *********************************
// ********** Controllers **********
// *********************************
App.applicationController = Em.Object.create({
    view : null
});
App.fromAccountsController = Em.ArrayController.create();
App.toAccountsController = Em.ArrayController.create();
App.unsignedTransfersController = Em.ArrayController.create();

// *********************************
// ********** Views ****************
// *********************************

App.UnsignedTransfersView = Em.View.extend({
    transfersBinding : 'App.unsignedTransfersController.content'
});

App.versionView = Em.View.create({
    templateName : 'version',
    versionBinding : 'App.VERSION'
});
App.transferView = Em.View.create({
    templateName : 'transfer',
    fromAccountsBinding : 'App.fromAccountsController.content',
    toAccountsBinding : 'App.toAccountsController.content'
});

App.applicationView = Em.ContainerView.create({
    classNames : [ 'the-container' ],
    childViews : [ App.versionView, 'currentView' ],
    currentView : App.transferView
});
App.applicationView.appendTo('body');

// *********************************
// ********** Router *********
// *********************************
App.router = Em.Router.create({
    root : Ember.State.extend({
        route : '/',
        setupControllers : function(router) {
            console.log('setupControllers');
            var applicationController = router.get('applicationController'), rootView;
            console.dir(applicationController);
            rootView = Ember.ContainerView.create({
                classNames : [ 'root' ],
                controller : applicationController,
                currentViewBinding : 'controller.view'
            });

            rootView.appendTo('body');
        }
    })
});
App.router.transitionTo('root');
console.log('App.router');
console.dir(App.router);
// *********************************
// ********** Initialization *******
// *********************************
(function() {
    $.getJSON('rest/payment', function(data) {
        App.fromAccountsController.set('content', data.fromAccounts);
        App.toAccountsController.set('content', data.toAccounts);
        App.unsignedTransfersController.set('content', data.unsignedTransfers);
    });
}());
console.log(2);