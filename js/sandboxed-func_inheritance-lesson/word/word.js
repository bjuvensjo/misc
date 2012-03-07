Sandbox('reuse', 'lesson',
        function(box) {
            var lesson = box.lesson, question = box.question, questionare = box.questionare, englishLesson, q;

            englishLesson = lesson(questionare([ question('katt', 'cat'), question('hund', 'dog'),
                    question('hus', 'house') ]));

            while (q = englishLesson.randomPop()) {
                console.dir(q.getQuestion() + ' = ' + q.getAnswer());
            };
        });
