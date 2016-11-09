CasterCircle = function(game, spells) {
    this.circle = game.add.sprite(0, 0, 'circle');
    this.circle.visible = false;

		this.points=[
			{ instance:null, x:-22, y:-100-22     },
			{	instance:null, x:50+22-10, y:-22-50 },
			{ instance:null, x:50+22-10, y:-22+25 },
			{	instance:null, x:-22, y:+50 },
			{ instance:null, x:-100+22-10, y:-22-50 },
			{	instance:null, x:-100+22-10, y:-22+25	},
		];

    this.active_points=[];
    this.spells=spells;
    this.checkSpell = function() {
      for (i in this.spells) {
        if (this.spells[i].points.length==this.active_points.length && this.spells[i].points.every(function(val,key){
          return this.active_points.indexOf(val)!=-1;
        },this)) {
          this.spells[i].cast();
          break;
        }
      }
    };
    init = function() {
    };

		this.hide= function() {
					this.circle.visible = false;
					this.points[i].instance.alpha = 0;
					for (i in this.points) {
						this.points[i].instance.visible = false;
						this.points[i].instance.alpha = 0;
					}
		};
		this.show= function() {
            return;
      var x = game.input.x,
          y = game.input.y,
          offset = 100.
          eoffset = 22;
			this.circle.visible = true;
			this.circle.position.x = x-offset;
			this.circle.position.y = y-offset;
			this.circle.alpha = 1;
			for (i in this.points) {
				this.points[i].instance.visible = true;
				this.points[i].instance.position.x = x+this.points[i].x;
				this.points[i].instance.position.y = y+this.points[i].y;
				this.points[i].instance.alpha = 1;
				this.points[i].instance.alpha = 1;
			}
		}

    for ( i in this.points) {
        this.points[i].instance = game.add.sprite( this.points[i].x, this.points[i].y, 'eye' );
        this.points[i].instance.inputEnabled = true;
        this.points[i].instance.events.onInputOver.add(function(i){
            return function() {
              var l = new Phaser.Line(game.input.x, game.input.y, 0, 0);
              l.width = 20;
              l.color  = 0x990000;
              lines.unshift(l);
              i = Number(i);
              if (this.active_points.indexOf(i)==-1) {
                  this.active_points.push(i);
              } else {
                this.checkSpell();
                this.active_points = [];
                this.hide();
              }
            }
        }(i),this)
    }
    for (i in this.points) {
        this.points[i].instance.visible = false;
    }
  }
