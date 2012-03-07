Sandbox.modules.lesson = function(box) {

    box.lesson = function(questionare) {
        return {
            pop : function() {
                return questionare.remove(0);
            },
            randomPop : function() {
                var index = Math.floor(Math.random() * questionare.size());
                return questionare.remove(index);
            }
        };
    };

    box.questionare = function(questionare) {
        var theQuestionare = questionare || [];
        return {
            add: box.bind(theQuestionare, [].push),
//            add : function(question) {
//                theQuestionare.push(question);
//            },
            remove : function(index) {
                return theQuestionare.splice(index, 1)[0];
            },
            size : function() {
                return theQuestionare.length;
            }
        };
        return that;
    };

    box.question = function(question, answer) {
        return {
            getQuestion : function() {
                return question;
            },
            getAnswer : function() {
                return answer;
            }
        };
    };
};
