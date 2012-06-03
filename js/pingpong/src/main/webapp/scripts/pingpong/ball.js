define([], function() {

    // ctx, x, y, r, vector2d, color
    return function(params) {
        var ctx = params.ctx, x = params.x, y = params.y, r = params.r, vector2d = params.vector2d, color = params.color;
        return {
            draw : function() {
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.fill();
            },
            move : function() {
                x += vector2d.getVx();
                y += vector2d.getVy();
            },
            getX : function() {
                return x;
            },
            getY : function() {
                return y;
            },
            getR : function() {
                return r;
            },
            getVector2d : function() {
                return vector2d;
            }
        };
    };
});
