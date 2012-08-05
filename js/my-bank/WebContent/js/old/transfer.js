// Models
// Notice that we don’t need to explicitly define the attributes (name, country, year, etc). You could add validation, default values, etc. More on that in Part 2.
window.Transfer = Backbone.Model.extend();

// “model” indicates the nature of the collection. “url” provides the endpoint
// for the RESTFul API. This is all that’s needed to retrieve, create, update,
// and delete transfers with Backbone’s simple Model API.
window.TransferCollection = Backbone.Collection.extend({
    model : Transfer,
    url : "api/transfers"
});

// Views
window.TransferListView = Backbone.View.extend({

    tagName : 'ul',

    initialize : function() {
        this.model.bind("reset", this.render, this);
    },

    render : function(eventName) {
        _.each(this.model.models, function(transfer) {
            $(this.el).append(new TransferListItemView({
                model : transfer
            }).render().el);
        }, this);
        return this;
    }

});

window.TransferListItemView = Backbone.View.extend({

    tagName : "li",

    template : _.template($('#tpl-transfer-list-item').html()),

    render : function(eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});

window.TransferView = Backbone.View.extend({

    template : _.template($('#tpl-transfer-details').html()),

    render : function(eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});

// Router
var AppRouter = Backbone.Router.extend({

    routes : {
        "" : "list",
        "transfers/:id" : "transferDetails"
    },

    list : function() {
        console.log('list');
        this.transferList = new TransferCollection();
        this.transferListView = new TransferListView({
            model : this.transferList
        });
        this.transferList.fetch();
        $('#sidebar').html(this.transferListView.render().el);
    },

    transferDetails : function(id) {
        console.log('transferDetails');
        this.transfer = this.transferList.get(id);
        this.transferView = new TransferView({
            model : this.transfer
        });
        $('#slask').html(this.transferView.render().el);
    }
});

var app = new AppRouter();
Backbone.history.start();
//app.navigate("transfers/", {trigger: true});