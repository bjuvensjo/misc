// A module without dependencies
define(function () {
    //Do setup work here
    console.log("modules/uc/model/accounts");
    var accounts = [];
    return {
        open: function(id, balance, owner) {
            var account = {
                id: id,
                balance: balance,
                owner: owner
            };
            accounts.push(account);
            return account;
        },
        getAll: function() {
            return accounts;
        }
    };
});