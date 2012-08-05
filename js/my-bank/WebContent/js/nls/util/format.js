define(function() {
    // Currently supports only locale sv (default)
    var account = function(locale, theAccount) {
        var a = theAccount + '';
        return a.replace(/(\d{4})(\d{2})(\d{3})(.*)/g, "$1 $2 $3 $4");
    };    
    
    // decimal_sep: character used as decimal separator, it defaults to '.' when omitted thousands_sep: char used as
    // thousands separator, it defaults to ',' when omitted
    var currency = function(decimals, decimal_sep, thousands_sep, amount) {
        var n = amount, c = isNaN(decimals) ? 2 : Math.abs(decimals), d = decimal_sep || '.', t = (typeof thousands_sep === 'undefined') ? ','
                : thousands_sep, sign = (n < 0) ? '-' : '',

        // extracting the absolute value of the integer part of the number and converting to string
        i = parseInt(n = Math.abs(n).toFixed(c)) + '',

        j = ((j = i.length) > 3) ? j % 3 : 0;
        return sign + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t)
                + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
    };
    
    // Currently supports only locales sv (default) and en
    var date = function(locale, date) {
        var prepend = function(x) {
            return x > 9 ? x : '0' + x;
        };
        return locale === 'en' ? date.getFullYear() + '/' + prepend(date.getDate()) + '/' + prepend(date.getMonth() + 1) : date.getFullYear() + '-' + prepend(date.getMonth() + 1) + '-' + prepend(date.getDate());
    };

    return {
        account: account,
        currency : currency,
        date : date
    };
});