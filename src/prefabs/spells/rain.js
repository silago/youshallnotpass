var Rain = function(game,caster,data) {
        this.data = data;
        this.points = [
                        [0,0],
                        [1,-1],
                        [1,1]
                      ];
        this.constructor.prototype.power     = 20;
        this.constructor.prototype.mana_cost = 20;
        this.sprite='rain';
        var self = this;
        this.cast=function() {
          var spell_x = game.width;
          for (var i in data.enemies.children) {
            if (data.enemies.children[i].x<spell_x) {
              spell_x = data.enemies.children[i].x;
            }
          }

          if (!caster.takeMana(this.mana_cost)) return;
          var spell = game.add.sprite(spell_x, 
            caster.position.y,
            this.sprite);
          spell.x-=parseInt(spell.width/2);
          spell.y-=parseInt(spell.height/2);

          game.physics.enable(spell, Phaser.Physics.ARCADE);
          spell.update =  () =>  {
            if (game.physics.arcade.overlap(spell, data.enemies, (spell,enemy) => {
                spell.body.enable = false;
                console.log(enemy);
              enemy.getHit(this.power);
            },function() {
              return true;
            },this));
          }
          setInterval(function() {
            spell.destroy();
          },2000);
        }
      };

export default Rain;
