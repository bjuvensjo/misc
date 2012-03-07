Sandbox(
        'reuse',
        'lesson',
        'mathematics',
        function(box) {
            var lesson = box.lesson, binaryOperationQuestionare = box.binaryOperationQuestionare, binaryOperation = box.binaryOperation, range = box.range, add, mul, addLesson, mulLesson, q;

            add = function(x, y) {
                return x + y;
            };
            mul = function(x, y) {
                return x * y;
            };

            addLesson = lesson(binaryOperationQuestionare(binaryOperation(range(20, 20), range(1, 2), add, '+')));
            mulLesson = lesson(binaryOperationQuestionare(binaryOperation(range(2, 3), range(2, 2), mul, '*')));

            while (q = addLesson.pop()) {
                console.dir(q.getQuestion() + ' = ' + q.getAnswer());
            }
            ;
            while (q = mulLesson.randomPop()) {
                console.dir(q.getQuestion() + ' = ' + q.getAnswer());
            }
            ;
        });
