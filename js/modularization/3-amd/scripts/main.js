require(["modules/uc/uc"], function(uc) {
    //This function is called when scripts/modules/uc/uc.js is loaded.
    //If uc.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the uc argument will hold
    //the module value for "scripts/modules/uc/uc".
    var accounts;
    console.log("main");
    uc.openAccount(1, 12345678.9, 'Farbror Joakim');
    uc.openAccount(2, 2, 'Knatte');
    uc.openAccount(3, 3, 'Fnatte');
    uc.openAccount(4, 4, 'Tjatte');
    accounts = uc.getAccounts();
    console.dir(accounts);
});