var Golem = function(game,caster,data) {
        this.data = data;
        this.points = [
                        [0,0],
                        [0,-1]
                      ];
        this.constructor.prototype.power     = 220;
        this.constructor.prototype.mana_cost = 20;
    
        this.sprite='golem';
        var self = this;
        this.cast=function() {
          var spell_x = game.width;
          for (var i in data.enemies.children) {
            if (data.enemies.children[i].x<spell_x) {
              spell_x = data.enemies.children[i].x-(data.enemies.children[i].width*2);
            }
          }

          if (!caster.takeMana(this.mana_cost)) return;
          var spell = game.add.sprite(
            spell_x, 
            caster.position.y,
            this.sprite);
            spell.x+=spell.width/2;
          spell.x-=parseInt(spell.width/2)-20;
          spell.y-=parseInt(spell.height/2);
          spell.cooldown = 0;


          game.physics.enable(spell, Phaser.Physics.ARCADE);

          spell.update = function() {
           var can_contact = false;
            if (spell.cooldown <= 0 ) {
                spell.cooldown = 1000;
                can_contact = true;
            } else {
                spell.cooldown-=game.time.elapsed;
            } 

            game.physics.arcade.collide(spell, data.enemies, (spell,enemy) => {
                if (can_contact) {
                    spell.health--;
                    if (spell.health<0) {
                        spell.position.x = -1;
                        spell.position.y = -1;
                        spell.destroy();
                    }
                    enemy.getHit(this.power);
                    console.log('golem hit');
                }
            });
          }
          spell.health = 10;
          spell.body.moves = false;

          setTimeout(function() {
            spell.position.x = -1;
            spell.position.y = -1;
            spell.destroy();
          },5000);
        }
      };

export default Golem;
