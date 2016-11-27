class Preloader extends Phaser.State {

  constructor() {
    super();
    this.asset = null;
    this.ready = false;
  }

  preload() {
    //setup loading bar
    this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
    this.load.setPreloadSprite(this.asset);

    //Setup loading and its events
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.loadResources();
  }

  update() {
      if (this.ready) {
        this.game.state.start('menu');
      }
  }

  loadResources() {
      // load your resources here

    //game.load.script('VisualTimer.js','src/lib/VisualTimer.js');
    //game.load.script('Spells.js','src/lib/Spells.js');
    //game.load.script('Wizard.js','src/lib/Wizard.js');
    //game.load.script('CasterCircle.js','src/lib/CasterCircle.js');
    //game.load.script('GameObject.js','src/lib/GameObject.js');
    //game.load.script('Enemy.js','src/lib/Enemy.js');
    //game.load.script('EnemyEmitter.js','src/lib/EnemyEmitter.js');
    this.game.load.image('background', 'assets/background2.png');
    this.game.load.image('wizard',     'assets/wizard.png');
    this.game.load.image('spell',      'assets/spell.png');
    this.game.load.image('circle',      'assets/circle.png');
    this.game.load.image('goblin',     'assets/goblin.png');
    this.game.load.image('eye',     'assets/eye.png');
    this.game.load.image('rain',     'assets/rain.png');
    this.game.load.image('bolt',     'assets/bolt.png');
    this.game.load.image('bolt_icon',     'assets/icons/bolt_icon.png');
    this.game.load.image('rain_icon',     'assets/icons/rain_icon.png');
    this.game.load.spritesheet('timer', 'assets/timer.png', 150, 20);
    this.game.load.spritesheet('orcs', 'assets/orc_spritesheet.png', 100, 100, 4);
    this.game.load.spritesheet('orcs1', 'assets/orc_spritesheet1.png', 100, 100, 4);
    this.game.load.spritesheet('orcs2', 'assets/orc_spritesheet2.png', 100, 100, 4);
  }

  onLoadComplete() {
    this.ready = true;
  }
}

export default Preloader;
