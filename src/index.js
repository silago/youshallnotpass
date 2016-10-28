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
    game.load.image('bolt_icon',     'assets/icons/bolt_icon.png');
    game.load.image('rain_icon',     'assets/icons/rain_icon.png');
    game.load.spritesheet('orcs', 'assets/orc_spritesheet.png', 100, 100, 4);
}



const GAME_STATE_IDLE   = 0
const GAME_STATE_CIRCLE = 1

Wizard = function(game,x,y,resource) {

    Object.setPrototypeOf(this, Object.create(GameObject.prototype));
    GameObject.call(this, game,x,y,resource);
    var prototype = Object.getPrototypeOf(this);
    this.health =  100;
    this.mana =  100;
    this.mana_regain = 2; //per second
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
    this.gui.mana = game.add.text(130, 160, parseInt(this.mana), {
            font: "65px Arial",
            fill: "#4400ff",
            align: "center"
        });
    this.defaulSpell = new Dot(game,this,{enemies:enemies});
    this.takeMana = function(v) {
      if (this.mana<v) return false;
      this.mana-=v;
      this.gui.mana.setText(parseInt(this.mana));
      return true;
    }
    this.update = function() {
      var t = 0.001*game.time.elapsed;
      if (this.mana<100) {
          this.mana = this.mana + this.mana_regain*t;
          this.gui.mana.setText(parseInt(this.mana));
      } else if (this.mana>100) {
          this.mana = 100;
          this.gui.mana.setText(parseInt(this.mana));
      }
    }

    game.add.existing(this);
    this.immovable = true;
    this.body.moves = false;
}


StartEnemyEmitter = function(game,interval) {

    //setInterval(function() {
    game.time.events.loop(
        Phaser.Timer.SECOND*interval,
        (() => {
            var x = game.width-500;
            var y = 380+parseInt((Math.random()*50));
            var e = new Enemy(game,x,y,'orcs')
            //e.add()
            //e.walk();
            enemies.add(e);
            //game.physics.enable(e, Phaser.Physics.ARCADE);
            console.log('new enemy spawned');
        }),
        this
    );
    //},interval);
}


var lines = [];
var enemies = null;
var STATE_IDLE = 0;
var STATE_DRAW = 1;
var state = STATE_IDLE;
function create() {

    var bg = game.add.sprite(0, 0, 'background');
    bg.inputEnabled = true;
    StartEnemyEmitter(game,7);
    enemies = game.add.group();
    player = game.add.group();
    wizard = new Wizard(game,0, 450, 'wizard');

    var rain_spell = new Rain(game,wizard,{enemies:enemies});
    var bolt_spell = new Bolt(game,wizard,{enemies:enemies});
    ch = new CasterCircle(game,[rain_spell,bolt_spell ]);
    player.add(wizard);

    var bolt_icon = game.add.sprite(game.width-128,64, 'bolt_icon');
    bolt_icon.inputEnabled = true;
    var rain_icon = game.add.sprite(game.width-128,128+32,'rain_icon');
    rain_icon.inputEnabled = true;

    bolt_icon.events.onInputUp.add((()=>{if (!ch.circle.visible) bolt_spell.cast();      }),this);
    rain_icon.events.onInputUp.add((()=>{if (!ch.circle.visible) rain_spell.cast();       }),this);
           bg.events.onInputUp.add((()=>{if (!ch.circle.visible) wizard.defaulSpell.cast();}),this);

    game.physics.enable(wizard, Phaser.Physics.ARCADE);
    wizard.can_cast = true;
    graphics = game.add.graphics(100, 100);
    game.input.holdRate = 500;
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
}

function render() {
    for (i in lines) {
        if (typeof lines[i]!=null)
            game.debug.geom(lines[i],'#f442ce',false);
    }
}
