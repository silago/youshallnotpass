class Levels extends Phaser.State {
  constructor() {
    super();
  }

  
 
  create() {
    var button_width = 50; 
    var offset = this.game.global.progress;
    this.clicked = offset ;
    for (let i = offset; i>0;i--) {
        let text = this.add.text(((i-offset)*button_width)+this.game.width * 0.5,  this.game.height * 0.5, i, {
          font: '42px Arial', fill: '#ffffff', align: 'center'
        });
        text.inputEnabled = true;
        text.anchor.set(0.5);
        text.events.onInputDown.add(()=>{
            this.dayClick(i);
        },this);
    }
    //this.input.onDown.add(this.startGame, this);
  }

  dayClick(i) {
    console.log(i);
    if (this.clicked!=i) {
        this.clicked=i;
    } else {
        this.startGame();
    }

  }

  update() {

  }

  startGame () {
    this.game.state.start('game');
  }
}

export default Levels;
