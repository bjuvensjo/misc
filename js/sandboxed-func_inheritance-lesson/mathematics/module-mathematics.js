Sandbox.modules.mathematics = function(box) {
    box.binaryOperationQuestionare = function(binaryOperation) {
        var that = box.questionare(), iLength = binaryOperation.op1Range.length, jLength = binaryOperation.op2Range.length, i = 0, j = 0;
        while (i < iLength) {
            j = 0;
            while (j < jLength) {
                that.add(box.question(binaryOperation.op1Range[i] + ' ' + binaryOperation.symbol + ' '
                        + binaryOperation.op2Range[j], binaryOperation.operation(binaryOperation.op1Range[i],
                        binaryOperation.op2Range[j])));
                j++;
            }
            i++;
        }
        return that;
    };

    box.binaryOperation = function(op1Range, op2Range, operation, symbol) {
        return {
            op1Range : op1Range,
            op2Range : op2Range,
            operation : operation,
            symbol : symbol
        };
    };

    box.range = function(begin, end) {
        var theRange = [], i = begin;
        while (i <= end) {
            theRange.push(i);
            i++;
        }
        ;
        return theRange;
    };
};
