'use strict';
var game = new Phaser.Game(1352, 768, Phaser.AUTO, '', { preload: preload, create: create, update: update, render:render });

var getGame = function() {
    return game;
}

function preload() {
    game.load.script('VisualTimer.js','src/lib/VisualTimer.js');
    game.load.script('Spells.js','src/lib/Spells.js');
    game.load.script('Wizard.js','src/lib/Wizard.js');
    game.load.script('CasterCircle.js','src/lib/CasterCircle.js');
    game.load.script('GameObject.js','src/lib/GameObject.js');
    game.load.script('Enemy.js','src/lib/Enemy.js');
    game.load.script('EnemyEmitter.js','src/lib/EnemyEmitter.js');
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



var lines = [];
var enemies = null;
var STATE_IDLE = 0;
var STATE_DRAW = 1;
var state = STATE_IDLE;
function create() {
    var bg = game.add.sprite(0, 0, 'background');
      bg.inputEnabled = true;

    var enemies = game.add.group();
    this.enemies = enemies;
    var player = game.add.group();
    console.log(Wizard);
    var wizard = new Wizard(game,0, 450, 'wizard');

    wizard.defaulSpell = new Dot(game,wizard,{enemies:enemies});
    this.wizard = wizard;
    player.add(wizard);
    (new EnemyEmitter())
        .init(enemies,player,GAME_CONFIG.waves)
        .start();

    var rain_spell = new Rain(game,wizard,{enemies:enemies});
    var bolt_spell = new Bolt(game,wizard,{enemies:enemies});
    var ch = new CasterCircle(game,[rain_spell,bolt_spell ]);

    var bolt_icon = game.add.sprite(game.width-128,64, 'bolt_icon');
    bolt_icon.inputEnabled = true;
    var rain_icon = game.add.sprite(game.width-128,128+32,'rain_icon');
    rain_icon.inputEnabled = true;

    bolt_icon.events.onInputUp.add((()=>{if (!ch.circle.visible) bolt_spell.cast();      }),this);
    rain_icon.events.onInputUp.add((()=>{if (!ch.circle.visible) rain_spell.cast();       }),this);

    game.physics.enable(wizard, Phaser.Physics.ARCADE);
    wizard.can_cast = true;
    var graphics = game.add.graphics(100, 100);
    game.input.holdRate = 500;
    game.input.onHold.add(function() {
        ch.show();
        game.add.tween(ch.circle).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true, 0);
    } ,this);

 this.bmd = game.add.bitmapData(800,600);
 var sprite = game.add.sprite(0, 0, this.bmd);
 this.bmd.ctx.strokeStyle = "red";
 this._path = [];
 bg.events.onInputUp.add((()=>{if (!ch.circle.visible) wizard.defaulSpell.cast();}),this);  this.s_points = [];
}


function update() {


    var _check = ((points) => {
        var left    = -1,
            right    =  1,
            up     = -1,
            down    =  1;
        var min_diff = 10;
        var draw_spell_1 = [
            [
                [0,0],
                [1,1],
                [1,-1]
            ],
            [
                [0,0],
                [1,-1],
                [1,1]
            ]

    ];
        console.log(points);
        var points_counter  = 0;// points.length;
        for (points_counter in draw_spell_1) {
                if (draw_spell_1[points_counter].toString() == points.toString()) {
                    if (points_counter == 0) {
                        (new Bolt(game,this.wizard,{enemies:this.enemies})).cast();
                    }
                    if (points_counter == 1) {
                        (new Rain(game,this.wizard,{enemies:this.enemies})).cast();
                    }
                    return true;
                }
        }
        return false;
    });

    if (game.input.activePointer.isDown) {

        if (!this.s_points.length) {
            this.s_points.push([0,0]);
        }
        //game.input
        var checkSPoints = function(scope) {
                //console.log(scope._path);
                var _2= scope._path[2];
                var _1= scope._path[1];
                var _0= scope._path[0];
                //console.log(scope._path);
                var min_diff=0;
                var current_direction_x = 0;
                var current_direction_y = 0;
                if (_1[0]-_0[0]<min_diff)  {
                    current_direction_x = 1;
                } else if (_1[0]-_0[0]>min_diff ) {
                    current_direction_x = -1;
                }
                if (_1[1]-_0[1]<min_diff)  {
                    current_direction_y = 1;
                } else if (_1[1]-_0[1]>min_diff ) {
                    current_direction_y = -1;
                }
                var a  = true;
                if (scope.s_points.length>0) {
                    var _prev = scope.s_points[scope.s_points.length-1];
                    if (_prev[0]==current_direction_x && _prev[1]==current_direction_y) {
                        a = false;
                    }
                }
                if (a)
                scope.s_points.push([
                    current_direction_x,
                    current_direction_y
                ]);
                //console.log(scope.s_points);
        }

        if (true) {
            var x = game.input.x;
            var y = game.input.y;
            if (this._path[ 2 ]==undefined) {
                    this._path[2] = [x,y];
            } else if (this._path[1] == undefined) {
                    if(this._path[2][0]!=x || this._path[2][1]!=y) {
                        this._path[1] = [x,y];
                    }
            } else {
                //console.log(Math.abs(this._path[1][0]-x) , Math.abs(this._path[1][1]-y));
                if (!this._path[0])  {
                    this._path[0] = [x,y];
                } else if ((Math.abs(this._path[1][0]-x) + Math.abs(this._path[1][1]-y))>15) {
                    //console.log('check');
                    //console.log(this._path);

                    var tmp_0 = this._path[0];
                    this._path[0] = [x,y];
                    checkSPoints(this);
                    this._path[2] = this._path[1];
                    this._path[1] = tmp_0;//this._path[0];
                    console.log(this._path);
                }
                //this._path[0]  = undefined;
            }
        }

        //var l = this.s_points[this.s_points.lentgh];
        this.bmd.ctx.lineTo(game.input.x, game.input.y);
        this.bmd.ctx.lineWidth = 6;
        this.bmd.ctx.stroke();
        this.bmd.dirty = true;
        //console.log(this.bmd);
    } else {

        if (typeof this.s_points!='undefined' && this.s_points.length) {
            //console.log(this.s_points);
            console.log(
                _check(this.s_points)
            );
        }
        this._path = [];
        this._path[2] = null;
        this._path[1] = null;
        this._path[0]  = null;

        this.s_points = [];
        this.bmd.clear();
        this.bmd.ctx.beginPath();
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
