var Laser  = function(game,caster,data) {
        this.constructor.prototype.power     = 9;
        this.constructor.prototype.mana_cost = 10;
        this.sprite='laser2';
        this.points = [
            [0,0],
            [1,-1],
            [1,1],
            [1,-1]
        ]
        var self = this;
        this.cast=function() {
          if (!caster.takeMana(this.mana_cost)) return;

          var spell =  game.add.tileSprite(caster.position.x+(caster.width), caster.position.y+10, game.width, 43, 'laser1');
          game.physics.enable(spell, Phaser.Physics.ARCADE);

          //spell.body.velocity.x=2000;
          //spell.update = function () {
          //  if (game.physics.arcade.overlap(spell, data.enemies,(s,enemy) => {
          //          spell.body.position= {x:-1,y:-1};
          //          spell.kill();
          //          enemy.getHit(self.power);
          //  },function(){
          //    return true;
          //  },this,true));
          //}


          var hit_interval = setInterval(
          /*spell.update = */ () =>  {
            if (game.physics.arcade.overlap(spell, data.enemies, (spell,enemy) => {
                enemy.getHit(this.power);
            },function() {
              return true;
            },this));
          },500);
          setTimeout(function() {
            clearInterval(hit_interval);
            spell.destroy();
          },2000);
        }
      };

export default Laser;
