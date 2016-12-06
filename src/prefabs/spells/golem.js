var Golem = function(game,caster,data) {
        this.data = data;
        this.points = [
                        [0,0],
                        [0,-1]
                      ];
        this.constructor.prototype.power     = 20;
        this.constructor.prototype.mana_cost = 20;
    
        this.sprite='golem';
        var self = this;
        this.cast=function() {
          var spell_x = game.width;
          for (var i in data.enemies.children) {
            if (data.enemies.children[i].x<spell_x) {
              spell_x = data.enemies.children[i].x;
            }
          }

          if (!caster.takeMana(this.mana_cost)) return;
          var spell = game.add.sprite(
            spell_x, 
            caster.position.y,
            this.sprite);
            spell.x+=spell.width/2;
          spell.x-=parseInt(spell.width/2);
          spell.y-=parseInt(spell.height/2);

          game.physics.enable(spell, Phaser.Physics.ARCADE);

          spell.update = (() => {
                game.physics.arcade.collide(spell, data.enemies);
          })
          spell.health = 10;
          var hit_interval = setInterval(
          /*spell.update = */ () =>  {
             
            if (game.physics.arcade.collide(spell, data.enemies, (spell,enemy) => {
                spell.health--;
                if (spell.health<0) {
                    clearInterval(hit_interval);
                    spell.destroy();
                }
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

export default Golem;
