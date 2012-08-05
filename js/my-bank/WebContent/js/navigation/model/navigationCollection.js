define([ 'jQuery', 'Underscore', 'Backbone', 'navigation/model/navigation', 'i18n!nls/bundle' ], function($, _, Backbone,
        navigation, bundle) {
    var NavigationCollection = Backbone.Collection.extend({
        model : navigation,
        initialize : function() {
            this.add({
                aref : '#',
                text : bundle.home,
                iconClass : 'icon-home icon-white'
            });
            this.add({
                aref : '#/overview',
                text : bundle.overview,
                iconClass : 'icon-plane icon-white'
            });            
            this.add({
                aref : '#/account',
                text : bundle.account,
                iconClass : 'icon-book icon-white'
            });
            this.add({
                aref : '#/loan',
                text : bundle.loan,
                iconClass : 'icon-barcode icon-white'
            });
            this.add({
                aref : '#/transfer',
                text : bundle.transfer,
                iconClass : 'icon-briefcase icon-white'
            });
        }
    });

    return new NavigationCollection();
});