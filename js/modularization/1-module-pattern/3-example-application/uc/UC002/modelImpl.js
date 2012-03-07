var UC002 = (function(uc) {
    uc.modelImpl = (function() {
        var accounts = [];
        return {
            addAccount : function(id, balance) {
                accounts.push({
                    id : id,
                    balance : balance
                });
            },
            getAccounts : function() {
                return accounts;
            }           
        };
     }());
    
    return uc;
}(UC002 || {}));
