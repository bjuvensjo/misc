(function (window, require) {
    'use strict';

    var baseUrl = 'base';
    var file = null;
    var requireModule = null;
    var requireModules = [];

    for (file in window.__karma__.files) {
        if (window.__karma__.files.hasOwnProperty(file)) {
            if (/Test.js$/.test(file)) {
                requireModule = file.substring(baseUrl.length + 2, file.length - 3);
                requireModules.push(requireModule);
            }
        }
    }

    requirejs.config({
        baseUrl : baseUrl,
        paths : {
            jquery : 'lib/jquery/jquery'
        },
    });

    require(requireModules, function () {
        window.__karma__.start();
    });
}(window, require));