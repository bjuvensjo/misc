var UC001 = (function() {
    var uc, modelImpl;
    
    modelImpl = (function() {
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
    
    uc = {
        openAccount : function(id, balance) {
            // Validate...
            // Use server side service to openAccount...
            // Add opened account to model
            modelImpl.addAccount(id, balance);
        },
        getModel : function() {
            return {
                getAccounts : modelImpl.getAccounts
            };
        }
    };

    return uc;
}());
