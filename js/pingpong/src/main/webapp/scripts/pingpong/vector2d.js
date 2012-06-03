define([], function() {

    return function(x, y) {
    	var vx = x, vy = y;

    	return {
    		scale : function(scale) {
				vx *= scale;
				vy *= scale;
			},
			add : function(vector2d) {
				vx += vector2d.getVx();
				vy += vector2d.getVy();
			},
			sub : function(vector2d) {
				vx -= vector2d.getVx();
				vy -= vector2d.getVy();
			},
			negate : function() {
				vx = -vx;
				vy = -vy;
			},
			length : function() {
				return Math.sqrt(vx * vx + vy * vy);
			},
			lengthSquared : function() {
				return vx * vx + vy * vy
			},
			normalize : function() {
				var length = this.length();
				if (length) {
					vx /= length;
					vy /= length;
				}
			},
			rotate : function(angle) {
				var oldVx = vx, cosVal = Math.cos(angle), sinVal = Math.sin(angle);
				vx = oldVx * cosVal - vy * sinVal;
				vy = oldVx * sinVal - vy * cosVal;
			},
			toString : function() {
				return '(' + vx.toFixed(3) + ',' + vy.fixed(3) + ')';
			},
			getVx : function() {
				return vx;
			},
			getVy : function() {
				return vy;
			}
    	};
    };
});
