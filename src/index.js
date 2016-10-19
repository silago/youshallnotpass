var game = new Phaser.Game(1352, 768, Phaser.AUTO, '', { preload: preload, create: create, update: update, render:render });

function preload() {
    game.load.script('VisualTimer.js','src/lib/VisualTimer.js');
    game.load.script('Spells.js','src/lib/Spells.js');
    game.load.script('CasterCircle.js','src/lib/CasterCircle.js');
    game.load.script('GameObject.js','src/lib/GameObject.js');
    game.load.script('Enemy.js','src/lib/Enemy.js');
    game.load.image('background', 'assets/background2.png');
    game.load.image('wizard',     'assets/wizard.png');
    game.load.image('spell',      'assets/spell.png');
    game.load.spritesheet('timer', 'assets/timer.png', 150, 20);
    game.load.image('circle',      'assets/circle.png');
    game.load.image('goblin',     'assets/goblin.png');
    game.load.image('eye',     'assets/eye.png');
    game.load.image('rain',     'assets/rain.png');
    game.load.image('bolt',     'assets/bolt.png');
    game.load.spritesheet('orcs', 'assets/orc_spritesheet.png', 100, 100, 4);
}




Wizard = function(game,x,y,resource) {
    Object.setPrototypeOf(this, Object.create(GameObject.prototype));
    GameObject.call(this, game,x,y,resource);
    var prototype = Object.getPrototypeOf(this);
    this.health =  100;
    this.gui = {};
    this.getHit = function(damage) {
        this.health-=damage;
        this.gui.health.setText(this.health);
    }
    this.gui.health = game.add.text(130, 60, this.health, {
            font: "65px Arial",
            fill: "#ff0044",
            align: "center"
        });
    this.gui.mana = game.add.text(130, 160, 100, {
            font: "65px Arial",
            fill: "#4400ff",
            align: "center"
        });
    game.add.existing(this);
    this.immovable = true;
    this.body.moves = false;
}


EnemyEmitter = function(game,interval) {
    setInterval(function() {
        var x = game.width-500;
        var y = 380+parseInt((Math.random()*50));
        var e = new Enemy(game,x,y,'orcs')
        //e.add()
        //e.walk();
        enemies.add(e);
        //game.physics.enable(e, Phaser.Physics.ARCADE);
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
    player = game.add.group();
    ch = new CasterCircle(game,[new Rain(game,{enemies:enemies}), new Bolt(game,{enemies:enemies})]);
    wizard = new Wizard(game,0, 450, 'wizard');
    player.add(wizard);

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

    //if (game.physics.arcade.collide(wizard, enemies,function(wizard,enemy) {
    //  if (typeof wizard.getHit == 'function') {
    //      wizard.getHit();
    //  }
    //},function(){
    //  return true;
    //},this));
}

function render() {
    for (i in lines) {
        if (typeof lines[i]!=null)
            game.debug.geom(lines[i],'#f442ce',false);
    }
}
