var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render:render });




function preload() {
    game.load.image('background', 'assets/background.png');
    game.load.image('wizard',     'assets/wizard.png');
    game.load.image('spell',      'assets/spell.png');
    game.load.image('circle',      'assets/circle.png');
    game.load.image('goblin',     'assets/goblin.png');
    game.load.image('eye',     'assets/eye.png');
    game.load.image('rain',     'assets/rain.png');
    game.load.spritesheet('orcs', 'assets/orc_spritesheet.png', 200, 200, 4);
}


CasterCircle = function(spells) {
    var sprite     = null;
    var activate   = false;
    var background = null;
    var point      = null;
    var point_coords = [
        [0,0],
        [],
        [],
        [],
        [],
        []
    ];
    var points_stack = [];
    function create() {

    };
    function show() {
    };
    function spellsCheck() {
        for (s in spells) {
            if (s.draw_order == points.stack) {
                s.cast();
                break;
            }
        }
    }

    function onPointTouch() {
        if (true) {}
    }

    function update() {
        if (active) {

        }
    };
}
    //       2  3
    //    6   1   4
    //        5

Spell1 = function() {
    name      = "Fire From The Sky";
    drawOrder = [1,2,3];
    cooldown  = 5; //sec
    animation = 'action';
    sprite    = 'firerain.png';
    activate  = function() {

    };
    update    = function() {

    }
}




function draw() {
    bmd.clear();
    bmd.ctx.beginPath();
    bmd.ctx.beginPath();
    bmd.ctx.moveTo(0, 0);
    bmd.ctx.lineTo(game.input.x, game.input.y);
    bmd.ctx.lineWidth = 4;
    bmd.ctx.stroke();
    bmd.ctx.closePath();
    bmd.render();
}

function move(pointer, x, y, isDown) {
    mouseBody.body.x = x;
    mouseBody.body.y = y;
}

function update() {
    draw();
}


GameObject = function( game,x,y,resource) {
    Object.setPrototypeOf(this, Object.create(Phaser.Sprite.prototype));
    Phaser.Sprite.call(this, game,x,y,resource);
    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.add = function() {
        game.add.existing(this);
        game.physics.enable(this, Phaser.Physics.ARCADE);
        return this;
    }
}

Enemy = function(game,x,y,resource) {
    Object.setPrototypeOf(this, Object.create(GameObject.prototype));
    GameObject.call(this, game,x,y,resource);

    var prototype = Object.getPrototypeOf(this);

    this.strike = function() {

    }

    this.walk = function() {
        this.body.velocity.x=50;
        this.animations.add('walk');
        this.animations.play('walk',2,true);
        return this;
    }

    this.start  =function() {
        this.walk();

    }

    this.update = function() {
        //console.log('...');
    }

    game.add.existing(this);
}

EnemyEmitter = function(game,interval) {
    setInterval(function() {
        var x = game.world.randomX;
        var y = game.world.randomY;
        (new Enemy(game,x,y,'orcs')).add().walk();
    },interval);
}


function startDraw() {
    console.log('draw line');
}



var weapon;
var lines = [];
var STATE_IDLE = 0;
var STATE_DRAW = 1;
var state = STATE_IDLE;
function create() {

    ch = {
        circle:null,
		points:[
			{
				instance:null,
				x:-22,
				y:-100-22
			},
			{
				instance:null,
				x:50+22-10,
				y:-22-50
			},
			{
				instance:null,
				x:50+22-10,
				y:-22+25
			},
			{
				instance:null,
				x:-22,
				y:+50
			},
			{
				instance:null,
				x:-100+22-10,
				y:-22-50
			},
			{
				instance:null,
				x:-100+22-10,
				y:-22+25
			},
		],
    active_points:[],
    spells:[
      [0,1,2]
    ],
    cast_spell:function() {
        var rain = game.add.sprite(game.input.x, game.input.y, 'rain');

        setInterval(function() {
          rain.destroy();
        },2000);
    },
    check_spell: function() {
      console.log('check spell');
      for (i in this.spells) {
        if (this.spells[i].every(function(val,key){
          console.log(this.active_points);
          console.log(val);
          return this.active_points.indexOf(val)!=-1;
        },this)) {
          console.log('spell done');
          this.cast_spell();
          break;
        }
      }
    },
    init: function() {
        ch.circle = game.add.sprite(0, 0, 'circle');
        this.circle.visible = false;
        for ( i in ch.points) {
            ch.points[i].instance = game.add.sprite(
                ch.points[i].x,
                ch.points[i].y,
                'eye'
            );
            ch.points[i].instance.inputEnabled = true;
            ch.points[i].instance.events.onInputOver.add(function(i){
                return function() {
                  var l = new Phaser.Line(game.input.x, game.input.y, 0, 0);
                  l.width = 20;
                  l.color  = 0x990000;
                  lines.unshift(l);
                  i = Number(i);
                  if (this.active_points.indexOf(i)==-1) {
                      this.active_points.push(i);
                  } else {
                    this.check_spell();
                    this.active_points = [];
                    this.hide();
                    lines = [];
                  }
                  console.log(this.active_points);
                }
            }(i),this)
        }
        for (i in this.points) {
            this.points[i].instance.visible = false;
        }
    },

		hide: function() {
					this.circle.visible = false;
					this.points[i].instance.alpha = 0;
					for (i in this.points) {
						this.points[i].instance.visible = false;
						this.points[i].instance.alpha = 0;
					}
		},
		show: function() {
            var x = game.input.x;
            var y = game.input.y;
            var offset = 100;
            var eoffset = 22;
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
    }
	//ch.show();

    game.add.sprite(0, 0, 'background');
    ch.init();

    bmd = game.make.bitmapData();

    EnemyEmitter(game,1000*7);

    enemies = game.add.group();
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;


    weapon = game.add.weapon(1,'spell');
    weapon.bulletSpeed = 2000;
    weapon.fireRate = 20;
    wizard = game.add.sprite(0, 400, 'wizard');
    wizard.can_cast = true;
    graphics = game.add.graphics(100, 100);
    //game.physics.enable(wizard, Phaser.Physics.ARCADE);
    game.input.holdRate = 1000;
    //game.input.onTap.add(function() {
    //    console.log('tap');
    //    ch.circle.visible = false;
    //    ch.circle.alpha = 0;
    //} ,this);
    game.input.onTap.add(function() {
    },this)

    game.input.onHold.add(function() {
        //lines.unshift(new Phaser.Line(game.input.x, game.input.y, 0, 0));
        ch.show();;
        game.add.tween(ch.circle).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true, 0);
    } ,this);

}

function collisionHandler() {
    orc.kill();
    bullet.kill();
}

function update() {
    if (typeof lines[0] !='undefined' && lines[0]!=null) { // was on hold
        lines[0].end = {
            x:game.input.x,
            y:game.input.y
        }
    }

    if (game.input.mousePointer.isDown && wizard.can_cast) {
        wizard.can_cast = false;
        bullet = bullets.create(0,0,'spell');
        bullet.rotation = game.physics.arcade.angleToPointer(bullet);
        game.physics.enable(bullet, Phaser.Physics.ARCADE);
        game.physics.arcade.velocityFromAngle(bullet.angle, 300, bullet.body.velocity);
    } else {
    }
}

function render() {
    for (i in lines) {
        if (typeof lines[i]!=null)
            game.debug.geom(lines[i],'#f442ce',false);
    }
}
