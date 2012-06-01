require([ "jquery", "racket", "ball"], function($, racket, ball) {
    var canvas = $('#mycanvas')[0], ctx = canvas.getContext('2d'), width = canvas.width, height = canvas.height, 
    theRacket = racket({
        ctx : ctx,
        x : width / 2 - 20,
        y : height - 10,
        w : 40,
        h : 10,
        color : 'white'
    }), 
    theBall = ball({
        ctx : ctx,
        x : width / 2,
        y : height / 2,
        r : 10,
        color : 'white'
    });
    
    theRacket.draw();
    theBall.draw();

    $(document).keydown(function(e) {
        var delta = 5;
        if (e.keyCode === 37) {
            theRacket.move(theRacket.x - delta, theRacket.y);
            return false;
        } else if (e.keyCode === 39) {
            theRacket.move(theRacket.x + delta, theRacket.y);
            return false;
        }
    });

    var y = theBall.getY();
    var down = true;
    var delta = 10;
    setInterval(function() {
        if (y + theBall.getR() >= theRacket.y) {
            down = false;
        }
        if (y - theBall.getR() <= 0) {
            down = true;
        }
        if (down) {
            y = y + delta;
        } else {
            y = y - delta;
        }
        theBall.move(theBall.getX(), y);
    }, 20);


});