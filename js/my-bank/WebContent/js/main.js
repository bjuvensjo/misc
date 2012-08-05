requirejs.config({
    config : {
        i18n : {
        // Set the config for the i18n module ID
        // Remove this to use navigator.language or navigator.userLanguage
        // locale: 'en'
        }
    },
    // paths become shortcut aliases
    paths : {
        jQuery : 'lib/jquery/jquery',
        Underscore : 'lib/underscore/underscore-min',
        Backbone : 'lib/backbone/backbone-min',
        BootstrapButton : 'lib/bootstrap/bootstrap-button',
        BootstrapCollapse : 'lib/bootstrap/bootstrap-collapse',
        BootstrapDropdown : 'lib/bootstrap/bootstrap-dropdown',
        BootstrapTransition : 'lib/bootstrap/bootstrap-transition',
        Highcharts : 'lib/highcharts/highcharts',
        HighchartsTheme : 'lib/highcharts/themes/my-superhero',
        i18n : 'lib/require/i18n',
        text : 'lib/require/text',
        template : '.'
    },
    shim : {
        'jQuery' : {
            exports : '$'
        },
        'Underscore' : {
            exports : '_'
        },
        'Backbone' : {
            deps : [ 'Underscore', 'jQuery' ],
            exports : 'Backbone'
        },
        'BootstrapButton' : {
            deps : [ 'jQuery' ],
            exports : '$'
        },
        'BootstrapCollapse' : {
            deps : [ 'jQuery' ],
            exports : '$'
        },
        'BootstrapDropdown' : {
            deps : [ 'jQuery' ],
            exports : '$'
        },
        'BootstrapTransition' : {
            deps : [ 'jQuery' ],
            exports : '$'
        },
        'Highcharts' : {
            deps : [ 'jQuery' ],
            exports : 'Highcharts'
        },
        'HighchartsTheme' : {
            deps : [ 'Highcharts' ]
        }
    }
});

require([ 'app' ], function(app) {
    // console.log(navigator.language);
    app.initialize();
});