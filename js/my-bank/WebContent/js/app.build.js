({
    appDir: "../",
    baseUrl: "js",
    dir: "../../r-build",
    paths: {
        //jquery: "empty:"
    },
    locale: "sv",
    optimize: "uglify",
    optimizeCss: "standard",
    inlineText: true,
    //Allows namespacing requirejs, require and define calls to a new name.
    //This allows stronger assurances of getting a module space that will
    //not interfere with others using a define/require AMD-based module
    //system. The example below will rename define() calls to foo.define().
    //See http://requirejs.org/docs/faq-advanced.html#rename for a more
    //complete example.
    //namespace: 'foo',
    modules: [
        {
            name: "main",
            include: ["Highcharts", "HighchartsTheme"]
            //exclude: ["jquery"]
        }
    ],
    mainConfigFile: './main.js'
})