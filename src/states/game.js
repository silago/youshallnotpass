//import Crosshairs from '../prefabs/crosshairs';
//import Target from '../prefabs/target';
import Wizard from '../prefabs/wizard';
import Dot  from  '../prefabs/spells/dot';
import Bolt  from '../prefabs/spells/bolt';
import Rain  from '../prefabs/spells/rain';
import EnemyEmitter  from '../prefabs/enemyEmitter';
import DrawProcessor  from '../prefabs/drawProcessor';
//import 
//import 
const GAME_CONFIG = {
    waves:  [
        {
            'timeout':1,//itemout before start
            'count':10,
            'interval':[2,10],//monster emitting interval
            'enemies_types':[
                'Enemy1',
                'Enemy2'
            ]
        },
        {
            'timeout':1,//itemout before start
            'count':2,
            'interval':[2,10],//monster emitting interval
            'enemies_types':[
                'Enemy1'
            ]
        },

    ]
}


class Game extends Phaser.State {

  constructor() {
    super();
  }


  create() {
    var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, 'Game', {
      font: '42px Arial', fill: '#ffffff', align: 'center'
    });
    text.anchor.set(0.5);

    //this.input.onDown.add(this.endGame, this);

    this.background = this.game.add.sprite(0,0,'background');
    //this.background.height = this.game.world.height;
    this.background.width = this.game.world.width;

    var wizard = new Wizard(this.game,
        300, 
        this.background.height-310
        , 'wizard');
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
    ]);
    this.game.input.onDown.add(() => {
        draw_processor.activate();
    });

    this.game.input.onUp.add(() => {
        draw_processor.deactivate();
    });
    

    this.game.add.existing(draw_processor);
    
  }
    

  update() {
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
