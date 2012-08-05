define([ 'Underscore', 'nls/util/format' ], function(_, format) {
    return {
        root : {
            account: _.bind(format.account, this, 'sv'),
            currency : _.bind(format.currency, this, 2, ',', ' '),
            date : _.bind(format.date, this, 'sv')
        },
        'en' : true
    };
});
