(function(uC001, uC002) {
    uC001.openAccount('UC001_1', 1);
    uC002.openAccount('UC002_1', 1);

    console.log('\n***** uC001.getAccounts() *********************************************************');
    console.dir(uC001.getModel().getAccounts());
    console.log('\n***** uC002.getAccounts() *********************************************************');
    console.dir(uC002.getModel().getAccounts());
}(UC001, UC002));
