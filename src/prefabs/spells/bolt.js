var Bolt = function(game,caster,data) {
        this.points = [
                        [0,0],
                        [1,1],
                        [1,-1]
                      ];
        this.sprite='bolt';
        this.constructor.prototype.power     = 6;
        this.constructor.prototype.mana_cost = 2;
        var self = this;
        this.cast=function() {
          if (!caster.takeMana(this.mana_cost)) return;
          var spell = game.add.sprite(caster.position.x, caster.position.y-15, 'bolt');
          game.physics.enable(spell, Phaser.Physics.ARCADE);
          spell.body.velocity.x=2300;
          spell.update = function () {
            if (game.physics.arcade.overlap(spell, data.enemies,function(spell,enemy) {
                    spell.body.velocity.x=0;
                    setTimeout(()=>{
                    spell.body.position= {x:-1,y:-1};
                    spell.kill();},1000);
                    enemy.getHit(self.power);
            },function(){
              return true;
            },this,true));
          }
        }
      };

export default Bolt;
