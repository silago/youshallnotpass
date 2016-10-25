Rain = function(game,caster,data) {
        this.points=[0,1,2];
        this.sprite='rain';
        this.mana_cost = 50;
        power = 20;
        this.cast=function() {
          if (!caster.takeMana(this.mana_cost)) return;
          var spell = game.add.sprite(caster.position.x, caster.position.y, this.sprite);
          game.physics.enable(spell, Phaser.Physics.ARCADE);
          spell.update = function () {
            console.log(this);
            var self  = this;
            if (game.physics.arcade.collide(spell, data.enemies,function(spell,enemy) {
              enemy.getHit(power);
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
        this.mana_cost = 20;
        var power = 5;
        this.cast=function() {
          if (!caster.takeMana(this.mana_cost)) return;
          var spell = game.add.sprite(caster.position.x, caster.position.y-15, 'bolt');
          game.physics.enable(spell, Phaser.Physics.ARCADE);
          spell.body.velocity.x=300;
          spell.update = function () {
            if (game.physics.arcade.overlap(spell, data.enemies,function(s,enemy) {
                    spell.body.position= {x:-1,y:-1};
                    spell.kill();
                    enemy.getHit(power);
            },function(){
              return true;
            },this,true));
          }
        }
      };


Dot = function(game,caster,data) {
        //300 x 30
        //this.points=[2,5];
        this.mana_cost = 20;
        this.sprite='spell';
        var power = 15;
        this.cast=function() {
          if (!caster.takeMana(this.mana_cost)) return;
          var spell = game.add.sprite(caster.position.x, caster.position.y, 'spell');
          game.physics.enable(spell, Phaser.Physics.ARCADE);
          spell.body.velocity.x=300;
          spell.update = function () {
            if (game.physics.arcade.overlap(spell, data.enemies,function(s,enemy) {
                    spell.body.position= {x:-1,y:-1};
                    spell.kill();
                    enemy.getHit(power);
            },function(){
              return true;
            },this,true));
          }
        }
      };
