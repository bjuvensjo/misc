// Core patterns and mechanisms are:
//   - namespace
//   - functions

// Create only one global to and declare other variables as properties of that global
var MYAPP = {};
MYAPP.name = 'MYAPP';
MYAPP.getDescription = function() {
    return 'MYAPP is my app.';
};

// Create only one global to and declare other variables as properties of that
// global
var YOURAPP = {};
YOURAPP.name = 'YOURAPP';
YOURAPP.getDescription = function() {
    return this.name + ' is your app.';
};

console.log('MYAPP.name: ' + MYAPP.name);
console.log('MYAPP.getDescription(): ' + MYAPP.getDescription());
console.log('YOURAPP.name: ' + YOURAPP.name);
console.log('YOURAPP.getDescription(): ' + YOURAPP.getDescription());

// The namespace pattern can be used to create modules
MYAPP.module1 = {
    name : 'module1'
};
MYAPP.module1.getName = function() {
    return this.name;
};
console.log('MYAPP.module1.name: ' + MYAPP.module1.name);
console.log('MYAPP.module1.getName(): ' + MYAPP.module1.getName());

// Use an immediate function to initialize a global variable using only
// functional scoped variables
var sumOf1To5 = (function(start, end) {
    var sum = 0, i = start;
    for (; i <= end; i++) {
        sum += i;
    }
    return sum;
}(1, 5));
console.log('sumOf1To5: ' + sumOf1To5);
