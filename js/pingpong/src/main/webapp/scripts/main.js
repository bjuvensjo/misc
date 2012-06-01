require([ "jquery", "racket", "ball", "vector2d"], function($, racket, ball, vector2d) {
    var canvas = $('#mycanvas')[0], ctx = canvas.getContext('2d'), width = canvas.width, height = canvas.height,
    theRacket = racket({
        ctx : ctx,
        x : width / 2 - 20,
        y : height - 10,
        w : 40,
        h : 10,
        vector2d : vector2d(10, 0),
        color : 'white'
    }), 
    theBall = ball({
        ctx : ctx,
        x : width / 2,
        y : 20,
        r : 10,
        vector2d : vector2d(1, 10),
        color : 'white'
    });
    
    theRacket.draw();
    theBall.draw();

    var lastKeyCode = 39;
    $(document).keydown(function(e) {
    	var keyCode = e.keyCode;
    	if (keyCode === 37 || keyCode === 39) {
        	if (lastKeyCode !== keyCode) {
        		theRacket.getVector2d().negate();
        	}    
        	lastKeyCode = keyCode;
            theRacket.move();
            return false;
    	}
    });

    setInterval(function() {
    	var theVector2d;
        if (theBall.getY() + theBall.getR() >= theRacket.getY() || theBall.getY() - theBall.getR() <= 0) {
        	theVector2d = theBall.getVector2d();
        	theVector2d.add(vector2d(0, - 2 * theVector2d.getVy()));
        }
        theBall.move();
    }, 30);


});