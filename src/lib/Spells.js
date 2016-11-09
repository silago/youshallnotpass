

Rain = function(game,caster,data) {
        this.constructor.prototype.power     = 20;
        this.constructor.prototype.mana_cost = 20;
        this.points=[0,1,2];
        this.sprite='rain';
        var self = this;
        this.cast=function() {
          var spell_x = game.width;
          for (i in data.enemies.children) {
            if (data.enemies.children[i].x<spell_x) {
              spell_x = data.enemies.children[i].x;
            }
          }

          if (!caster.takeMana(this.mana_cost)) return;
          var spell = game.add.sprite(spell_x, caster.position.y, this.sprite);
          spell.x-=parseInt(spell.width/2);
          spell.y-=parseInt(spell.height/2);

          game.physics.enable(spell, Phaser.Physics.ARCADE);
          spell.update = function () {
            //console.log(this);
            if (game.physics.arcade.collide(spell, data.enemies,function(spell,enemy) {
              enemy.getHit(self.power);
            },function() {
              return true;
            },this));
          }
          setInterval(function() {
            spell.destroy();
          },2000);
        }
      };


Bolt = function(game,caster,data) {
        //300 x 30
        this.points=[2,5];
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


Dot = function(game,caster,data) {
        //300 x 30
        //this.points=[2,5];
        this.constructor.prototype.power     = 20;
        this.constructor.prototype.mana_cost = 20;
        this.sprite='spell';
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
