define([], function () {
    var Persistence = null, get, put;
    Persistence = function () {
        if (!(this instanceof Persistence)) {
            return new Persistence();
        }
    };
    get = function (key) {
        if (typeof (Storage) !== "undefined") {
            return localStorage[key];
        }
        return null;
    };
    put = function (key, value) {
        if (typeof (Storage) !== "undefined") {
            localStorage[key] = value;
        }
    };
    Persistence.prototype.getIntArray = function (key) {
        var i, storageValue, tmp, value = null;
        storageValue = get(key);
        if (storageValue) {
            tmp = storageValue.split(',');
            value = [];
            for (i = 0; i < tmp.length; i++) {
                value.push(parseInt(tmp[i]));
            }
        }
        return value;
    };
    Persistence.prototype.getInt = function (key) {
        var value = get(key);
        if (value) {
            return parseInt(value);
        }
        return null;
    };
    Persistence.prototype.getString = function (key) {
        return get(key) || null;
    };
    Persistence.prototype.putIntArray = function (key, value) {
        put(key, '' + value);
    };
    Persistence.prototype.putInt = function (key, value) {
        put(key, '' + value);
    };
    Persistence.prototype.putString = function (key, value) {
        put(key, value);
    };
    return Persistence;
});