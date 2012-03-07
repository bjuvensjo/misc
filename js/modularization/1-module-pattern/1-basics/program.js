// ****************************************************************************
// ***** Anonymous Closures ***************************************************
// ****************************************************************************
// This is the fundamental construct that makes it all possible, and really is
// the single best feature of JavaScript. We'll simply create an anonymous
// function, and execute it immediately. All of the code that runs inside the
// function lives in a closure, which provides privacy and state throughout the
// lifetime of our application.
(function() {
    // All vars and functions declared in here are in this scope only,
    // but still maintains access to all globals
    console.log('\n***** Anonymous Closures ***************************************************');
}());
// Notice the () around the anonymous function. This is required by the
// language, since statements that begin with the token function are always
// considered to be function declarations. Including () creates a function
// expression instead.

// ****************************************************************************
// ***** Global Import ********************************************************
// ****************************************************************************
// JavaScript has a feature known as implied globals. Whenever a name is used,
// the interpreter walks the scope chain backwards looking for a var statement
// for that name. If none is found, that variable is assumed to be global. If
// it's used in an assignment, the global is created if it doesn't already
// exist. This means that using or creating global variables in an anonymous
// closure is easy. Unfortunately, this leads to hard-to-manage code, as it's
// not obvious (to humans) which variables are global in a given file.
// Luckily, our anonymous function provides an easy alternative. By passing
// globals as parameters to our anonymous function, we import them into our
// code, which is both clearer and faster than implied globals. Here's an
// example:
var MYAPP = {};
(function($, MYAPP) {
    // now have access to globals jQuery (as $) and MYAPP in this code
    console.log('\n***** Global Import ********************************************************');
    console.dir(jQuery);
}(jQuery, MYAPP));

// ****************************************************************************
// ***** Module Export ********************************************************
// ****************************************************************************
// Sometimes you don't just want to use globals, but you want to declare them.
// We can easily do this by exporting them, using the anonymous function's
// return value. Doing so will complete the basic module pattern, so here's a
// complete example:
var MODULE = (function() {
    var my = {}, privateVariable = 'privateVariable';

    function privateMethod() {
        return 'privateMethod';
    }

    my.moduleProperty = 'my.moduleProperty';
    my.moduleMethod = function() {
        return 'privateVariable: ' + privateVariable + ', ' + 'privateMethod(): ' + privateMethod() + ', ' + 'moduleProperty: ' + this.moduleProperty;
    };

    return my;
}());
// Notice that we've declared a global module named MODULE, with two public
// properties: a method named MODULE.moduleMethod and a variable named
// MODULE.moduleProperty. In addition, it maintains private internal state using
// the closure of the anonymous function. Also, we can easily import needed
// globals, using the pattern we learned above.

// Let's test the module
console.log('\n***** Module Export ********************************************************');
console.log(MODULE.moduleProperty);
console.log(MODULE.moduleMethod());
