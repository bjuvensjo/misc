Sandbox('lesson',
        function(box) {
            var Lesson = box.Lesson, Question = box.Question, Questionare = box.Questionare;

            var englishLesson = Lesson(Questionare([ Question('katt', 'cat'), Question('hund', 'dog'),
                    Question('hus', 'house') ]));

            var q;
            while (q = englishLesson.randomPop()) {
                console.dir(q.getQuestion() + ' = ' + q.getAnswer());
            };
        });
