// A module with dependencies
define(["./accounts"], function (accounts) {
    //Do setup work here
    console.log("modules/uc/model/model");
    return {
        getAccounts: function() {
            return accounts.getAll();
        },
        openAccount: function(id, balance, owner) {
            accounts.open(id, balance, owner);
        }
    };
});