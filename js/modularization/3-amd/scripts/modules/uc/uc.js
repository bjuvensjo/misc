// A module with dependencies
define(["./model/model"], function (model) {
    //Do setup work here
    console.log("modules/uc/uc");
    return {
        getAccounts: function() {
            return model.getAccounts();
        },
        openAccount: function(id, balance, owner) {
            model.openAccount(id, balance, owner);
        }        
    };
});