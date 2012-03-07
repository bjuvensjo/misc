Sandbox(
        'reuse',
        'lesson',
        'mathematics',
        function(box) {
            var Lesson = box.Lesson, BinaryOperationQuestionare = box.BinaryOperationQuestionare, BinaryOperation = box.BinaryOperation, range = box.range;

            var add = function(x, y) {
                return x + y;
            };
            var mul = function(x, y) {
                return x * y;
            };

            var addLesson = Lesson(BinaryOperationQuestionare(BinaryOperation(range(20, 20), range(1, 2), add, '+')));
            var mulLesson = Lesson(BinaryOperationQuestionare(BinaryOperation(range(2, 3), range(2, 2), mul, '*')));

            var q;
            while (q = addLesson.pop()) {
                console.dir(q.getQuestion() + ' = ' + q.getAnswer());
            };
            while (q = mulLesson.randomPop()) {
                console.dir(q.getQuestion() + ' = ' + q.getAnswer());
            };
        });
