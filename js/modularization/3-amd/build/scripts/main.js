define("modules/uc/model/accounts",[],function(){console.log("modules/uc/model/accounts");var a=[];return{open:function(b,c,d){var e={id:b,balance:c,owner:d};return a.push(e),e},getAll:function(){return a}}}),define("modules/uc/model/model",["./accounts"],function(a){return console.log("modules/uc/model/model"),{getAccounts:function(){return a.getAll()},openAccount:function(b,c,d){a.open(b,c,d)}}}),define("modules/uc/uc",["./model/model"],function(a){return console.log("modules/uc/uc"),{getAccounts:function(){return a.getAccounts()},openAccount:function(b,c,d){a.openAccount(b,c,d)}}}),require(["modules/uc/uc"],function(a){var b;console.log("main"),a.openAccount(1,12345678.9,"Farbror Joakim"),a.openAccount(2,2,"Knatte"),a.openAccount(3,3,"Fnatte"),a.openAccount(4,4,"Tjatte"),b=a.getAccounts(),console.dir(b)}),define("main",function(){})