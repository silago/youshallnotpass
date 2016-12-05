import BaseItemHat from '../lib/baseItemHat';
import BaseItemRobe from '../lib/baseItemRobe';

class Menu extends Phaser.State {

  constructor() {
    super();

  }
  
  create() {
    this.equiped_items = {};
    this.game.stage.backgroundColor = "#0c9fc7";



    var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, 'TAP TO START', {
      font: '42px Arial', fill: '#ffffff', align: 'center'
    });
    text.anchor.set(0.5);
    text.inputEnabled = true;
    text.events.onInputDown.add(()=>{this.startGame()});
   
    var simple_hat1 = new BaseItemHat(this.game,0,0,'base_hat',{health:10,mana_max:10});
    var simple_hat2 = new BaseItemHat(this.game,0,0,'base_hat',{health:20,mana_max:20});
    var simple_robe1 = new BaseItemRobe(this.game,0,0,'base_robe',{health:15,mana_max:15});
    var simple_robe2 = new BaseItemRobe(this.game,0,0,'base_robe',{health:25,mana_max:25});
    var available_items = [
       simple_hat1, 
       simple_hat2, 
       simple_robe1, 
       simple_robe2 
    ];
    var i = 0;
    for (var item of available_items) {
        this.game.add.existing(item);
        item.x+=(i*70);
        i++;
        item.events.onInputDown.add(self=>this.equipe(self));
        item.inputEnabled = true;
    }

    //
    //

  }

  equipe(item) {
        if (item.equiped == true) {
            item.unequipe();
            this.equiped_items[item.type] == undefined;
            return;
        }
        //console.log(this.equiped_items[item.type]);
        if (typeof this.equiped_items[item.type]!='undefined' ) {
            this.equiped_items[item.type].unequipe();
        }
        item.equipe();
        this.equiped_items[item.type]=item;
  }

  update() {}

  startGame () {
      this.game.state.states['game'].prepare(
            this.equiped_items  
      );
      this.game.state.start('game');
  }

}

export default Menu;
