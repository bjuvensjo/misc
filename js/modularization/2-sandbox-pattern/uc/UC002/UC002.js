Sandbox.modules.UC002 = function(box) {
    // modelImpl is not visible outside this function
    var modelImpl = function() {
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
    };

    box.UC002 = function() {
        // theModelImpl is not visible outside this function
        var theModelImpl = modelImpl();
        return {
            openAccount : function(id, balance) {
                // Validate...
                // Use server side service to openAccount...
                // Add opened account to model
                theModelImpl.addAccount(id, balance);
            },
            getModel : function() {
                return {
                    getAccounts : theModelImpl.getAccounts
                };
            }
        };
    };
};
