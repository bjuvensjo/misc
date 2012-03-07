Sandbox(
        'reuse',
        'lesson',
        function(box) {
            var lesson = box.lesson, question = box.question, questionare = box.questionare, englishLesson, startButton, questionLabel, questionInput, handleQuestionInput, q = undefined;

            startButton = document.getElementById('start_button');
            questionLabel = document.getElementById('question_label');
            questionInput = document.getElementById('question_input');
            questionInput.disabled = true;

            handleQuestionInput = function(event) {
                if (event.keyCode === 13) { // 13 is enter
                    if (questionInput.value === q.getAnswer()) {
                        console.log('Correct!');
                        q = englishLesson.randomPop();
                        if (q) {
                            questionLabel.innerHTML = q.getQuestion();
                        } else {
                            console.log('Done!');
                            //questionInput.removeEventListener('keydown', handleQuestionInput, false);
                            questionInput.disabled = true;
                            questionLabel.innerHTML = '';
                        }
                        questionInput.value = '';
                    } else {
                        console.log('Incorrect!');
                    }
                }
            };

            startButton.addEventListener('click', function() {
                englishLesson = lesson(questionare([ question('katt', 'cat'), question('hund', 'dog'),
                        question('hus', 'house') ]));
                q = englishLesson.randomPop();
                questionLabel.innerHTML = q.getQuestion();
                questionInput.addEventListener('keydown', handleQuestionInput, false);
                questionInput.disabled = false;
                questionInput.focus();
            }, false);
        });
