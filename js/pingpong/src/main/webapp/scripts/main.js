require([ "jquery", "court", "racket", "ball", "vector2d"], function($, court, racket, ball, vector2d) {
    var canvas = $('#mycanvas')[0], ctx = canvas.getContext('2d'), width = canvas.width, height = canvas.height,
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
    theBall = ball({
        ctx : ctx,
        x : width / 2,
        y : 20,
        r : 10,
        vector2d : vector2d(3 - Math.floor((Math.random() * 7)), 10),
        color : 'white'
    });
    
    var draw = function() {
        ctx.clearRect(0, 0, width, height);
    	theCourt.draw();
    	theRacket.draw();
    	theBall.draw();
	}

    var lastKeyCode = 39;
    $(document).keydown(function(e) {
    	var keyCode = e.keyCode;
    	if (keyCode === 37 || keyCode === 39) {
        	if (lastKeyCode !== keyCode) {
        		theRacket.getVector2d().negate();
        	}    
        	lastKeyCode = keyCode;
            theRacket.move();
        	draw();
            return false;
    	}
    });

    setInterval(function() {
    	var theVector2d;
    	if (theBall.getY() + theBall.getR() >= theRacket.getY() && (theBall.getX() < theRacket.getX() || theBall.getX() > theRacket.getX() + theRacket.getW())) {
    		console.log("looser");
    	}
    	
        if (theBall.getY() + theBall.getR() >= theRacket.getY() || theBall.getY() - theBall.getR() <= 0) {
        	theVector2d = theBall.getVector2d();
        	theVector2d.add(vector2d(0, - 2 * theVector2d.getVy()));
        }
        if (theBall.getX() + theBall.getR() >= width || theBall.getX() - theBall.getR() <= 0) {
        	theVector2d = theBall.getVector2d();
        	theVector2d.add(vector2d(-2 * theVector2d.getVx(), 0));
        }        
        theBall.move();
        draw();
    }, 30);


});