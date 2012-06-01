define([], function() {

    // ctx, x, y, r, color
    return function(params) {
        var ctx = params.ctx, x = params.x, y = params.y, r = params.r, color = params.color;
        return {
            draw : function() {
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.fill();
            },
            move : function(newX, newY) {
                ctx.clearRect(x - r, y - r, 2 * r, 2 * r);
                x = newX;
                y = newY;
                this.draw();
            },
            getX : function() {
                return x;
            },
            getY : function() {
                return y;
            },
            getR : function() {
                return r;
            }
        };
    };
});
