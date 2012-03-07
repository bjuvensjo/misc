var UC002 = (function(uc) {
    uc.openAccount = function(id, balance) {
        // Validate...
        // Use server side service to openAccount...
        // Add opened account to model
        uc.modelImpl.addAccount(id, balance);
    };
    uc.getModel = function() {
        return {
            getAccounts : uc.modelImpl.getAccounts
        };
    };
    return uc;
}(UC002 || {}));
