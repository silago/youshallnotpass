class Boot extends Phaser.State {

  constructor() {
    super();
  }

  preload() {
    this.load.image('preloader', 'assets/preloader.gif');
  }

  create() {
    this.game.input.maxPointers = 1;

    //setup device scaling
    if (this.game.device.desktop) {
      this.game.scale.pageAlignHorizontally = true;
    } else {
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.minWidth =  1366;
      this.game.scale.minHeight = 768;
      this.game.scale.maxWidth = 1366;
      this.game.scale.maxHeight = 768;
      this.game.scale.forceOrientation(true);
      this.game.scale.pageAlignHorizontally = true;
      this.game.scale.setScreenSize(true);
    }

    this.initGlobalVariables();

    this.game.state.start('preloader');
  }

  initGlobalVariables(){
    this.game.global = {
        exp:0,
        set_exp:function(e) {
            this.exp+=e;
        }

    };
  }

}

export default Boot;
