require([ "jquery", "court", "racket", "ball", "vector2d"], function($, court, racket, ball, vector2d) {
    var canvas = $('#game')[0], ctx = canvas.getContext('2d'), width = canvas.width, height = canvas.height,
    theCourt = court({
        ctx : ctx,
        x : 0,
        y : 0,
        w : width,
        h : height,
        lineWidth : 5,
        color : 'white'
    }),
    theRacket = racket({
        ctx : ctx,
        x : width / 2 - 20,
        y : height - 10,
        w : 40,
        h : 10,
        vector2d : vector2d(30, 0),
        color : 'white'
    }), 
    theBall,
    lastRacketKeyCode = 39,
    currentScore = 0,
    highScore = 0,
    currentScoreElement = $('#currentScore'),
    highScoreElement = $('#highScore'),
    draw,
    serve;    
    
    draw = function() {
        ctx.clearRect(0, 0, width, height);
    	theCourt.draw();
    	theRacket.draw();
    	if (theBall) {
    		theBall.draw();
    	}
	}
    draw();

    $(document).keydown(function(e) {
    	var keyCode = e.keyCode;
    	if (keyCode === 37 || keyCode === 39) {
    		// left and right arrow
        	if (lastRacketKeyCode !== keyCode) {
        		theRacket.getVector2d().negate();
        	}    
        	lastRacketKeyCode = keyCode;
            theRacket.move();
        	draw();
            return false;
    	} else if (keyCode === 83) {
    		// s
    		serve();
    	}
    });
    
    serve = function() {
    	var intervalId;
        theBall = ball({
            ctx : ctx,
            x : width / 2,
            y : 20,
            r : 10,
            vector2d : vector2d(3 - Math.floor((Math.random() * 7)), 10),
            color : 'white'
        });
        currentScore = 0;
        currentScoreElement.html(currentScore);
        intervalId = setInterval(function() {
        	var theVector2d;        
        	if (theBall.getY() + theBall.getR() >= theRacket.getY() && (theBall.getX() + theBall.getR() < theRacket.getX() || theBall.getX() - theBall.getR() > theRacket.getX() + theRacket.getW())) {
        		// racket missed ball
        		clearInterval(intervalId);
        		if (currentScore >= highScore) {
        			highScore = currentScore;
        			highScoreElement.html(highScore);
        		}
        		theBall = null;
        	} else {
        		if (theBall.getY() + theBall.getR() >= theRacket.getY()) {
        			// racket hits ball
                	theVector2d = theBall.getVector2d();
                	theVector2d.add(vector2d(0, - 2 * theVector2d.getVy()));
                	if (theBall.getX() < theRacket.getX() + theRacket.getW() / 3) {
                		//theVector2d.rotate(- Math.PI * 6);
                		theVector2d.add(vector2d(-1, 0));
                	} else if (theBall.getX() > theRacket.getX() + theRacket.getW() * 2 / 3) {
                		//theVector2d.rotate(Math.PI * 6);
                		theVector2d.add(vector2d(1, 0));
                	}
                	currentScore++;
                	if (currentScore % 5 === 0) {
                		//increase ball speed
                		theVector2d.add(vector2d(0, -1));
                	}
                	currentScoreElement.html(currentScore);
        		} else if (theBall.getY() - theBall.getR() <= 0) {
            		// ball hits top wall
                	theVector2d = theBall.getVector2d();
                	theVector2d.add(vector2d(0, - 2 * theVector2d.getVy()));
                } else if (theBall.getX() - theBall.getR() <= 0 || theBall.getX() + theBall.getR() >= width) {
                	// ball hits left or right wall 
                	theVector2d = theBall.getVector2d();
                	theVector2d.add(vector2d(-2 * theVector2d.getVx(), 0));
                }        
                theBall.move();
        	}
        	draw();
        }, 30);
    }
});