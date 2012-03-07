// Scopes are:
//   - global
//   - functional

// Declare stuff in global scope
var name = 'fido1';
var dog = {
    name : 'fido2'
};
console.log('name: ' + name); // fido1
console.dir(dog); // fido2

// Update stuff in global scope
name = 'karo1';
dog.name = 'karo2';
console.log('name: ' + name); // karo1
console.dir(dog); // karo2

// Declare stuff in functional scope
var add = function(x, y) {
    var sum = x + y;
    return sum;
};
console.log('add(2, 3): ' + add(2, 3)); // 5
// Try to update add.sum
add.sum = '6';
console.log('add(2, 3): ' + add(2, 3)); // 5
// What happened with add.sum = '6'?

// Beware of hoisting!
// All variable declarations (with var) get hoisted to the top of the function
// Recommendation: Use single var pattern, i.e. declare all function variables
// at the top of the function with a single var
var f = function() {
    // name declared here
    console.log('name in f: ' + name); // undefined
    var name = 'fido'; // name assigned here
    console.log('name in f: ' + name); // defined
};
f();
