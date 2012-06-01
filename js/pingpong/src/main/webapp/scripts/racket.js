define([], function() {

    // ctx, x, y, w, h, color
    return function(params) {
        return {
            ctx : params.ctx,
            x : params.x,
            y : params.y,
            w : params.w,
            h : params.h,
            color : params.color,
            draw : function() {
                this.ctx.fillStyle = this.color;
                this.ctx.fillRect(this.x, this.y, this.w, this.h);
            },
            move : function(x, y) {
                this.ctx.clearRect(this.x, this.y, this.w, this.h);
                this.x = x;
                this.y = y;
                this.draw();
            }
        };
    };
});
