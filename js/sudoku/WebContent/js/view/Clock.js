define(['../util/Persistence'], function(Persistence) {
    var Clock = null;
    Clock = function() {
        if (!(this instanceof Clock)) {
            return new Clock();
        }
        this.lastUpdate = null;
        this.stopped = false;
        this.time = 0;
        this.persistence = new Persistence();
    };
    Clock.prototype.getTime = function() {
    	var hours, minutes, seconds, tmp;
    	tmp = Math.round(this.time / 1e3);
    	hours = Math.floor(tmp / 3600);
    	tmp = tmp - hours * 3600;
    	minutes = Math.floor(tmp / 60);
    	seconds = tmp % 60;
    	return {
    		hours : hours,
    		minutes: minutes,
    		seconds: seconds
    	};
	};
    Clock.prototype.load = function() {
    	var model, modelString;
    	modelString = this.persistence.getString('clock');
    	if (modelString) {
    		model = JSON.parse(modelString);
    		this.stopped = model.stopped;
    		this.time = model.time;
    	}
    };    
    Clock.prototype.save = function() {
        var modelString = JSON.stringify(this);
        this.persistence.putString('clock', modelString);
    };    	
    Clock.prototype.start = function(createNew) {    	
		this.lastUpdate = new Date();
    	if (createNew) {
            this.stopped = false;
            this.time = 0;
            this.save();            		
    	} else {
    		this.load();
    	}
	};
    Clock.prototype.stop = function() {
		this.stopped = true;
        this.save();            		
	};
	Clock.prototype.update = function() {		
		var now;
		if (!this.stopped) {
			now = new Date();
			this.time += now.getTime() - this.lastUpdate.getTime();
			this.lastUpdate = now;
            this.save();            		
		}
	};	
	return Clock;
});