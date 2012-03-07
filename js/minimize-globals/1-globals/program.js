// Globals are:
//   - Variables outside functions
//   - Variables without a var (even inside functions)
//   - Named functions
// Can be updated/deleted at any time...

var name = 'fido';
age = 10;
var fruit = 'banana';
(function() {
    // name and age will be overridden, but fruit will not
    name = 'karo';
    age = 12;
    var fruit = 'apple';
}());
console.log('name: ' + name); // karo
console.log('age: ' + age); // 12
console.log('fruit: ' + fruit); // banana

// Define a named function f
function f() {
    return 'f defined';
};
// Redefine the function f
var f = function() {
    return 'f redefined';
};
console.log(f()); // f redefined
// Redefine f to not be a function
f = 'f redefined once again';
console.log(f); // f redefined once again