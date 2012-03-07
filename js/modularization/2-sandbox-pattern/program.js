Sandbox('UC002', //'<nameOfAnotherModule>',
        function(box) {
            var uC002 = box.UC002();
            uC002.openAccount('UC002_1', 1);

            console.log('\n***** uC002.getAccounts() *********************************************************');
            console.dir(uC002.getModel().getAccounts());
        });
