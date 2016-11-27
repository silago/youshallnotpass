var Bolt = function(game,caster,data) {
        this.points = [
                        [0,0],
                        [1,1],
                        [1,-1]
                      ];
        this.sprite='bolt';
        this.constructor.prototype.power     = 20;
        this.constructor.prototype.mana_cost = 20;
        var self = this;
        this.cast=function() {
          if (!caster.takeMana(this.mana_cost)) return;
          var spell = game.add.sprite(caster.position.x, caster.position.y-15, 'bolt');
          game.physics.enable(spell, Phaser.Physics.ARCADE);
          spell.body.velocity.x=300;
          spell.update = function () {
            if (game.physics.arcade.overlap(spell, data.enemies,function(spell,enemy) {
                    spell.body.position= {x:-1,y:-1};
                    spell.kill();
                    enemy.getHit(self.power);
            },function(){
              return true;
            },this,true));
          }
        }
      };

export default Bolt;
