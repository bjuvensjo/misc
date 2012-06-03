define([], function() {

    // ctx, x, y, w, h, vector2d, color
    return function(params) {
        var ctx = params.ctx, x = params.x, y = params.y, w = params.w, h = params.h, vector2d = params.vector2d, color = params.color;
        return {
            draw : function() {
                ctx.fillStyle = color;
                ctx.fillRect(x, y, w, h);
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
            getW : function() {
                return w;
            },
            getH : function() {
                return h;
            },
            getVector2d : function() {
                return vector2d;
            }
        };
    };
});
