class Dead extends Phaser.State {

  constructor() {
    super();

  }
  
  create() {
    var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, 'YOU"RE DEAD', {
      font: '42px Arial', fill: '#ffffff', align: 'center'
    });
    text.events.onInputDown.add(()=>{this.startGame()});
  }

  update() {}

  startGame () {
      this.game.state.start('menu');
  }

}

export default Dead;
