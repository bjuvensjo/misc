// ***** Constructor function *****
console.log('***** Constructor function *****');
var User = function(username, password) {
    if (!(this instanceof User)) {
        return new User(username, password);
    }
    this.username = username;
    this.password = password;
    // Implicitly returns this
};
// Reusable members such as functions, should go to the prototype
User.prototype.getUsername = function() {
    return this.username;
};
var user = new User('nisse', '1234'); // Note the new. Could be skipped due to
                                        // the if statement in the constructor
                                        // function above.
console.dir(user);