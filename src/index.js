var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render:render });

function preload() {
    game.load.script('Spells.js','src/lib/Spells.js');
    game.load.script('CasterCircle.js','src/lib/CasterCircle.js');
    game.load.image('background', 'assets/background.png');
    game.load.image('wizard',     'assets/wizard.png');
    game.load.image('spell',      'assets/spell.png');
    game.load.image('circle',      'assets/circle.png');
    game.load.image('goblin',     'assets/goblin.png');
    game.load.image('eye',     'assets/eye.png');
    game.load.image('rain',     'assets/rain.png');
    game.load.image('bolt',     'assets/bolt.png');
    game.load.spritesheet('orcs', 'assets/orc_spritesheet.png', 200, 200, 4);
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
        this.body.velocity.x=-150;
        this.animations.add('walk');
        this.animations.play('walk',2,true);
        return this;
    }
    this.start  =function() {
        this.walk();

    }
    this.update = function() {
    }
    game.add.existing(this);
}

EnemyEmitter = function(game,interval) {
    setInterval(function() {
        var x = game.width+100;
        var y = game.height-350+parseInt((Math.random()*50));
        var e = new Enemy(game,x,y,'orcs')
        e.add()
        e.walk();
        enemies.add(e);
        game.physics.enable(e, Phaser.Physics.ARCADE);
        console.log('new enemy spawned');
    },interval);
}


var lines = [];
var enemies = null;
var STATE_IDLE = 0;
var STATE_DRAW = 1;
var state = STATE_IDLE;
function create() {
    game.add.sprite(0, 0, 'background');
    EnemyEmitter(game,1000*7);
    enemies = game.add.group();
    ch = new CasterCircle(game,[new Rain(game,{enemies:enemies}), new Bolt(game)]);
    wizard = game.add.sprite(0, 400, 'wizard');
    game.physics.enable(wizard, Phaser.Physics.ARCADE);
    wizard.can_cast = true;
    graphics = game.add.graphics(100, 100);
    game.input.holdRate = 1000;
    game.input.onHold.add(function() {
        ch.show();
        game.add.tween(ch.circle).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true, 0);
    } ,this);

}

function update() {
    if (typeof lines[0] !='undefined' && lines[0]!=null) { // was on hold
        lines[0].end = {
            x:game.input.x,
            y:game.input.y
        }
    }

    if (game.physics.arcade.collide(wizard, enemies,function(wizard,enemy) {
      enemy.body.velocity.x = 0
      wizard.body.velocity.x = 0
    },function(){
      return true;
    },this));
}

function render() {
    for (i in lines) {
        if (typeof lines[i]!=null)
            game.debug.geom(lines[i],'#f442ce',false);
    }
}
