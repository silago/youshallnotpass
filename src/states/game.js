//import Crosshairs from '../prefabs/crosshairs';
//import Target from '../prefabs/target';
import Wizard from '../prefabs/wizard';
import Dot  from  '../prefabs/spells/dot';
import Bolt  from '../prefabs/spells/bolt';
import Rain  from '../prefabs/spells/rain';
import Laser  from '../prefabs/spells/laser';
import Golem  from '../prefabs/spells/golem';
import EnemyEmitter  from '../prefabs/enemyEmitter';
import DrawProcessor  from '../prefabs/drawProcessor';
//import 
//import 
const GAME_CONFIG = {
    waves:  [
        {
            'timeout':10,//itemout before start
            'count':15,
            'interval':[0,10],//monster emitting interval
            'enemies_types':[
                'Enemy1'         
            ]
        },
        {
            'timeout':10,//itemout before start
            'count':30,
            'interval':[0,10],//monster emitting interval
            'enemies_types':[
                'Enemy1',
                'Enemy3',
				'Enemy2'
            ]
        },

    ]
}


class Game extends Phaser.State {

  constructor() {
    super();
    this._inventory = {};
  }


  create() {

    //this.input.onDown.add(this.endGame, this);

    this.background = this.game.add.sprite(0,0,'background');
    //this.background.height = this.game.world.height;
    this.background.width = this.game.world.width;

    var wizard = new Wizard(this.game,
        300, 
        this.background.height-310
        , 'wizard');

    for (let i of Object.keys(this._inventory)) {
        for (let k of ['health','mana']) {
            try {
                wizard[k]+=this._inventory[i].stats[k] || 0;
            } catch (e) {
                console.log(e);
            }
        }
    }
    wizard.init();

    var player = this.game.add.group();
    player.add(wizard);
    var enemies = this.game.add.group();

    (new EnemyEmitter())
        .init(this.game,enemies,player,GAME_CONFIG.waves)
        .start();
    var draw_processor = new DrawProcessor(this.game,this.game.world.width,this.game.world.height,this.game.input,[
        (new Bolt(this.game,wizard,{enemies:enemies})),
        (new Rain(this.game,wizard,{enemies:enemies})),
        (new Dot(this.game,wizard,{enemies:enemies})),
        (new Golem(this.game,wizard,{enemies:enemies})),
        (new Laser(this.game,wizard,{enemies:enemies})),
    ]);
    this.game.input.onDown.add(() => {
        draw_processor.activate();
    });

    this.game.input.onUp.add(() => {
        draw_processor.deactivate();
    });
    

    this.game.add.existing(draw_processor);
    


    this.exp_text = this.add.text(this.game.width-50, 50, '0', {
      font: '42px Arial', fill: 'red', align: 'right'
    });
    this.exp_text.anchor.set(0.5);
    
  }
    
  prepare(data) {
        this._inventory = data;
  }

  update() {
    this.exp_text.text = this.game.global.exp;
    if (this.game.input.activePointer.isDown) {
        //processDrawing();
    }
  }

  endGame() {
    this.game.state.start('gameover');
  }

  processDrawing() {

  }

}

export default Game;
