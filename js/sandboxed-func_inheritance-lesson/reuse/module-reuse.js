Sandbox.modules.reuse = function(box) {

    // Inheritance by borrowing and binding method
    box.bind = function(o, m) {
        return function() {
            return m.apply(o, [].slice.call(arguments));
        };
    };
};
