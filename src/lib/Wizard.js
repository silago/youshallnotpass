'use strict';
var Wizard = function(game,x,y,resource) {
    Phaser.Sprite.call(this, game,x,y,resource);
    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.add = function() {
        game.add.existing(this);
        game.physics.enable(this, Phaser.Physics.ARCADE);
        return this;
    }
    this.health =  100;
    this.mana =  100;
    //this.constructor.prototype.mana_regain = 20;

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
    var self = this;
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
Wizard.prototype = Object.create(Phaser.Sprite.prototype);
Wizard.prototype.mana_regain = 10;//Object.create(Phaser.Sprite.prototype);
