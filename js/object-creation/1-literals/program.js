// ***** Object literal *****
console.log('***** Object literal *****');
var user = {
    username : 'nisse',
    password : '1234',
    getUsername: function() {
        return this.username;
    }
};
console.dir(user);

// ***** Retrieval *****
console.log('***** Retrieval *****');
console.log(user.username); // Preferred
console.log(user['username']); // Sometimes practical...
console.log(user.getUsername());

// ***** Update *****
console.log('***** Update *****');
user.password = '4321';
console.log(user.password); // Preferred

// ***** Prototype *****
// Every object inherits properties from its prototype.
// The default prototype is Object.prototype.
// When you make a new object you can select its prototype - messy and complex (see below).
// The prototype is itself an object, so the inheritance is achieved by linking.
// The linking of prototypes is called the prototype chain.
console.log('***** Prototype *****');
var anotherUser = (function(user) {
    var F = function() {};
    F.prototype = user;
    return new F();
}(user));
anotherUser.username = 'stina'; // This has no effect on the prototype
anotherUser.age = 33; // Add and assign property age
console.dir(anotherUser);

//***** Reflection *****
console.log('***** Reflection *****');
var name ;
for (name in anotherUser) {
    if (anotherUser.hasOwnProperty(name) && typeof anotherUser[name] !== 'function') {
        console.log(name + ': ' + anotherUser[name]); // password and getUsername() excluded
    }
};

//***** Delete *****
console.log('***** Delete *****');
delete anotherUser.age;
delete anotherUser.getUserName; // Nothing will happen, since getUsername is on prototype
console.dir(anotherUser);

//***** Function literal *****
//Functions are objects
console.log('***** Function literal *****');
var add = function(x, y) {
    return x + y;
};
console.log(add(1, 2));

//***** Array literal *****
// Arrays are objects
console.log('***** Array literal *****');
var letters = ['a', 'b', 'c'];
console.log(letters);


