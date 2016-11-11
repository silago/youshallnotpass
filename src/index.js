'use strickt';
var game = new Phaser.Game(1352, 768, Phaser.AUTO, '', { preload: preload, create: create, update: update, render:render });

function preload() {
    game.load.script('VisualTimer.js','src/lib/VisualTimer.js');
    game.load.script('Spells.js','src/lib/Spells.js');
    game.load.script('Wizard.js','src/lib/Wizard.js');
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

var ls = window.content.localStorage;
//ls.setItem("myvariable", "myvalue");
//var item = ls.getItem("myvariable");

//saveSettings ()


var  saveSettings = function(item,key,value) {
  ls.setItem('save:'+'.'+item+'.'+key,value);
  window[item].prototype[key]=value;
}

var loadSettings = function() {
  var skeys = Object.keys(ls);
  for (var i=0;i<skeys.length;i++) {
    var k = skeys[i];
    var v = ls.getItem(k);
    if (k.indexOf('save:')==0) {
      var key_parts = k.split('.');
      window[key_parts[1]].prototype[key_parts[2]]=v;
    }
  }
}





StartEnemyEmitter = function(game,interval,enemies,player) {
    //setInterval(function() {
    game.time.events.loop(
        Phaser.Timer.SECOND*interval,
        (() => {
            var x = game.width-500;
            var y = 380+parseInt((Math.random()*50));
            var e = new Enemy(game,x,y,'orcs',player)
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
    //loadSettings();
    var bg = game.add.sprite(0, 0, 'background');
        bg.inputEnabled = true;
        bg.events.onInputUp.add((()=>{if (!ch.circle.visible) wizard.defaulSpell.cast();}),this);

    var enemies = game.add.group();
    var player = game.add.group();
    console.log(Wizard);
    var wizard = new Wizard(game,0, 450, 'wizard');
    player.add(wizard);
    StartEnemyEmitter(game,7,enemies,player);

    var rain_spell = new Rain(game,wizard,{enemies:enemies});
    var bolt_spell = new Bolt(game,wizard,{enemies:enemies});
    ch = new CasterCircle(game,[rain_spell,bolt_spell ]);

    var bolt_icon = game.add.sprite(game.width-128,64, 'bolt_icon');
    bolt_icon.inputEnabled = true;
    var rain_icon = game.add.sprite(game.width-128,128+32,'rain_icon');
    rain_icon.inputEnabled = true;

    bolt_icon.events.onInputUp.add((()=>{if (!ch.circle.visible) bolt_spell.cast();      }),this);
    rain_icon.events.onInputUp.add((()=>{if (!ch.circle.visible) rain_spell.cast();       }),this);

    game.physics.enable(wizard, Phaser.Physics.ARCADE);
    wizard.can_cast = true;
    graphics = game.add.graphics(100, 100);
    game.input.holdRate = 500;
    game.input.onHold.add(function() {
        ch.show();
        game.add.tween(ch.circle).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true, 0);
    } ,this);


 this.bmd = game.add.bitmapData(800,600);
 sprite = game.add.sprite(0, 0, this.bmd);
 this.bmd.ctx.strokeStyle = "red";

}


function update() {


    var _check = ((points) => {
        var left    = -1,
            right    =  1,
            up     = -1,
            down    =  1;
        var min_diff = 10;
        var draw_spell_1 = [
            [],
            [right,left],
            [right,up]
        ];

        var points_counter  = 1;// points.length;
        var r=true;
        while (points_counter<points.length) {
            var xdir = 0;
            if (points[points_counter-1][0]<points[points_counter][0]) {
                xdir = right;
            } else {
                xdir = down;
            }
            if (points[points_counter-1][1]<points[points_counter][1]) {
                ydir = right;
            } else {
                ydir = down;
            }

            if (draw_spell_1[points_counter][0]==xdir && draw_spell_1[points_counter][1]==ydir) {
                return false;
            }
            points_counter++;
        }
        return true;
    });

    if (game.input.mousePointer.isDown) {
        //game.input
        if (       
        )
        var l = this.s_points[this.s_points.lentgh];
        this.bmd.ctx.lineTo(game.input.x, game.input.y);
        this.bmd.ctx.lineWidth = 2;
        this.bmd.ctx.stroke();
        this.bmd.dirty = true;
    } else {
        this.s_points = [];
        this.bmd.ctx.beginPath();
        this.bmd.clear();
    }
    //if (typeof lines[0] !='undefined' && lines[0]!=null) { // was on hold
    //    lines[0].end = {
    //        x:game.input.x,
    //        y:game.input.y
    //    }
    //}
}

function render() {
    //for (i in lines) {
    //    if (typeof lines[i]!=null)
    //        game.debug.geom(lines[i],'#f442ce',false);
    //}
}
