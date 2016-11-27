var Dot = function(game,caster,data) {
        this.constructor.prototype.power     = 20;
        this.constructor.prototype.mana_cost = 20;
        this.sprite='spell';
        this.points = [
            [0,0],
            [1,1]
        ]
        var self = this;
        this.cast=function() {
          if (!caster.takeMana(this.mana_cost)) return;
          var spell = game.add.sprite(caster.position.x, caster.position.y, 'spell');
          game.physics.enable(spell, Phaser.Physics.ARCADE);
          spell.body.velocity.x=300;
          spell.update = function () {
            if (game.physics.arcade.overlap(spell, data.enemies,(s,enemy) => {
                    spell.body.position= {x:-1,y:-1};
                    spell.kill();
                    enemy.getHit(self.power);
            },function(){
              return true;
            },this,true));
          }
        }
      };

export default Dot;
