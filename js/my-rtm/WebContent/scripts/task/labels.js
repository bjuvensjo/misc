define(function() {
    var labels = {}, contains, get, getAll, remove;

    contains = function(label) {
        return labels.hasOwnProperty(label);
    };

    get = function(label) {
        var index, theLabels;
        if (typeof label === 'string') {
            if (!contains(label)) {
                labels[label] = label;
            }
            return labels[label];            
        } else {
            // label is an array
            theLabels = [];
            for (index = 0; index < label.length; index++) {
                theLabels.push(get(label[index]));
            }
            return theLabels;
        }
    };

    getAll = function() {
        var name = '', theLabels = [];
        for (name in labels) {
            if (labels.hasOwnProperty(name)) {
                theLabels.push(labels[name]);
            };
        };
        return theLabels;
    };
    
    remove = function(label) {
        if (contains(label)) {
            delete labels[label];
            return true;
        }
        return false;
    };

    return {
        contains : contains,
        get : get,
        getAll: getAll,
        remove : remove
    };
});
