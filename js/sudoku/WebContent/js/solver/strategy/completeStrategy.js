define([], function () {
    var CompleteStrategy = null;
    CompleteStrategy = function () {
        if (!(this instanceof CompleteStrategy)) {
            return new CompleteStrategy();
        }
    };
    CompleteStrategy.prototype.apply = function (cells, notes) {
        var i, value, updated;
        updated = [];
        for (i = 0; i < notes.getSize(); i++) {
            value = notes.getValue(i);
            if (value) {
                if (value.getSize() === 1) {
                    cells[i] = value.asArray()[0];
                    notes.update(i, cells[i]);
                    updated.push(i);
                }
            }
        }
        return updated;
    };
    return new CompleteStrategy();
});
