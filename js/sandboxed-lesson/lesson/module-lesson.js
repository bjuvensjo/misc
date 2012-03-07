Sandbox.modules.lesson = function(box) {

    /**
     * Creates a {box.Lesson}.
     * 
     * @namespace Sandbox
     * @param {box.Questionare} questionare
     * @return {box.Lesson}
     */
    box.Lesson = function(questionare) {
        if (!(this instanceof box.Lesson)) {
            return new box.Lesson(questionare);
        }
	    this.questionare = questionare;
	};
	
    /**
     * Returns a {box.Question} in order.
     * 
     * @namespace Sandbox
     * @method pop
     * @return {box.Question}
     */
	box.Lesson.prototype.pop = function() {
        return this.questionare.remove(0);
	};

    /**
     * Returns a {box.Question} in random order.
     * 
     * @namespace Sandbox
     * @method randomPop
     * @return {box.Question}
     */	
	box.Lesson.prototype.randomPop = function() {
        var index = Math.floor(Math.random() * this.questionare.size());
        return this.questionare.remove(index);
    };
	
	box.Questionare = function(questionare) {
        if (!(this instanceof box.Questionare)) {
            return new box.Questionare(questionare);
        }
        this.questionare = questionare || [];
	};
	
	box.Questionare.prototype.add = function(question) {
        this.questionare.push(question);
    };
    
    box.Questionare.prototype.remove = function(index) {
        return this.questionare.splice(index, 1)[0];
    };
	
    box.Questionare.prototype.size = function() {
        return this.questionare.length;
    };

    box.question = function(question, answer) {
        return {
            getQuestion: function() {
                return question;
            },
            getAnswer: function() {
                return answer;
            }
        };
	};
};
