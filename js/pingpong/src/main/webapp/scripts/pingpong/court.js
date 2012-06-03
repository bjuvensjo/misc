define([], function() {

    // ctx, x, y, w, h, lineWidth, color
    return function(params) {
    	var ctx = params.ctx, x = params.x, y = params.y, w = params.w, h = params.h, lineWidth = params.lineWidth, color = params.color;
        return {
            draw : function() {
                ctx.strokeStyle = color;
                ctx.lineWidth = lineWidth;
                ctx.strokeRect(x, y, w, h);
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
            }
        };
    };
});
