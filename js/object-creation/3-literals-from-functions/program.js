// ***** Literal from function *****
console.log('***** Literal from function *****');
var user = function(username, password) {  
    return {
        username : username,
        password : password,
        getUsername : function() {
            return this.username;
        }
    };
};

var aUser = user('nisse', '1234');
console.dir(aUser);


//***** A variant example... *****
console.log('***** A variant example... *****');
var person = (function() {
    var that = {
        getUsername : function() {
            return this.username;
        }
    };
    return function(username, password) {
        return {
            username : username,
            password : password,
            getUsername : function() {
                return that.getUsername.apply(this);
            }
        };
    };
}());

var aPerson = person('stina', '4321');
console.dir(aPerson);
