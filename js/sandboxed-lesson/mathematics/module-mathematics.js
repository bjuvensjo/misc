Sandbox.modules.mathematics = function(box) {	
	box.BinaryOperationQuestionare = function(binaryOperation) {
        if (!(this instanceof box.BinaryOperationQuestionare)) {
            return new box.BinaryOperationQuestionare(binaryOperation);
        }
		var iLength = binaryOperation.op1Range.length, jLength = binaryOperation.op2Range.length, i = 0, j = 0;
		box.extend(box.Questionare(), this);
		while (i < iLength) {
			j = 0;
			while (j < jLength) {
				this.add(box.question(binaryOperation.op1Range[i] + ' '
						+ binaryOperation.symbol + ' '
						+ binaryOperation.op2Range[j], binaryOperation.operation(
						binaryOperation.op1Range[i], binaryOperation.op2Range[j])));
				j++;
			}
			i++;
		}
	};
	box.extend(box.Questionare.prototype, box.BinaryOperationQuestionare.prototype);

	box.BinaryOperation = function(op1Range, op2Range, operation, symbol) {
        if (!(this instanceof box.BinaryOperation)) {
            return new box.BinaryOperation(op1Range, op2Range, operation, symbol);
        }
	    this.op1Range = op1Range;
		this.op2Range = op2Range;
		this.operation = operation;
		this.symbol = symbol;
	};

	box.range = function(begin, end) {
		var theRange = [], i = begin;
		while (i <= end) {
			theRange.push(i);
			i++;
		};
		return theRange;
	};
};

