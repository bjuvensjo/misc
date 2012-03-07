// While the above is enough for many uses, we can take this pattern farther and
// create some very powerful, extensible constructs. Lets work through them
// one-by-one, continuing with our module named MODULE.

// ****************************************************************************
// ***** Augmentation *********************************************************
// ****************************************************************************
// One limitation of the module pattern so far is that the entire module must be
// in one file. Anyone who has worked in a large code-base understands the value
// of splitting among multiple files. Luckily, we have a nice solution to
// augment modules. First, we import the module, then we add properties, then we
// export it. Here's an example, augmenting our MODULE from above:
var MODULE = (function(my) {
    my.anotherMethod = function() {
        return 'my.anotherMethod: [' + my.moduleProperty + ']';
    };

    return my;
}(MODULE));
// We use the var keyword again for consistency, even though it's not necessary.
// After this code has run, our module will have gained a new public method
// named MODULE.anotherMethod. This augmentation file will also maintain its own
// private internal state and imports.

// Let's test the augmented module
console.log('\n***** Augmentation *********************************************************');
console.log(MODULE.moduleProperty);
console.log(MODULE.moduleMethod());
console.log(MODULE.anotherMethod());

// ****************************************************************************
// ***** Loose Augmentation ***************************************************
// ****************************************************************************
// While our example above requires our initial module creation to be first, and
// the augmentation to happen second, that isn't always necessary. One of the
// best things a JavaScript application can do for performance is to load
// scripts asynchronously. We can create flexible multi-part modules that can
// load themselves in any order with loose augmentation. Each file should have
// the following structure:
var MODULE = (function(my) {
    // add capabilities...
    my.yetAnotherMethod = function() {
        return 'my.yetAnotherMethod';
    };

    return my;
}(MODULE || {}));
// In this pattern, the var statement is always necessary. Note that the import
// will create the module if it does not already exist. This means you can use a
// tool like LABjs and load all of your module files in parallel, without
// needing to block.

// Let's test the loosely augmented module
console.log('\n***** Loose Augmentation ***************************************************');
console.log(MODULE.moduleProperty);
console.log(MODULE.moduleMethod());
console.log(MODULE.anotherMethod());
console.log(MODULE.yetAnotherMethod());

// ****************************************************************************
// ***** Tight Augmentation ***************************************************
// ****************************************************************************
// While loose augmentation is great, it does place some limitations on your
// module. Most importantly, you cannot override module properties safely. You
// also cannot use module properties from other files during initialization (but
// you can at run-time after intialization). Tight augmentation implies a set
// loading order, but allows overrides. Here is a simple example (augmenting our
// original MODULE):
var MODULE = (function(my) {
    var old_moduleMethod = my.moduleMethod;

    my.moduleMethod = function() {
        // method override, has access to old through old_moduleMethod...
        return 'overridden my.moduleMethod: [' + old_moduleMethod + ']';
    };

    return my;
}(MODULE));
// Here we've overridden MODULE.moduleMethod, but maintain a reference to the
// original method, if needed.

// Let's test the tightly augmented module
console.log('\n***** Tight Augmentation ***************************************************');
console.log(MODULE.moduleMethod());

// ****************************************************************************
// ***** Cross-File Private State *********************************************
// ****************************************************************************
// One severe limitation of splitting a module across multiple files is that
// each file maintains its own private state, and does not get access to the
// private state of the other files. This can be fixed. Here is an example of a
// loosely augmented module that will maintain private state across all
// augmentations:
var MODULE = (function(my) {
    var _private = my._private = my._private || {}, _seal = my._seal = my._seal || function() {
        delete my._private;
        delete my._seal;
        delete my._unseal;
    }, _unseal = my._unseal = my._unseal || function() {
        my._private = _private;
        my._seal = _seal;
        my._unseal = _unseal;
    };

    // permanent access to _private, _seal, and _unseal

    return my;
}(MODULE || {}));
// Any file can set properties on their local variable _private, and it will be
// immediately available to the others. Once this module has loaded completely,
// the application should call MODULE._seal(), which will prevent external
// access to the internal _private. If this module were to be augmented again,
// further in the application's lifetime, one of the internal methods, in any
// file, can call _unseal() before loading the new file, and call _seal() again
// after it has been executed.

// ****************************************************************************
// ***** Sub-modules **********************************************************
// ****************************************************************************
// Our final advanced pattern is actually the simplest. There are many good
// cases for creating sub-modules. It is just like creating regular modules:
MODULE.sub = (function() {
    var my = {};
    // ...

    return my;
}());
// While this may have been obvious, I thought it worth including. Sub-modules
// have all the advanced capabilities of normal modules, including augmentation
// and private state.

// ****************************************************************************
// ***** Conclusions **********************************************************
// ****************************************************************************
// Most of the advanced patterns can be combined with each other to create more
// useful patterns. If I had to advocate a route to take in designing a complex
// application, I'd combine loose augmentation, private state, and sub-modules.
// I haven't touched on performance here at all, but I'd like to put in one
// quick note: The module pattern is good for performance. It minifies really
// well, which makes downloading the code faster. Using loose augmentation
// allows easy non-blocking parallel downloads, which also speeds up download
// speeds. Initialization time is probably a bit slower than other methods, but
// worth the trade-off. Run-time performance should suffer no penalties so long
// as globals are imported correctly, and will probably gain speed in
// sub-modules by shortening the reference chain with local variables.
// To close, here's an example of a sub-module that loads itself dynamically to
// its parent (creating it if it does not exist). I've left out private state
// for brevity, but including it would be simple. This code pattern allows an
// entire complex heirarchical code-base to be loaded completely in parallel
// with itself, sub-modules and all.
var UTIL = (function(parent, $) {
    var my = parent.ajax = parent.ajax || {};

    my.get = function(url, params, callback) {
        // ok, so I'm cheating a bit :)
        return $.getJSON(url, params, callback);
    };

    // etc...

    return parent;
}(UTIL || {}, jQuery));
