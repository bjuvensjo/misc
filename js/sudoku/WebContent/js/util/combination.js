define([], function () {
    var Combination = null;
    Combination = function () {
        if (!(this instanceof Combination)) {
            return new Combination();
        }
    };
    Combination.prototype.getCombinations = function (values, n) {
        var result, value, combination, combinations, i, j;
        result = [];
        if (n === 1) {
            for (i = 0; i < values.length; i++) {
                value = values[i];
                combination = [];
                combination.push(value);
                result.push(combination);
            }
        } else {
            for (i = 0; i < values.length; i++) {
                combinations = this.getCombinations(values.slice(i + 1, values.length), n - 1);
                for (j = 0; j < combinations.length; j++) {
                    combination = combinations[j];
                    combination.push(values[i]);
                    result.push(combination);
                }
            }
        }
        return result;
    };
    return new Combination();
});