define([ 'Underscore', 'nls/util/format' ], function(_, format) {
    return {
        account : _.bind(format.account, this, 'en'),
        currency : _.bind(format.currency, this, 2, '.', ','),
        date : _.bind(format.date, this, 'en')
    };
});
