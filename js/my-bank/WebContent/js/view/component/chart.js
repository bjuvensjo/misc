define([ 'jQuery', 'Underscore', 'Backbone' ], function($, _, Backbone) {

    var View = Backbone.View.extend({
        render : function(eventName) {
            var container = this.options.container;
            var $container = $('#' + container);
            var categories = this.options.categories;
            var data = this.options.data;
            var title = this.options.title;
            // Below avoids unnecessary rendering, but does not work with resize...
            // Listen to something, i.e. window resize
            if ($container.css('display') !== 'none') {
                console.log('chart will be rendered');
                $container.css('margin-bottom', '16px');
                $container.height(100 + (data ? data.length * 35 : 0));
                require([ 'Highcharts', 'HighchartsTheme' ], function(HighCharts) {
                    $(function() {
                        new Highcharts.Chart({
                            chart : {
                                renderTo : container,
                                type : 'bar'
                            },
                            title : {
                                text : title
                            },
                            xAxis : {
                                categories : categories
                            },
                            yAxis : {
                                title : {
                                    text : ''
                                }
                            },
                            series : [ {
                                data : data,
                                color : '#E36B23'
                            } ]
                        });
                    });
                });
            }
            return this;
        }
    });

    return View;
});