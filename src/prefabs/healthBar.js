"use strict";
function HealthBar(opts) {
    this.type = 'down';
    if (opts.type) {
        this.type = opts.type;
    }
    this.totalTime = opts.seconds;
    this.currentTime = opts.seconds;
    this.game = opts.game;
    this.onComplete = opts.onComplete;
    var key = 'timer';
    if (opts.key) {
        key = opts.key;
    }
    //this.game.add.sprite(opts.x, opts.y, key, 1);
    this.sprite = this.game.add.sprite(opts.x, opts.y, key, 0);
    this.fullWidth = this.sprite.width;
    this.reset();
    this.setPos = function(x,y) {
        this.sprite.position.x = x;
        this.sprite.x = x;
    }
}

	HealthBar.prototype = {
		reset: function() {
			var self = this;
			this.hasFinished = false;
			this.rect = new Phaser.Rectangle(0, 0, 0, this.sprite.height);
			if (this.type == 'down') {
				this.sprite.crop(null);
			} else {
				this.sprite.crop(this.rect);
			}
		},

		setTime: function(seconds) {
			this.totalTime = seconds;
            this.currentTime = seconds;
			this.reset();
		},

		start: function() {
			this.reset();
			//this.timer.start();
		},

		stop: function() {
			//this.timer.stop();
		},

		pause: function() {
			//this.timer.pause();
		},

		resume: function() {
			//this.timer.resume();
		},

		remainingTime: function() {
			return this.totalTime - this.currentTime;
		},

    	timerTick: function(time) {
    		/*jshint validthis:true */
				console.log(':::');
				console.log(this.currentTime,'::',time,'::',this.totalTime);
            this.currentTime-=time;
    		//var myTime = (this.type == 'down') ? this.remainingTime() : this.currentTime;//this.timer.seconds;
    		this.rect.width = Math.max(0, (this.currentTime / this.totalTime) * this.fullWidth);
    		this.sprite.crop(this.rect);
    	}
	};

export default HealthBar; 
